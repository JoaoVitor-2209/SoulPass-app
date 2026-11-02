// Testes locais: todas as respostas HTTP são controladas, sem acessar contas reais.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const temporario = await mkdtemp(join(tmpdir(), 'soulpass-test-'));
const arquivos = ['services/api', 'services/usuarioService', 'services/contaService', 'services/caminhadaService', 'services/bilheteService', 'services/historicoService', 'utils/formatar'];
for (const arquivo of arquivos) {
  let fonte = await readFile(new URL(`../src/${arquivo}.ts`, import.meta.url), 'utf8');
  fonte = fonte.replaceAll('import.meta.env', '({ VITE_API_URL: "https://api.exemplo.invalid" })');
  let js = ts.transpileModule(fonte, { compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext } }).outputText;
  js = js.replaceAll('from "./api"', 'from "./api.mjs"');
  await writeFile(join(temporario, arquivo.split('/').at(-1) + '.mjs'), js);
}
const carregar = nome => import(pathToFileURL(join(temporario, nome + '.mjs')).href);
const [api, usuario, conta, caminhada, bilhete, historico, utils] = await Promise.all(['api','usuarioService','contaService','caminhadaService','bilheteService','historicoService','formatar'].map(carregar));
const fetchOriginal = globalThis.fetch;
let ultima;
function responder(dados, status = 200) {
  globalThis.fetch = async (url, opcoes) => {
    ultima = { url, metodo: opcoes.method || 'GET', dados: opcoes.body ? JSON.parse(opcoes.body) : undefined, headers: opcoes.headers };
    return status === 204 ? new Response(null, {status}) : new Response(JSON.stringify(dados), {status, headers:{'Content-Type':'application/json'}});
  };
}

test('login usa a rota Java e retorna usuário/conta sem inventar token', async () => {
  const resposta={usuario:{idUser:7},conta:{idConta:8}};
  responder(resposta);assert.deepEqual(await usuario.entrar({email:'exemplo@example.test',senha:'apenas-teste'}),resposta);
  assert.equal(ultima.url,'https://api.exemplo.invalid/usuarios/login');assert.equal(ultima.metodo,'POST');
  assert.equal(ultima.headers['Content-Type'],'application/json');assert(!('Authorization' in ultima.headers));
});
test('cadastro envia os cinco campos do contrato', async () => {
  responder({});await usuario.cadastrar({nome:'Pessoa Teste',idade:20,cpf:52998224725,email:'exemplo@example.test',senha:'teste123'});
  assert.deepEqual(Object.keys(ultima.dados),['nome','idade','cpf','email','senha']);assert.equal(ultima.url,'https://api.exemplo.invalid/usuarios');
});
test('perfil atualiza com PUT apenas nome, idade e CPF', async () => {
  responder({});await usuario.atualizarUsuario(7,{nome:'Novo nome',idade:21,cpf:52998224725});
  assert.equal(ultima.metodo,'PUT');assert.equal(ultima.url,'https://api.exemplo.invalid/usuarios/7');assert(!('email' in ultima.dados));
});
test('listagem de caminhadas fica restrita à conta selecionada', async () => {
  responder([]);assert.deepEqual(await caminhada.listarCaminhadas(8),[]);assert.equal(ultima.url,'https://api.exemplo.invalid/caminhadas/conta/8');
});
test('registro não envia pontos calculados pelo cliente nem data inventada', async () => {
  responder({pontosGanhos:40},201);await caminhada.registrarCaminhada(8,2.5);assert.deepEqual(ultima.dados,{idConta:8,kmAndados:2.5});
});
test('exclusão com resposta 204 não tenta interpretar JSON', async () => {
  responder(null,204);assert.equal(await caminhada.excluirCaminhada(9),undefined);assert.equal(ultima.metodo,'DELETE');assert.equal(ultima.url,'https://api.exemplo.invalid/caminhadas/9');
});
test('resumo usa o endpoint da visão geral', async () => {
  responder({kmHoje:2});assert.equal((await conta.buscarResumo(8)).kmHoje,2);assert.equal(ultima.url,'https://api.exemplo.invalid/contas/8/resumo');
});
test('simulação é GET com pontos na query e não altera o saldo', async () => {
  responder({saldoSuficiente:true});await conta.simularConversao(8,605);assert.equal(ultima.metodo,'GET');assert.equal(ultima.url,'https://api.exemplo.invalid/contas/8/conversao?pontos=605');assert.equal(ultima.dados,undefined);
});
test('conversão confirmada envia pontos e preserva o valor devolvido pela API', async () => {
  responder({creditoRecebido:5.5,saldoPontos:95});assert.equal((await conta.converterPontos(8,605)).creditoRecebido,5.5);assert.equal(ultima.metodo,'POST');assert.deepEqual(ultima.dados,{pontos:605});
});
test('ausência de bilhete 404 é estado vazio, mas erro 500 continua sendo erro', async () => {
  responder({},404);assert.equal(await bilhete.buscarBilhete(7),null);
  responder({message:'erro interno de banco'},500);await assert.rejects(bilhete.buscarBilhete(7),e=>e.status===500&&!e.message.includes('banco'));
});
test('cadastro de bilhete vincula ao usuário e envia numBilhete', async () => {
  responder({},201);await bilhete.cadastrarBilhete(7,123456789);assert.equal(ultima.url,'https://api.exemplo.invalid/bilhetes/usuario/7');assert.deepEqual(ultima.dados,{numBilhete:123456789});
});
test('edição de bilhete altera status e não permite crédito manual', async () => {
  responder({});await bilhete.atualizarStatusBilhete(22,'NAO_ATIVO');assert.equal(ultima.metodo,'PUT');assert.deepEqual(ultima.dados,{status:'NAO_ATIVO'});
});
test('histórico usa wrapper com totais e filtro de origem opcional', async () => {
  const resultado={totalRegistros:0,pontosConquistados:0,registros:[]};responder(resultado);assert.deepEqual(await historico.listarHistorico(8),resultado);assert.equal(ultima.url,'https://api.exemplo.invalid/historicos/conta/8');
  await historico.listarHistorico(8,'CAMINHADA');assert.equal(ultima.url,'https://api.exemplo.invalid/historicos/conta/8?origem=CAMINHADA');
});
test('erro de negócio 409 preserva a mensagem do backend', async () => {
  responder({message:'E-mail já cadastrado'},409);await assert.rejects(api.requisicao('/usuarios'),e=>e instanceof api.ErroApi&&e.status===409&&e.message==='E-mail já cadastrado');
});
test('401 sem mensagem tem feedback de login apropriado', async () => {
  responder({},401);await assert.rejects(api.requisicao('/usuarios/login'),/E-mail ou senha inválidos/);
});
test('sucesso com corpo inválido é erro e não uma lista de demonstração', async () => {
  globalThis.fetch=async()=>new Response('<html>indisponível</html>',{status:200});await assert.rejects(api.requisicao('/contas/8'),/resposta inesperada/);
});
test('falha de rede não é substituída por dados locais', async () => {
  globalThis.fetch=async()=>{throw new TypeError('Failed to fetch');};await assert.rejects(api.requisicao('/contas/8'),/Não foi possível conectar/);
});
test('perda de conexão em escrita pede conferência antes de reenviar', async () => {
  globalThis.fetch=async()=>{throw new TypeError('Failed to fetch');};
  await assert.rejects(caminhada.registrarCaminhada(8,2),/servidor pode ter recebido/);
});
test('CPF verifica tamanho, repetição e os dois dígitos verificadores', () => {
  assert.equal(utils.cpfValido('529.982.247-25'),true);assert.equal(utils.cpfValido('11111111111'),false);assert.equal(utils.cpfValido('52998224724'),false);assert.equal(utils.cpfValido('123'),false);
});
test.after(async()=>{globalThis.fetch=fetchOriginal;await rm(temporario,{recursive:true,force:true});});

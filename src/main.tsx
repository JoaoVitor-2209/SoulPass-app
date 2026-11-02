import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import Layout from "./components/Layout/Layout";
import Home from "./routes/Home";
import Sobre from "./routes/Sobre";
import Faq from "./routes/Faq";
import Contato from "./routes/Contato";
import Integrantes from "./routes/Integrantes";
import IntegranteDetalhe from "./routes/IntegranteDetalhe";
import Solucao from "./routes/Solucao";
import EntregavelDetalhe from "./routes/EntregavelDetalhe";
import Videos from "./routes/Videos";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import NotFound from "./routes/NotFound";

import { AuthProvider } from "./context/AuthContext";
import LayoutPainel from "./components/Painel/LayoutPainel";
import Painel from "./routes/Painel";
import Caminhadas from "./routes/Caminhadas";
import CaminhadaDetalhe from "./routes/CaminhadaDetalhe";
import Carteira from "./routes/Carteira";
import Bilhete from "./routes/Bilhete";
import Historico from "./routes/Historico";
import Perfil from "./routes/Perfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "app",
        element: <LayoutPainel />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Painel /> },
          { path: "caminhadas", element: <Caminhadas /> },
          { path: "caminhadas/:id", element: <CaminhadaDetalhe /> },
          { path: "carteira", element: <Carteira /> },
          { path: "bilhete", element: <Bilhete /> },
          { path: "historico", element: <Historico /> },
          { path: "perfil", element: <Perfil /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      { index: true, element: <Home /> },
      { path: "sobre", element: <Sobre /> },
      { path: "faq", element: <Faq /> },
      { path: "contato", element: <Contato /> },
      { path: "integrantes", element: <Integrantes /> },
      { path: "integrantes/:id", element: <IntegranteDetalhe /> },
      { path: "solucao", element: <Solucao /> },
      { path: "solucao/:id", element: <EntregavelDetalhe /> },
      { path: "videos", element: <Videos /> },
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

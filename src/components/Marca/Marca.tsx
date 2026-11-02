import { Link } from "react-router";
import onibusIcon from "../../assets/hero/onibus-pass.png";

export default function Marca() {
  return (
    <Link to="/" className="marca" aria-label="SoulPass — página inicial">
      <span className="marca-simbolo">
        <img src={onibusIcon} alt="" className="marca-onibus" />
      </span>
      <span>
        Soul<span className="marca-pass">Pass</span>
      </span>
    </Link>
  );
}

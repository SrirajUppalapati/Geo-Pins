import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        gap: "1rem",
      }}
    >
      <div>
        <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
      </div>
      <h1 style={{}}>Geo Pins</h1>
    </Link>
  );
}

export default Logo;

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <div>
      <nav className={styles.nav}>
        <Logo />
        <ul className={styles.ul}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Products</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              LOGIN
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;

import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import css from "./AppBar.module.css";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <header className={css.header}>
      <Navigation />
      {!isRefreshing && <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>}
    </header>
  );
}

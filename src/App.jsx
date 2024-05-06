import React from "react";
import { Body } from "./pages/Body/Body";
import { Nav_bar } from "./common/Nav-Bar/Nav-Bar";
import { useLocation } from "react-router-dom";
import "./styles.scss";

function App() {
const location = useLocation();
  return (
    <>
      {( location.pathname === "/mastermind" || location.pathname === "/profile_user" || location.pathname === "/about" || location.pathname === "/profile_admin_users" ) && <Nav_bar />}
      <Body />
    </>
  );
}

export default App;

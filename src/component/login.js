import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, logout } = useAuth0();

   return(
   <>
    <button onClick={() => loginWithRedirect()}>Log In</button>
  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
  Log Out
</button></>
   )
};

export default LoginButton;
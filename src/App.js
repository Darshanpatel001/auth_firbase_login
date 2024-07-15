import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import { getAllData, saveItem } from "./firebase/function";
import LoginButton from "./component/login";
import Form from "./firebase/Form";

const App = () => {
  let name = useRef();
  let surname = useRef();

  let { loginWithRedirect, logout } = useAuth0();

  let addItem = async () => {
    let product = {
      name: name.current.value,
      surname: surname.current.value,
    };

    let res = await saveItem(product);
    console.log(res);
  };

  useEffect(() => {
    getAllData();
  });

  return (
    <div>
      <input type="text" ref={name} />
      <input type="text" ref={surname} />
      <button onClick={addItem}>Submit</button>
     <LoginButton/>
     <Form/>
     
    </div>
  );
};

export default App;
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { fairbase } from "../config/fairbase";
import { useState } from "react";

const auth = getAuth(fairbase);
const provider = new FacebookAuthProvider();

export default function Facebook() {
  const [usrData, setUsrData] = useState({});
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setUsrData({ ...usrData, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <button onClick={handleClick}>sign in with facebook</button>
    </>
  );
}

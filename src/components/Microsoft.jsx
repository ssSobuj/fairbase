/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { fairbase } from "../config/fairbase";
import { useState } from "react";

const provider = new OAuthProvider("microsoft.com");

const auth = getAuth(fairbase);

export default function Microsoft() {
  const [usrData, setUsrData] = useState({});

  const handleMicrosoft = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        const user = result.user;

        setUsrData({ ...usrData, user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleMicrosoft}>log in with microsoft</button>
    </div>
  );
}

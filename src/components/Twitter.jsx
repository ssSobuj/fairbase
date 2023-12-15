/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";

import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { fairbase } from "../config/fairbase";
const provider = new TwitterAuthProvider();

const auth = getAuth(fairbase);

export default function Twitter() {
  const [usrData, setUsrData] = useState({});
  console.log(usrData);

  const handletwitter = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
        setUsrData({ ...setUsrData, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <button onClick={handletwitter}>login with twitter</button>
      <h1>{usrData?.user?.displayName}</h1>
      <img style={{ width: "200px" }} src={usrData?.user?.photoURL} alt="" />
    </>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { fairbase } from "../config/fairbase";
import { useState } from "react";

const auth = getAuth(fairbase);
const provider = new FacebookAuthProvider();

export default function Facebook() {
  const [usrData, setUsrData] = useState({});
  console.log(usrData);

  const handleClick = () => {
    signInWithPopup(auth, provider)

      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setUsrData({...usrData,user})
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleClick}>sign in with facebook</button>
      <h1>{usrData?.user?.displayName}</h1>
      <img src={usrData?.user?.photoURL} alt="" />
    </>
  );
}

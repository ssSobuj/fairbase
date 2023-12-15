/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { fairbase } from "../config/fairbase";

const auth = getAuth(fairbase);
const provider = new GoogleAuthProvider();

export default function Google() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleClick = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUserData({ ...userData, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <button onClick={handleClick}>sing in with google</button>
      <h1>{userData?.user?.email}</h1>
      <img src={userData?.user?.photoURL} alt="" />
    </>
  );
}

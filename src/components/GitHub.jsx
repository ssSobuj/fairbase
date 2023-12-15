/* eslint-disable no-unused-vars */
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { fairbase } from "../config/fairbase";
import { useState } from "react";

const auth = getAuth(fairbase);
const provider = new GithubAuthProvider();

export default function GitHub() {
  const [userData, getUserData] = useState({});
  console.log(userData);
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        getUserData({ ...userData, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <button onClick={handleClick}>sign in with gitHub</button>
      <h1>{userData?.user?.displayName}</h1>
      <img src={userData?.user?.photoURL} alt="" />
    </>
  );
}

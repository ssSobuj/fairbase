import axios from "axios";

export const getData = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};


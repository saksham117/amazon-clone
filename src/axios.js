import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: 'https://us-central1-clone-2dafa.cloudfunctions.net/api' // we get this url after running firebase deploy --only functions 
  // baseURL: 'http://localhost:5001/clone-2dafa/us-central1/api' // the end point of our api, like when we call functions main index.js
    // this is the base url we land on (local host)
});

export default instance;

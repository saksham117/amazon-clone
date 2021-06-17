import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: '' // we get this url after running firebase deploy --only functions 
});

export default instance;

import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
const APIForAuthenticated = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //asking for token from local storage and sending it to the server
        "user_auth_token": `${localStorage.getItem("token")}`,
    },
});
export  {API,APIForAuthenticated};

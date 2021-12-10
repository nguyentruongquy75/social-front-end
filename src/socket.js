import { io } from "socket.io-client";

const socket = io("https://social-api-nodejs.herokuapp.com/");

export default socket;

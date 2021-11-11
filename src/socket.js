import io from "socket.io-client";

export let socket;

export const connect = (userID, fullName) => {
  socket = io("");
  console.log("CONECTADO POR SOCKETS");
};

// class Socket {
//   socket;
 
//   connect() {
//     this.socket = io.connect("");
//   }

//   getOrders() {
//     socket.emit("get-orders");
//   }

//   onNewOrders (){

//   }

// }

// export default new Socket();

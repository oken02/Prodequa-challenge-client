import io from "socket.io-client";

export let socket;

export const connect = (userID, fullName) => {
  socket = io("");
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

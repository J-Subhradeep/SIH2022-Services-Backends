// const Message = require("../model/message");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const axios = require("axios");

const workDelete = async (chat, socket, del_obj) => {
  const { m_id = "", user = "" } = del_obj;
  if (!m_id || !user) {
    console.log("Missing message id or user id");
    socket.emit("error", "Missing message id or user id");
    return;
  }
  try {
    const deleteResp = await axios.delete(process.env.MSG_DEL_URL, {
      params: {
        user,
        m_id,
      },
    });
    // console.log("res from msg delete url:", deleteResp.data);
    if (!deleteResp.data) {
      console.log("Invalid deleted message obj");
      socket.emit("error", "Invalid deleted message obj");
      return;
    }

    const other = deleteResp.data.deleted_message.to;
    console.log("receiver of message: ", other);

    chat.to([user, other]).emit("deleted_message", deleteResp.data);

    chat.to(user).emit("remove-friend", { user:user, other:other });
    chat.to(other).emit("remove-friend", { user:other, other:user });

    // in client 
    // socket.on("remove-friend", obj => {
    //     socket.emit("removing-friend", obj)
    // })

    return;
  } catch (error) {
    console.log(error);
    socket.emit("error", error.message);
    return;
  }
};
module.exports = workDelete;

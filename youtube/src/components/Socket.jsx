import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

// yarn add socket.io-client

// đối tượng socket client
const socket = io("ws://localhost:8081");

const Socket = () => {

  useEffect(() => {
    // socket.on("send-data", (value) => {
    //   document.querySelector("#noiDung").innerHTML += value + "<br/>"
    // })

    // socket.on("send-number", (value) => {
    //   document.querySelector("#noiDung").innerHTML = value
    // })


    socket.on("send-chat", (value) => {
      document.querySelector("#noiDung").innerHTML += value + "<br/>"
    })

  }, [])

  return (
    <div style={{ color: 'white' }}>
      <h1 id="noiDung">

      </h1>
      <input id="txt-chat" />
      <button onClick={() => {
        let txtChat = document.querySelector("#txt-chat").value
        socket.emit("client-chat", txtChat)
      }}>
        Click
      </button>

      <button onClick={() => {
        socket.emit("join-room", "")
      }}>
        Vào room
      </button>
    </div>
  )
}

export default Socket
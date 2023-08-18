import React from 'react'
import pokemon from "../models/pokemon";

const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

function Show({index}) {
  return (
    <div style={myStyle}>
        <a href="../">go back</a>
        <h1>Gotta Catch 'Em All</h1>
        <h2>{pokemon[index].name[0].toUpperCase() + pokemon[index].name.slice(1)}</h2>
        <img src={`${pokemon[index].img}.jpg`} alt="" />
    </div>
  )
}

export default Show
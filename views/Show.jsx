import React from 'react'

const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

function Show({pokemon}) {
  return (
    <div style={myStyle}>
        <a href="../">go back</a>
        <h1>Gotta Catch 'Em All</h1>
        <h2>{pokemon.name.toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src={`${pokemon.img}`} alt="" />
    </div>
  )
}

export default Show
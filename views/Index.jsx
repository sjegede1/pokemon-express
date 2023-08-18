import React from "react";
// import pokemon from "../models/pokemon";
import DefaultLayout from "../layouts/DefaultLayout";

const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

function Index({pokemon}) {
  // const pokemon = props.pokemon
  // const {pokemon} = props
  return (
    <DefaultLayout>
      <div style={myStyle}>
        <h1>See all Pokemon</h1>
        <ul>
          {pokemon.map((p, i) => {
            return (
              <li key={i}>
                <a href={`/pokemon/${i}`}>
                  {p.name[0].toUpperCase() + p.name.slice(1)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </DefaultLayout>
  );
}

export default Index;

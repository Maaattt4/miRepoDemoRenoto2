import React from "react";
import "../estilos/Card.css";
import monky1 from "../imagenes/monky1.jpg";
import monky2 from "../imagenes/monky2.png";
import monky3 from "../imagenes/monky3.jpg";

const imagenes = [monky1, monky2, monky3];

function Card(props) {
  return (
    <div className="contenido-card">
      <img
        className="imagen-card"
        src={imagenes[props.imagen]}
        alt={`foto de ${props.nombre}`} 
      />
      <div className="contenedor-texto-card">
        <p className="nombre-card">
          <strong>{props.nombre}</strong>
        </p>
        <p className="pais-card">{props.pais}</p>
        <p className="texto-card">{props.texto}</p>
      </div>
    </div>
  );
}

export default Card;
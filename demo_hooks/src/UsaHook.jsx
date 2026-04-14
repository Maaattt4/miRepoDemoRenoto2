import { useState } from "react";

function UsaHook() {
    //var nombre = "Juan";
    const[nombre, setNombre] = useState("Juan");
    const[flag, setFlag] = useState(false);
    const[fragmento, setFragmento] = useState(false);

    //los fragmentos son una forma de agrupar elementos sin necesidad de usar un div, es decir, no se renderiza en el DOM
    /*
    return fragmento ?
    <>
        <div>
            <h1>Hola {nombre}</h1>
            <button onClick={()=>{setNombre("Pedro"); console.log(nombre);}}>
                Click me
            </button>
            <p>{flag ? "Afirmativo" : "Falso"}</p>
        </div>
    </>
    :
    <>
        <div>
            <h1>Hola {nombre}</h1>
            <button onClick={()=>{setNombre("Maria");
                console.log(nombre);}}>
                Click me
            </button>
            <p>{flag ? "Afirmativo" : "Falso"}</p>
        </div>
    </>
    */

    const [contador, setContador] = useState(0);

    return (
        <div>
            <h1>{contador}</h1>
            <button onClick={()=>{setContador(contador + 1);}}> Incrementar </button>
            <button onClick={()=>{setContador(contador - 1);}}>Decrementar</button>
        </div>
    );         
}

export default UsaHook;
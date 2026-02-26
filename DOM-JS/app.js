/*
Existen 5 formas de acceder a los elementos de un documento:
1.- .getElementById() -> Devuelve un elemento por su ID
2.- .getElementsByTagName() -> Devuelve una colección de elementos por su etiqueta
3.- .getElementsByClassName() -> Devuelve una colección de elementos por su clase
4.- .querySelector() -> Devuelve el primer elemento que coincida con un selector CSS
5.- .querySelectorAll() -> Devuelve una colección de elementos que coincidan con un selector CSS
*/

//Vinculando el elemento HTML con un objeto den JS
//const obj_title = document.getElementById("titulo");
//console.log(obj_title.parentElement);

//Aqui se muestra como se busca por classname
// const contenedor=document.getElementsByClassName("contenedor");
// console.log(contenedor[0].classList);

//Aqui se muestra como se busca por tagname, se devuelve una coleccion de elementos, por lo que se debe indicar el indice del elemento a mostrar
// const items=document.getElementsByTagName("li");
// console.log(items[0].innerText);

//Aqui se muestra como se busca por querySelector, se devuelve el primer elemento que coincida con el selector CSS
// const titulo=document.querySelector(".items-color1");
// console.log(titulo);

// //Aqui se muestra como se busca por querySelectorAll, se devuelve una coleccion de elementos que coincidan con el selector CSS
// const items=document.querySelectorAll(".items-color1");
// console.log(items);

//tambien el querySelectorALL puede devolver varios elementos, por lo que se puede indicar el indice del elemento a mostrar
// const titulo=document.querySelectorAll("#titulo");
// console.log(titulo[0].innerText);

//al querySelectorALL se le pueden indicar condicionales
// const items=document.querySelectorAll("ul li:not(.items-color1)");
// console.log(items[0].classList);

//tambien se pueden modificar los elementos HTML desde JS, por ejemplo, cambiando el texto del titulo, el color y el tamaño de la fuente
// const titulo=document.querySelector("#titulo");
// titulo.innerText="Nuevo titulo de JS";
// titulo.style.color="red";
// titulo.style.fontSize="30px";
// titulo.style.backgroundColor="yellow";

//la diferencia entre innerText, textContent e innerHTML es que innerText devuelve el texto visible de un elemento, textContent devuelve todo el texto de un elemento, incluyendo los espacios en blanco y los saltos de línea, e innerHTML devuelve el contenido HTML de un elemento, incluyendo las etiquetas HTML. Por ejemplo, si tenemos el siguiente código HTML:
// const ul=document.getElementsByTagName("ul");
// console.log(ul[0].innerText);
// console.log(ul[0].textContent);
// console.log(ul[0].innerHTML);

//Tambien se pueden cambiar los atributos de un elemento HTML, por ejemplo, cambiando el href de un enlace
// const ancla=document.getElementsByTagName("a");
// console.log(ancla[0].getAttribute("href"));
// ancla[0].setAttribute("href","https://www.google.com");
// console.log(ancla[0].getAttribute("href"));

//podemos preguntar si un elemento tiene una clase determinada, por ejemplo, preguntando si el contenedor tiene la clase "items-color1"
// const container=document.getElementsByClassName("contenedor");
// console.log(container);
// console.log(container[0].classList.contains("items-color1"));
// //en caso de que no la tenga tambien la podemos agregar
// container[0].classList.add("texto-marron");
// container[0].classList.remove("texto-marron");

// tambien se pueden crear nuevos elementos HTML desde JS, por ejemplo, creando un nuevo elemento li y agregandolo a la lista ul
// const listaItems=document.getElementsByTagName("ul");
// const item_nuevo=document.createElement("li");
// item_nuevo.innerText="Elemento 6";
// item_nuevo.classList.add("items-color1");
// listaItems[0].appendChild(item_nuevo);  
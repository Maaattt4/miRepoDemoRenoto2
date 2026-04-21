# manejo de sesiones

## Sesion

Es un mecanismo que mantiene el estado entre multiples peticiones HTTP 
de un mismo usuario, debido a que HTTP es un protocolo sin estado. Por
lo tanto la sesion es un contexto temporal asociado a un usuario y 
permite:

* identificarlo
* Guardar informacion relevante
* Dar continuidad en la interaccion

## Como funciona

Cliente ----> login
Servidor ----> Crea una sesion y le asigna un ID=abc123
Cliente ----> Guarda ese ID=abc123 (cookie, localStorage, sessionStorage, objeto JS, Base de datos del navegador)

Cliente ----> nueva peticion, debe enviar su ID
Servidor ----> busca el ID de la sesion y reconoce al usuario


## claves del funcionamiento


* La sesion se guarda en el servidor, y contiene los datos del usuario
* La cookie se guarda en el cliente, y contiene el ID de la sesion

## Almacenamiento en el cliente

* localStorage ----> accesible via JS y es persistente
* sessionStorage ----> Util para estados intermedios, se elimina al cerrar la pestaña
* Variable en memoria de JS ----> no es persistente
* IndexDB ----> Base de datos en el navegador
* Cookies ----> Configurables y de mayor seguridad con httpOnly

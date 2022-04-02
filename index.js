// La  escuela  de  música  Always  Music  es  reconocida  en  la  ciudad  por  graduar  a  grandes 
// músicos de reconocimiento mundial, sin embargo, a pesar de lo mucho que ha crecido con 
// el tiempo, nunca dejaron de utilizar excel como base de datos y han decidido cambiar esto 
// por un desarrollo personalizado.

// En  este  desafío  deberás  desarrollar  una  aplicación  en  Node  que  realice  consultas  a 
// PostgreSQL con el paquete “pg” para:

// Agregar un nuevo estudiante. 
// Consultar los estudiantes registrados. 
// Consultar estudiante por rut. 
// Actualizar la información de un estudiante. 
// Eliminar el registro de un estudiante. 

// Ya  que  el  caso  se  trata  de  un  proceso  de  desarrollo,  la  interacción  la  debes  realizar  con 
// argumentos por la línea de comandos.

// Antes de iniciar este desafío deberás crear una base de datos y una tabla con las siguientes 
// columnas:

// Nombre
// Rut
// Curso
// Nivel

/*
Se crea la base de datos llamada alwaysmusic y la tabla estudiantes

CREATE TABLE estudiantes (
    nombre varchar(30) NOT NULL,
    rut varchar(12) PRIMARY KEY,
    curso varchar(10) NOT NULL,
    nivel SMALLINT NOT NULL
);
*/

const { nuevo, consulta, consultaRut, editar, eliminar} = require("./gestion_Estudiantes.js");

//Capturando argumentos por linea de comandos
const argvS = process.argv.slice(2);

//Definiendo argumento comando
var comando = argvS[0];

//condicionando recepcion de argumento comando para ejecucion de funciones
if (comando == "nuevo") {
    nuevo(argvS[1], argvS[2], argvS[3], argvS[4]);
} else if (comando == "consulta") {
    consulta();
} else if (comando == "rut") {
    consultaRut(argvS[1]);
} else if (comando == "editar") {
    editar(argvS[1], argvS[2], argvS[3], argvS[4]);
} else if (comando == "eliminar") {
    eliminar(argvS[1]);
} else {
    console.log("Comando no reconocido");
}

//Nuevo estudiante
//node index.js nuevo 'Brian May' "12.345.678-9" "guitarra" "7"

//Consultar estudiante por rut
//node index.js rut "12.345.678-9"

//Consultar todos los estudiantes
//node index.js consulta

//Editar estudiante
//node index.js editar "Brian May" "12.345.678-9" "guitarra" "10"

//Eliminar estudiante
//node index.js eliminar "12.345.678-9"


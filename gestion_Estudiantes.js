const { Client } = require("pg");

const config = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "alwaysmusic"
};

//****************************************************************
//1. Realizar la conexión con PostgreSQL con la clase Client.
//****************************************************************
const client = new Client(config);

//****************************************************************
//2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
//****************************************************************
const nuevo = async function (nombre, rut, curso, nivel) {
    try {
        await client.connect();

        const query = "INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *";
        const values = [nombre, rut, curso, nivel];

        const res = await client.query(query, values);
        //console.log(res.rows[0].nombre);
        console.log(`Estudiante ${res.rows[0].nombre} agregado con éxito`);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

//****************************************************************
//3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
//****************************************************************
const consultaRut = async function (rut) {
    try {
        await client.connect();

        const query = "SELECT * FROM estudiantes WHERE rut = $1";
        const values = [rut];

        const res = await client.query(query, values);
        console.log(res.rows);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

//****************************************************************
//4. Crear una función asíncrona para  obtener  por  consola  todos  los  estudiantes registrados.
//****************************************************************
const consulta = async function () {
    try {
        await client.connect();

        const query = "SELECT * FROM estudiantes";
        const res = await client.query(query);
        console.log(res.rows);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

//****************************************************************
//5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
//****************************************************************
const editar = async function (nombre, rut, curso, nivel) {
    try {
        await client.connect();

        const query = "UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *";
        const values = [nombre, curso, nivel, rut];

        const res = await client.query(query, values);
        console.log(`Estudiante ${res.rows[0].nombre} editado con éxito`);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

//****************************************************************
//6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
//****************************************************************
const eliminar = async function (rut) {
    try {
        await client.connect();

        const query = "DELETE FROM estudiantes WHERE rut = $1";
        const values = [rut];
        const res = await client.query(query, values);
        //consicionando la respuesta de acuerdo a rowCount 
        if(res.rowCount === 1){
            //if rowCount es 0 significa que no se encontro el rut
            console.log(`Registro de estudiante con rut ${rut} eliminado con éxito`);
        } else if(res.rowCount === 0){
            //if rowCount es 1 significa que se encontro el rut, por lo que no fue eliminado
            console.log(`No existe un estudiante con rut ${rut}`);
        }

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

module.exports = { nuevo, consultaRut, consulta, editar, eliminar };
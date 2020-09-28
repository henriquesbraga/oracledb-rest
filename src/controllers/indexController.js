const oracledb = require('oracledb');
const {handleDatabaseOperation, doRelease} = require('../models/database');

function insertData (request, response) {
    var name = request.body.name;
    handleDatabaseOperation(request, response, (request, response, connection) => {
        let query = 'INSERT INTO names (id, name) values (names_seq.nextval, :name)';
        connection.execute(query, [name], {
            autoCommit: true,
            outFormat: oracledb.OBJECT
        }, (err, result) => {
            if(err){
                response.json(err.message);
            }
            else{
                response.status(201).send("Dados inseridos com sucesso.");
            }
            doRelease(connection);
        })

    })
};

function deleteData (request, response) {
    var id = request.body.id;
    handleDatabaseOperation(request, response, (request, response, connection) => {
        let query = 'DELETE FROM names WHERE id = :id';
        connection.execute(query, [id], {
            autoCommit: true,
            outFormat: oracledb.OBJECT
        }, (err, result) => {
            if(err){
                response.json(err.message);
            }
            else{
                response.status(200).send("Dados apagados com sucesso.");
            }
            doRelease(connection);
        })
    })
}

function updateData (request, response) {
    var name = request.body.name;
    var id = request.body.id;
    handleDatabaseOperation(request, response, (request, response, connection) => {
        let query = 'UPDATE names SET name = :name WHERE id = :id';
        connection.execute(query, [name, id], {
            autoCommit: true,
            outFormat: oracledb.OBJECT
        }, (err, result) => {
            if(err){
                response.json(err.message);
            }
            else{
                response.status(201).send("Dados Atualizados com sucesso.");
            }
            doRelease(connection);
        })
    })
}

function selectAll (request, response) {
    handleDatabaseOperation(request, response, (request, response, connection) => {
        let query = 'SELECT * FROM names';
        connection.execute(query, [], {
            outFormat: oracledb.OBJECT
        }, (err, result) => {
            if(err){
                response.json(err.message);
            }
            else{
                response.json(result.rows);
            }
            doRelease(connection);
        })
    })
}

function selectById (request, response) {id
    var id = request.query.id;
    handleDatabaseOperation(request, response, (request, response, connection) => {
        let query = 'SELECT * FROM names where id = :id';
        connection.execute(query, [id], {
            outFormat: oracledb.OBJECT
        }, (err, result) => {
            if(err){
                response.json(err.message);
            }
            else{
                response.json(result.rows);
            }
            doRelease(connection);
        })
    })
}


module.exports = {
    insertData,
    deleteData,
    updateData,
    selectAll,
    selectById
}
const oracledb = require('oracledb');

function handleDatabaseOperation(request, response, callback){
    
    console.log(request.method + ':' + request.url);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    console.log('Handle request: ' + request.url);
    var connectString = 'localhost:1521/XE';
    console.log('ConnectString: ' + connectString);

    oracledb.getConnection(
        {
            user: 'hr',
            password: '1234',
            connectString: connectString
        },
        function (err, connection){
            if(err){
                console.log('Error in connection...');
                console.log('Error message: ' + err.message);

                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    status: 500,
                    message: 'Error connecting to DB',
                    detailed_message: err.message
                }));
                return;
            }
            console.log('Connection acquired - go execute ');
            callback(request, response, connection);
        }
    );
  
}

function doRelease(connection){
    connection.release(
        function (err){
            if(err){
                console.error(err.message);
            }
        }
    );
}

module.exports = {
    handleDatabaseOperation,
    doRelease
}
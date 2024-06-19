const http = require('http');

// Función genérica para enviar peticiones POST
function sendPostRequest(command) {
    const responseService = { "op": command, "key": "815751D3FE174F51E6877CE624CFFBFF" };
    const dataSendService = JSON.stringify(responseService, null, 2);

    const options_service = {
        hostname: '144.217.189.109',
        port: 80,
        path: '/server/s_service.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(dataSendService)
        },
        timeout: 60000 // 60 segundos de tiempo de espera para la solicitud HTTP
    };

    const request = http.request(options_service, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            console.log(`Respuesta del servidor para ${command}:`, responseData);
        });
    });

    request.on('error', (error) => {
        console.error(`Request error for ${command}:`, error);
    });

    request.on('timeout', () => {
        console.error(`Request timeout for ${command}`);
        request.destroy();
    });

    request.write(dataSendService);
    request.end();
}

// Funciones específicas para cada comando
function sendService1Min() {
    sendPostRequest('service_1min');
}

function sendService5Min() {
    sendPostRequest('service_5min');
}

function sendService30Min() {
    sendPostRequest('service_30min');
}

function sendService1Hour() {
    sendPostRequest('service_1h');
}

function sendService12Hours() {
    sendPostRequest('service_12h');
}

function sendServiceTwoSecond(){
    sendPostRequest('get_cmd_exec')
}

// Configurar los intervalos
setInterval(sendServiceTwoSecond,2000) //Cada 2 segundos
setInterval(sendService1Min, 60000); // Cada 1 minuto
setInterval(sendService5Min, 5 * 60000); // Cada 5 minutos
setInterval(sendService30Min, 30 * 60000); // Cada 30 minutos
setInterval(sendService1Hour, 60 * 60000); // Cada 1 hora
setInterval(sendService12Hours, 12 * 60 * 60000); // Cada 12 horas

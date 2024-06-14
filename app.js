const http = require('http');

// Función genérica para enviar peticiones POST
function sendPostRequest(command) {
    const responseService = { "op": command, "key": "815751D3FE174F51E6877CE624CFFBFF" };
    const dataSendService = JSON.stringify(responseService, null, 2);

    const options_service = {
        hostname: '35.222.19.240',
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

sendService1Min();
sendService5Min();
sendService30Min();
sendService1Hour();
sendService12Hours();
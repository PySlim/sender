const http = require('http');

// Define la función para enviar la petición POST
function sendPostRequest() {
    const responseService = { "op": "service_1min", "key": "815751D3FE174F51E6877CE624CFFBFF" };
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
            console.log('Respuesta del servidor:', responseData);
        });
    });

    request.on('error', (error) => {
        console.error('Request error:', error);
    });

    request.on('timeout', () => {
        console.error('Request timeout');
        request.destroy();
    });

    request.write(dataSendService);
    request.end();
}

// Llama a la función cada 60 segundos (60000 milisegundos)
setInterval(sendPostRequest, 60000);

// Llamar la función inicialmente si deseas que la primera petición se envíe de inmediato
sendPostRequest();

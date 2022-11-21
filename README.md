# CoderBackend

## Desafio entregable n° 19 - TESTEAMOS NUESTRA API REST
- **Formato:** link a un repositorio en Github con el proyecto cargado.

- **Sugerencia:** no incluir los node_modules

- **Consigna:**
Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando
todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.
Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones,
persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).
No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las
funcionalidades desarrolladas.

● Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la
funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles,
incorporación de nuevos productos, modificación y borrado.


● Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones
correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida
en el cliente HTTP.


● Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y
Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.


● Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado
de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.


## Resolucion consigna:

**● Test rest-full.test:**
Resultado:
```console
> npm run test-rest
> mocha ./src/test/rest-full.test.js --no-timeout

  Test API REST      
    Test get producto
      ✔ obtiene productos (174ms)
    Test post producto
      ✔ Crea producto (163ms)
    Test update producto
      ✔ Modificacion precio producto por id (146ms)
    Test delete producto
      ✔ Eliminacion  producto por id (173ms)

  4 passing (634ms)
```

**● Test axios-client.test:**  
Resultado:
```console
::: Test post producto :::
{
  title: 'tongue',
  price: 1200,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-grin-tongue-256.png',
  _id: '6372e2ad62a1122f3cdf2f64',
  __v: 0
}
::: Test update producto :::
PUT {
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '141',
    etag: 'W/"8d-iWlP2IWYqirPL2Tq0YwYym+ymvw"',
    'set-cookie': [
      'connect.sid=s%3Aemye5ks2w_2Ah_VKKqlBun6OgYuRrCAY.6vyi7WT8Jww6RjOkjzPh6EhCZHp6wBT%2FQ%2Bi1V2VpDwc; Path=/; Expires=Tue, 15 Nov 2022 00:52:57 GMT; HttpOnly'
    ],
    date: 'Tue, 15 Nov 2022 00:51:57 GMT',
    connection: 'close',
    [Symbol(defaults)]: null
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: [Function], Blob: null },
    validateStatus: [Function: validateStatus],
    headers: AxiosHeaders {
      'Content-Type': 'application/json',
      'User-Agent': 'axios/1.1.3',
      'Content-Length': '134',
      'Accept-Encoding': 'gzip, deflate, br',
      [Symbol(defaults)]: [Object]
    },
    method: 'put',
    url: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
    data: '{"title":"Smile","price":1260,"thumbnail":"https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-laugh-wink-512.png"}'
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    maxRequestsOnConnectionReached: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: true,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: null,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    _closed: false,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'localhost',
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: null,
      _server: null,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(async_id_symbol)]: 242,
      [Symbol(kHandle)]: [TCP],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kSetNoDelay)]: false,
      [Symbol(kSetKeepAlive)]: true,
      [Symbol(kSetKeepAliveInitialDelay)]: 60,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: 'PUT /api/productos/636f24a40d9e5e95da20feac HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'Content-Type: application/json\r\n' +
      'User-Agent: axios/1.1.3\r\n' +
      'Content-Length: 134\r\n' +
      'Accept-Encoding: gzip, deflate, br\r\n' +
      'Host: localhost:8080\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 80,
      protocol: 'http:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype],
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 4,
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'PUT',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/api/productos/636f24a40d9e5e95da20feac',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: undefined,
      socket: [Socket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [Socket],
      _consuming: false,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 14,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'localhost',
    protocol: 'http:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 134,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'content-type': [Array],
      'user-agent': [Array],
      'content-length': [Array],
      'accept-encoding': [Array],
      host: [Array]
    }
  },
  data: {
    prodUpdated: {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    },
    mensaje: 'Producto actualizado'
  }
}

::: Test delete producto :::
DELETE {
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders {
    'x-powered-by': 'Express',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '42',
    etag: 'W/"2a-WNE0HMKbelNiV1R+sQhlN06RbkE"',
    'set-cookie': [
      'connect.sid=s%3A1lVIXrNv87HAzULbXD7Bo3zWnohuvdcD.owanIIhrb1f5%2Fa3BI1gOLPdKTR3iWiolEUZUaPtrPX8; Path=/; Expires=Tue, 15 Nov 2022 00:52:57 GMT; HttpOnly'
    ],
    date: 'Tue, 15 Nov 2022 00:51:57 GMT',
    connection: 'close',
    [Symbol(defaults)]: null
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: [Function], Blob: null },
    validateStatus: [Function: validateStatus],
    headers: AxiosHeaders {
      'User-Agent': 'axios/1.1.3',
      'Accept-Encoding': 'gzip, deflate, br',
      [Symbol(defaults)]: [Object]
    },
    method: 'delete',
    url: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
    data: undefined
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    maxRequestsOnConnectionReached: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: false,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: 0,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    _closed: false,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'localhost',
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: null,
      _server: null,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(async_id_symbol)]: 245,
      [Symbol(kHandle)]: [TCP],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kSetNoDelay)]: false,
      [Symbol(kSetKeepAlive)]: true,
      [Symbol(kSetKeepAliveInitialDelay)]: 60,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: 'DELETE /api/productos/636f24a40d9e5e95da20feac HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'User-Agent: axios/1.1.3\r\n' +
      'Accept-Encoding: gzip, deflate, br\r\n' +
      'Host: localhost:8080\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 80,
      protocol: 'http:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype],
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 4,
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'DELETE',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/api/productos/636f24a40d9e5e95da20feac',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: undefined,
      socket: [Socket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [Socket],
      _consuming: false,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 14,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'localhost',
    protocol: 'http:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'http://localhost:8080/api/productos/636f24a40d9e5e95da20feac',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'user-agent': [Array],
      'accept-encoding': [Array],
      host: [Array]
    }
  },
  data: { mensaje: 'Producto eliminado con exito' }
}
::: Test get producto :::
[
  {
    _id: '6372da6782e7623d9e3d0c55',
    title: 'superTest',
    price: 21100,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-check-512.png',
    __v: 0
  }
]
``` 
# CoderBackend

## Desafio entregable n° 15 - LOGGERS, GZIP y ANÁLISIS DE PERFORMANCE
- **Formato:** link a un repositorio en Github con el proyecto cargado.

- **Sugerencia:** no incluir los node_modules

- **Consigna:**
Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un
caso y otro.

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:

● Ruta y método de todas las peticiones recibidas por el servidor (info)
● Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
● Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:

● Loggear todos los niveles a consola (info, warning y error)
● Registrar sólo los logs de warning a un archivo llamada warn.log
● Enviar sólo los logs de error a un archivo llamada error.log

Luego, realizar el análisis completo de performance del servidor con el que venimos
trabajando.

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la
información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:

1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos
luego de procesarlos con --prof-process.
Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con
20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas
en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)

2) El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos
menos performantes sobre el archivo fuente de inspección.

3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).

Al final incluir la conclusión obtenida a partir del análisis de los datos.


## Resolucion consigna:

Incorporar al proyecto de servidor de trabajo la compresión gzip. Verificar sobre la ruta /info con y sin compresión:
```console
● Prueba del endpoint sin compresión: http://localhost:3030/info
● Prueba del endpoint con gzip: http://localhost:3030/info/gzip
```


Resultado:
```console
GET /info      200 1.552 ms 
GET /info/gzip 200 1.749 ms 

```

Incorporar log: En carpeta log se encuentra
```console
2022-09-30T11:51:46.754Z [32minfo[39m: 	Process Id master 8568
2022-09-30T11:51:48.173Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 2192
2022-09-30T11:51:48.177Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 4584
2022-09-30T11:51:48.178Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 7464
2022-09-30T11:51:48.204Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 8956
2022-09-30T11:51:48.210Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 4136
2022-09-30T11:51:48.226Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 2252
2022-09-30T11:51:48.230Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 944
2022-09-30T11:51:48.236Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 17592
2022-09-30T11:51:48.240Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 11700
2022-09-30T11:51:48.246Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 1328
2022-09-30T11:51:48.253Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 16468
2022-09-30T11:51:48.260Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 16060
2022-09-30T11:51:48.276Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 12832
2022-09-30T11:51:48.284Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 18840
2022-09-30T11:51:48.297Z [32minfo[39m: 	Servidor express escuchando en el puerto 3030 - PID WORKER 18328
```

Pruebas con Artillery:

modo fork:
```console
npm run dev-fork
artillery quick -c 50 -n 20 "http://localhost:3030/info" > result_fork.txt
```

Resultado:
```console
--------------------------------
Summary report @ 14:24:03(-0300)
--------------------------------
http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 356/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 2
  max: ......................................................................... 56
  median: ...................................................................... 22
  p95: ......................................................................... 40
  p99: ......................................................................... 47.9
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 50
vusers.created_by_name.0: ...................................................... 50
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 208.1
  max: ......................................................................... 864.8
  median: ...................................................................... 632.8
  p95: ......................................................................... 854.2
  p99: ......................................................................... 854.2
```

Modo cluster:  
```console
npm run dev-cluster
artillery quick -c 50 -n 20 "http://localhost:3030/info" > result_cluster.txt
```

Resultado:
```console  
--------------------------------
Summary report @ 14:36:56(-0300)
--------------------------------
http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 330/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 3
  max: ......................................................................... 66
  median: ...................................................................... 24.8
  p95: ......................................................................... 47.9
  p99: ......................................................................... 59.7
http.responses: ................................................................ 1000
vusers.completed: .............................................................. 50
vusers.created: ................................................................ 50
vusers.created_by_name.0: ...................................................... 50
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 225.4
  max: ......................................................................... 1013.1
  median: ...................................................................... 772.9
  p95: ......................................................................... 1002.4
  p99: ......................................................................... 1002.4
```

Pruebas con PROFILING:

```console
npm run dev-prof
artillery quick -c 50 -n 20 "http://localhost:8080/info" > artillery_prof.txt  
```

Luego renombre uno de los archivos "isolate-XXXX-v8-XXXX.log" a prof-v8.log, para convertir a legible el log

```console
node --prof-process prof-v8.log > prof_slow.txt
```


Resultado:
```console
Statistical profiling result from prof-v8.log, (2188 ticks, 0 unaccounted, 0 excluded).

 [Shared libraries]:
   ticks  total  nonlib   name
   2060   94.1%          C:\Windows\SYSTEM32\ntdll.dll
    125    5.7%          C:\Program Files\nodejs\node.exe
      1    0.0%          C:\Windows\System32\KERNEL32.DLL

 [JavaScript]:
   ticks  total  nonlib   name
      1    0.0%   50.0%  Function: ^getPathFromURLWin32 node:internal/url:1363:29
      1    0.0%   50.0%  Function: ^<anonymous> node:internal/fs/utils:358:35

 [C++]:
   ticks  total  nonlib   name

 [Summary]:
   ticks  total  nonlib   name
      2    0.1%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      6    0.3%  300.0%  GC
   2186   99.9%          Shared libraries

 [C++ entry points]:
   ticks    cpp   total   name

 [Bottom up (heavy) profile]:
  Note: percentage shows a share of a particular caller in the total
  amount of its parent calls.
  Callers occupying less than 1.0% are not shown.

   ticks parent  name
   2060   94.1%  C:\Windows\SYSTEM32\ntdll.dll

    125    5.7%  C:\Program Files\nodejs\node.exe
    104   83.2%    C:\Program Files\nodejs\node.exe
     25   24.0%      Function: ^compileFunction node:vm:308:25
     25  100.0%        Function: ^wrapSafe node:internal/modules/cjs/loader:1017:18
     25  100.0%          Function: ^Module._compile node:internal/modules/cjs/loader:1059:37
     25  100.0%            Function: ^Module._extensions..js node:internal/modules/cjs/loader:1114:37
     14   13.5%      Function: ^realpathSync node:fs:2425:22
     12   85.7%        Function: ^toRealPath node:internal/modules/cjs/loader:393:20
     10   83.3%          Function: ^tryFile node:internal/modules/cjs/loader:384:17
     10  100.0%            Function: ^tryExtensions node:internal/modules/cjs/loader:400:23
      2   16.7%          Function: ^Module._findPath node:internal/modules/cjs/loader:494:28
      2  100.0%            Function: ^Module._resolveFilename node:internal/modules/cjs/loader:848:35
      1    7.1%        LazyCompile: ~toRealPath node:internal/modules/cjs/loader:393:20
      1  100.0%          LazyCompile: ~tryFile node:internal/modules/cjs/loader:384:17
      1  100.0%            LazyCompile: ~tryExtensions node:internal/modules/cjs/loader:400:23
      1    7.1%        Function: ^finalizeResolution node:internal/modules/esm/resolve:397:28
      1  100.0%          Function: ^moduleResolve node:internal/modules/esm/resolve:988:23
      1  100.0%            Function: ^defaultResolve node:internal/modules/esm/resolve:1128:30
     12   11.5%      Function: ^stat node:internal/modules/cjs/loader:151:14
      8   66.7%        Function: ^Module._findPath node:internal/modules/cjs/loader:494:28
      8  100.0%          Function: ^Module._resolveFilename node:internal/modules/cjs/loader:848:35
      8  100.0%            Function: ^Module._load node:internal/modules/cjs/loader:757:24
      4   33.3%        Function: ^tryFile node:internal/modules/cjs/loader:384:17
      4  100.0%          Function: ^tryExtensions node:internal/modules/cjs/loader:400:23
      3   75.0%            Function: ^Module._findPath node:internal/modules/cjs/loader:494:28
      1   25.0%            Function: ^tryPackage node:internal/modules/cjs/loader:338:20
      7    6.7%      Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      7  100.0%        Function: ^nativeModuleRequire node:internal/bootstrap/loaders:332:29
      2   28.6%          Function: ~<anonymous> node:crypto:1:1
      2  100.0%            Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      1   14.3%          LazyCompile: ~initCJSParse node:internal/modules/esm/translators:58:28
      1  100.0%            LazyCompile: ~commonjsStrategy node:internal/modules/esm/translators:148:60
      1   14.3%          Function: ~<anonymous> node:tls:1:1
      1  100.0%            Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      1   14.3%          Function: ~<anonymous> node:internal/source_map/source_map_cache:1:1
      1  100.0%            Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      1   14.3%          Function: ~<anonymous> node:internal/modules/esm/loader:1:1
      1  100.0%            Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      1   14.3%          Function: ~<anonymous> node:http:1:1
      1  100.0%            Function: ^compileForInternalLoader node:internal/bootstrap/loaders:299:27
      4    3.8%      Function: ^openSync node:fs:576:18
      4  100.0%        Function: ^readFileSync node:fs:450:22
      4  100.0%          Function: ^Module._extensions..js node:internal/modules/cjs/loader:1114:37
      4  100.0%            Function: ^Module.load node:internal/modules/cjs/loader:969:33
      3    2.9%      LazyCompile: ~open node:internal/fs/promises:450:20
      3  100.0%        LazyCompile: ~readFile node:internal/fs/promises:788:24
      3  100.0%          LazyCompile: ~defaultGetSource node:internal/modules/esm/get_source:30:32
      3  100.0%            LazyCompile: ~defaultLoad node:internal/modules/esm/load:13:27
      3    2.9%      Function: ^closeSync node:fs:526:19
      3  100.0%        Function: ^readFileSync node:fs:450:22
      3  100.0%          Function: ^Module._extensions..js node:internal/modules/cjs/loader:1114:37
      3  100.0%            Function: ^Module.load node:internal/modules/cjs/loader:969:33
      2    1.9%      LazyCompile: ~isatty node:tty:42:16
      2  100.0%        LazyCompile: ~useColors D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\debug\src\node.js:75:19
      2  100.0%          LazyCompile: ~createDebug D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\debug\src\debug.js:63:21
      1   50.0%            Function: ~<anonymous> D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\send\index.js:1:1
      1   50.0%            Function: ~<anonymous> D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\express\lib\router\route.js:1:1
      2    1.9%      Function: ^getOptions node:internal/fs/utils:315:20
      2  100.0%        Function: ^readFileSync node:fs:450:22
      2  100.0%          Function: ^Module._extensions..js node:internal/modules/cjs/loader:1114:37
      2  100.0%            Function: ^Module.load node:internal/modules/cjs/loader:969:33
      2    1.6%    Function: ^toRealPath node:internal/modules/cjs/loader:393:20
      2  100.0%      Function: ^tryFile node:internal/modules/cjs/loader:384:17
      2  100.0%        Function: ^tryExtensions node:internal/modules/cjs/loader:400:23
      1   50.0%          Function: ^tryPackage node:internal/modules/cjs/loader:338:20
      1  100.0%            Function: ^Module._findPath node:internal/modules/cjs/loader:494:28
      1   50.0%          Function: ^Module._findPath node:internal/modules/cjs/loader:494:28
      1  100.0%            Function: ^Module._resolveFilename node:internal/modules/cjs/loader:848:35
      2    1.6%    Function: ^Module node:internal/modules/cjs/loader:172:16
      2  100.0%      Function: ^Module._load node:internal/modules/cjs/loader:757:24
      2  100.0%        Function: ^Module.require node:internal/modules/cjs/loader:997:36
      2  100.0%          Function: ^require node:internal/modules/cjs/helpers:101:31
      1   50.0%            Function: ~<anonymous> D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\socket.io\dist\client.js:1:1
      1   50.0%            Function: ~<anonymous> D:\Dev\Coderhouse\Coderbackend-31020\Desafio15\node_modules\express-session\index.js:1:1
```

Pruebas con AUTOCANNON:

agregá dos scripts en package.json:
```console
"dev-test": "node ./src/utils/benchmark.util.js",
"dev-start": "0x ./src/server.js",
"dev-inspect": "node --inspect ./src/server.js -p 3030"	
```

dev-test:
```console
	npm run dev-test.
```

resultado:
```console	
Running 20s test @ http://localhost:8080/info
100 connections

┌─────────┬──────┬──────┬───────┬──────┬──────┬───────┬──────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg  │ Stdev │ Max  │
├─────────┼──────┼──────┼───────┼──────┼──────┼───────┼──────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 0 ms │ 0 ms │ 0 ms  │ 0 ms │
└─────────┴──────┴──────┴───────┴──────┴──────┴───────┴──────┘
┌───────────┬─────┬──────┬─────┬───────┬─────┬───────┬─────┐  
│ Stat      │ 1%  │ 2.5% │ 50% │ 97.5% │ Avg │ Stdev │ Min │  
├───────────┼─────┼──────┼─────┼───────┼─────┼───────┼─────┤  
│ Req/Sec   │ 0   │ 0    │ 0   │ 0     │ 0   │ 0     │ 0   │  
├───────────┼─────┼──────┼─────┼───────┼─────┼───────┼─────┤  
│ Bytes/Sec │ 0 B │ 0 B  │ 0 B │ 0 B   │ 0 B │ 0 B   │ 0 B │  
└───────────┴─────┴──────┴─────┴───────┴─────┴───────┴─────┘  

Req/Bytes counts sampled once per second.
# of samples: 20

171k requests in 20.08s, 0 B read
171k errors (0 timeouts)	
```	
	
dev-start:
![Captura1](./src/public/img/1.png)
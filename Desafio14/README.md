# CoderBackend

## Desafio entregable n° 14 - SERVIDOR CON BALANCE DE CARGA
- **Formato:** link a un repositorio en Github con el proyecto cargado.

- **Sugerencia:** no incluir los node_modules

- **Consigna:**

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en
la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho
parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no
pasarlo, el servidor iniciará en modo fork.

  - Agregar en la vista info, el número de procesadores presentes en el servidor.

  - Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de
procesos tomados por node.

  - Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su
correcta operación. Listar los procesos por Forever y por sistema operativo.

  - Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus
modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

  - Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del
código del servidor se vea reflejado inmediatamente en todos los procesos.

  - Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto
8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a
un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4
instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

- **Aspectos a incluir en el entregable:**

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben
ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las
instancias de servidores de modo que soporten la configuración detallada en los puntos
anteriores.
Ejemplo:

● pm2 start ./miservidor.js -- --port=8080 --modo=fork

● pm2 start ./miservidor.js -- --port=8081 --modo=cluster

● pm2 start ./miservidor.js -- --port=8082 --modo=fork

### Resolución

servidor modo cluster:
```console
npm run dev-cluster
```

servidor modo Fork:
```console
npm run dev-fork
```

iniciar servidor con forever modo cluster:
```console
npm run prod-cluster
```

iniciar servidor con forever modo fork:
```console
npm run prod-fork
```

Listado de procesos con forever:
```console
forever list
```

detener todos los proceso de forever:
```console
forever stopall
```

Con pm2 teoricamente permite que mediante parámetro podamos recibir el puerto y el modo fork o modo cluster
se generaron 4 clusters en 8082, 8083, 8084 y 8085:

```console
pm2 start ./src/server.js --name="ServerCluster8082" --watch -i 2  -- -p 8082
pm2 start ./src/server.js --name="ServerCluster8083" --watch -i 2  -- -p 8083
pm2 start ./src/server.js --name="ServerCluster8084" --watch -i 2  -- -p 8084
pm2 start ./src/server.js --name="ServerCluster8085" --watch -i 2  -- -p 8085

nota: este proceso no me funciono correctamente, pero si pude hacerlo funcionar mediante fork y el puerto, por ejemplo:
pm2 start ./src/server.js --name="ServerFork8082" --watch -- -p 8082
```

Listado con servicios activos:
```console
pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ?    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ServerCluster8082│ default     │ 1.0.0   │ cluster │ 6204     │ 93s    │ 1    │ online    │ 0%       │ 29.5mb   │ jaime    │ enabled  │
│ 1   │ ServerCluster8082│ default     │ 1.0.0   │ cluster │ 10684    │ 93s    │ 1    │ online    │ 0%       │ 29.4mb   │ jaime    │ enabled  │
│ 2   │ ServerCluster8083│ default     │ 1.0.0   │ cluster │ 6916     │ 57s    │ 1    │ online    │ 0%       │ 30.5mb   │ jaime    │ enabled  │
│ 3   │ ServerCluster8083│ default     │ 1.0.0   │ cluster │ 13404    │ 57s    │ 1    │ online    │ 0%       │ 30.2mb   │ jaime    │ enabled  │
│ 4   │ ServerCluster8084│ default     │ 1.0.0   │ cluster │ 20036    │ 45s    │ 0    │ online    │ 0%       │ 30.4mb   │ jaime    │ enabled  │
│ 5   │ ServerCluster8084│ default     │ 1.0.0   │ cluster │ 15244    │ 45s    │ 0    │ online    │ 0%       │ 30.3mb   │ jaime    │ enabled  │
│ 6   │ ServerCluster8085│ default     │ 1.0.0   │ cluster │ 15664    │ 36s    │ 0    │ online    │ 0%       │ 29.8mb   │ jaime    │ enabled  │
│ 7   │ ServerCluster8085│ default     │ 1.0.0   │ cluster │ 872      │ 36s    │ 0    │ online    │ 0%       │ 30.1mb   │ jaime    │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

Log de pm2:
```console
pm2 logs
```

Monitor en vivo de pm2:
```console
pm2 monit
```

Bajar todos los servicios activos:
```console
pm2 delete all 
```

realizar cambios en el archivo config de ngnix:
```console
events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream backend {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085 weight=3;
    }
    server {
        listen 8080;
        location /randoms/ {
            proxy_pass http://backend/random/;
        }
    }
}
```

Chequeo de la configuracion: 
```console
nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Detener nginx:
```console
nginx -s stop
```

Verificar que ngnix no se este ejecutando:
```console
tasklist /fi "imagename eq ngnix.exe"
INFORMACIÓN: no hay tareas ejecutándose que coincidan con los criterios especificados.
```

Inicia el servicio de nginx:
```console
start nginx
```

Verificar que el servicio este activo:
```console
tasklist /fi "imagename eq nginx.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
nginx.exe                    19236 Console                    1     7.888 KB
nginx.exe                    20760 Console                    1     8.276 KB
nginx.exe                    15564 Console                    1     7.916 KB
nginx.exe                    20872 Console                    1     8.088 KB
nginx.exe                    10208 Console                    1     7.916 KB
nginx.exe                     7864 Console                    1     8.088 KB
```

acceder a través de http://localhost:8080/random/
Cuando se agregas un log cuando se genere la lista y podemos comprobarlo a través de **pm2 monit**

```console
pm2 monit
┌─ Process List ─────────────────────────────────────────────────────────────────────────┐┌──  ServerCluster8082 Logs  ──────────────────────────────────────────────────────────────────────────┐ 
│[ 0] ServerCluster8082                                 Mem:  51 MB    CPU:  0 %  online ││ ServerCluster8082 > GET /randoms/number?number=100000 200 122.718 ms - 9401                          │ 
│[ 1] ServerCluster8083                                 Mem:  51 MB    CPU:  0 %  online ││                                                                                                      │ 
│[ 2] ServerCluster8084                                 Mem:  50 MB    CPU:  0 %  online ││                                                                                                      │ 
│[ 3] ServerCluster8085                                 Mem:  50 MB    CPU:  0 %  online ││                                                                                                      │ 
└────────────────────────────────────────────────────────────────────────────────────────┘└──────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
┌─ Custom Metrics ───────────────────────────────────────────────────────────────────────┐┌─ Metadata ───────────────────────────────────────────────────────────────────────────────────────────┐ 
│ HTTP                                                                     0.04 req/min  ││ App Name              ServerCluster8082                                                              │ 
│ Used Heap Size                                                              21.08 MiB  ││ Namespace             default                                                                        │ 
│ Heap Usage                                                                    90.01 %  ││ Version               1.0.0                                                                          │ 
│ Heap Size                                                                   23.42 MiB  ││ Restarts              10                                                                             │ 
│ HTTP P95 Latency                                                               124 ms  ││ Uptime                82s                                                                            │ 
└────────────────────────────────────────────────────────────────────────────────────────┘└──────────────────────────────────────────────────────────────────────────────────────────────────────┘ 
```
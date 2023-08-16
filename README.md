## BACKEND PORTS

1. chatSystem : 8085
2. cloudinarySystem : 8081
3. contentResponseSystem : 8083
4. elasticSystem : 8082
5. mails : 8087
6. notifSystem: 8089
7. ttsSystem : 8088
8. userUtilSystem: 8080
9. Authentication System : 8000
10. Following System : 8001
11. Notification System : 8002

## Docker Builds 
*Preferably stop MongoDB service from task manager first*

PULL UP CONTAINERS (no scaling):  
_Comment & uncomment lines in `search` and `nginx` services in the `docker-compose.yaml` file_

```
docker compose up --build --no-attach mdb --no-attach nginx --scale nginx=0
```

PULL UP CONTAINERS (horizontal scaling with nginx rp&ld):

```
docker compose up --build --no-attach mdb --no-attach nginx --scale search=4
```

PULL DOWN CONTAINERS:

```
docker compose down
```

### OR build them one by one using the following:

```
cd ./mails; if($?) { docker build -t dkt_mail:latest . }; if($?) { cd .. };
```

```
cd ./elasticSystem; if($?) { docker build -t dkt_search:latest . };  if($?) { cd .. };
```

```
cd ./userUtilSystem; if($?) { docker build -t dkt_util:latest . };  if($?) { cd .. };
```

```
cd ./ttsSystem; if($?) { docker build -t dkt_tts:latest . };  if($?) { cd .. };
```

```
cd ./notifSystem; if($?) { docker build -t dkt_notif:latest . };  if($?) { cd .. };
```

```
cd ./chatSystem; if($?) { docker build -t dkt_chat:latest . };  if($?) { cd .. };
```

```
cd  ./cloudinarySystem ; if($?) { docker build -t dkt_cloud:latest . };  if($?) { cd .. };
```

```
cd  ./contentResponseSystem ; if($?) { docker build -t dkt_lcs:latest . };  if($?) { cd .. };
```

## Database SQL

Create a postgresql database  
PostgresSQL name SIH2022C  
Before starting any backend service of python use the following command for first time:

```
python manage.py makemigrations  
```
```
python manage.py migrate 
```
```
python manage.py runserver
```  

**First 2 commands are not required for further use.**

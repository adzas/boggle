
## Run the application:

0. install docker: https://docs.docker.com/get-started/get-docker/

1. copy a .env.example file and create a .env file.

```
cp .env.example .env
```

2. run docker:
```
docker-compose up -d --build
```

3. prepare environement:
```
docker exec -it boggle-web-server composer install
&
npm install
&
npm run dev
&
docker exec -it boggle-web-server php artisan key:generate
&
docker exec -it boggle-web-server php artisan migrate:fresh
&
docker exec -it boggle-web-server php artisan db:seed
```

4. app is ready:

localhost:8000

5. If you want to off the application go this:

```docker-compose down```


#### notice:

save file: composer.lock
use: **composer install** not update
declare hard version php

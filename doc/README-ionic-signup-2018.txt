
TODO:
- captcha buttons on home screen
- No updates: /api/rooms/update: add localhost to CORS list on signup.js
	- whitelist: edit https://localhost:8100 to http://
- use ssl certificate for https: add cert to nginx


PROD environment
================

1) git clone http://github.com/emadruga/2019-signup

2) git clone http://github.com/emadruga/2019-restapi

3) Certificar das versões necessárias para webapp (ambiente desenvolv):

[emadruga@webapp]$ ionic info

Ionic:

   ionic (Ionic CLI)             : 4.12.0 (/Users/emadruga/.nvm/versions/node/v10.16.0/lib/node_modules/ionic)
   Ionic Framework               : @ionic/angular 4.7.1
   @angular-devkit/build-angular : 0.801.3
   @angular-devkit/schematics    : 8.1.3
   @angular/cli                  : 8.1.3
   @ionic/angular-toolkit        : 2.0.0

Capacitor:

   capacitor (Capacitor CLI) : 1.1.1
   @capacitor/core           : 1.1.1

System:

   NodeJS : v10.16.0 (/Users/emadruga/.nvm/versions/node/v10.16.0/bin/node)
   npm    : 6.9.0
   OS     : macOS Mojave

4) nvm ls-remote
5) nvm install v10.16.0
6) cd 2019-selecao/2019-signup
7) nvm use v10.16.0
8) npm install -g ionic@4.12.0
9) npm install (instala angular e todas as outras dependencias)
10) ionic info (versoes estão batendo?)

11) SECRET_KEY: from randomkeygen.com, pick a 'CodeIgniter Encryption key'
12) Update src/environments/environment.prod.ts with SECRET_KEY chosen.

    export const SERVER_URL =  'http://cibernetica.inmetro.gov.br';
    export const SECRET_KEY   = "<chosen-key-here>";
    
13) Update .bashrc with the very same chosen key.
    export SECRET_KEY="<chosen-key-here>"

14) source ~/.bashrc

15) Clean up mongodb, and check user permissions.

$ mongo -u "mongoadmin"
Enter password:
---
> show users
{
	"_id" : "test.emadruga",
	"user" : "emadruga",
	"db" : "test",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "hotels"
		},
		{
			"role" : "readWrite",
			"db" : "test"
		}
	],
	"mechanisms" : [
		"SCRAM-SHA-1",
		"SCRAM-SHA-256"
	]
}

> use hotels
>
16) save current contents of mongodb:

$ mongoexport -h localhost:27017 -d hotels -c rooms -u mongoadmin  --out bkup.json
2019-10-17T15:57:47.453+0000	connected to: localhost:27017
2019-10-17T15:57:47.822+0000	exported 1086 records


17) keep the database, but wipe out its contents:
$ mongo -u "mongoadmin"
Enter password:
---
> use hotels
> db.dropDatabase()
{ "dropped" : "hotels", "ok" : 1 }
> db.stats()
{
	"db" : "hotels",
	"collections" : 0,
	"views" : 0,
	"objects" : 0,
	"avgObjSize" : 0,
	"dataSize" : 0,
	"storageSize" : 0,
	"numExtents" : 0,
	"indexes" : 0,
	"indexSize" : 0,
	"fileSize" : 0,
	"fsUsedSize" : 0,
	"fsTotalSize" : 0,
	"ok" : 1
}
>

18) Clone code from github.

$ mkdir ~/2019-signup
$ cd 2019-signup
$ git clone github.com/emadruga/2019-signup
$ git clone github.com/emadruga/2019-restapi

19) Config the restAPI:

$ cd ./2019-restapi
$ npm install     (install  express, mongoose, etc.)
$ node SignupRestAPI.js

19) Config the web interface:

$ cd ~/2019-signup/2019-signup

In main.ts:
// disable console log
console.log = function(){};


In environments/environment.prod.ts
// update SECRET_KEY

$ ionic build --prod


21) Install http-server and pm2:

$ npm install http-server

$ npm uninstall pm2
$ npm install pm2@latest -g
$ pm2 update (to replace old code in memory)  

22) Start processes with pm2:

$ cd ~/2019-signup/2019-restapi
$ pm2 start SignupRestAPI.js --name "Rest API" --log-date-format="YYYY-MM-DD HH:mm Z"

# https://stackoverflow.com/questions/31804966/running-nodejs-http-server-forever-with-pm2
$ cd ~/2019-signup/2019-signup/www
$ pm2 start --name Webapp \\
    /home/cicma/.nvm/versions/node/v10.16.0/bin/http-server  -- -p 5000 \\
   --log-date-format="YYYY-MM-DD HH:mm Z"

$ cd 
pm2 start app.js --name "AdminMongo" --log-date-format="YYYY-MM-DD HH:mm Z"
$ pm2 save

23) To remove a process:
$ pm2 stop 3
$ pm2 delete 3
$ pm2 cleardump 

Note:  pm2 Cheat sheet: http://pm2.keymetrics.io/docs/usage/quick-start/

24) Installing SSL - Part1
Get certificates from CTINF: inmetro.crt and inmetro.key
(both are signed by DigiCert, Inc.)

25) SSL - Part 2
Reconfig Nginx:
https://bjornjohansen.no/securing-nginx-ssl
https://bjornjohansen.no/redirect-to-https-with-nginx
https://www.digicert.com/csr-ssl-installation/nginx-openssl.htm

a) In /etc/nginx/sites-enabled/default:

server {

        server_name cibernetica.inmetro.gov.br;
        listen 443 ssl http2;
        ssl_certificate /etc/ssl/inmetro.crt;
        ssl_certificate_key /etc/ssl/private/inmetro.key;

        location / {
                proxy_pass http://127.0.0.1:5000;
        }

        location /api {
                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                proxy_set_header x-real-ip $remote_addr;
                proxy_set_header x-forwarded-for $remote_addr;
                proxy_connect_timeout   1000;
                proxy_send_timeout      1500;
                proxy_read_timeout      2000;
        }

        location /db {
                proxy_pass http://127.0.0.1:1234/db;
        }
}

# Redirect all HTTP traffic to HTTPS
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name cibernetica.inmetro.gov.br;
        return 301 https://$server_name$request_uri;
}

b) restart nginx:
$ sudo service nginx reload

26) SSL - Part 3
Reconfig web app 

- Change src/environments/environment.prod.ts to HTTPS:
export const SERVER_URL =  'https://cibernetica.inmetro.gov.br';

- Rebuild code and restart
$ ionic build --prod
$ pm2 restart Webapp


27) SSL - Part 4
Reconfig rest api

- In SignupRestAPI.js, change to HTTPS the scheme used by 
cibernetica in CORS white list:

var whitelist = ['https://stark-caverns-59860.herokuapp.com',
                 'http://localhost:8100',
                 'https://cibernetica.inmetro.gov.br']

- Restart REST API server:
$ pm2 restart restAPI 

DEVELOP environment
===================

A) Install vagrant:

0) install virtualbox  (homebrew)
1) vagrant install ubuntu/bionic64 (18.04)
2) vagrant up
3) vagrant ssh
4) install nvm, Node.js and ionic on vagrant VM
4.b) install mongodb
5) copy src folder from project
6) exit ssh session
7) vagrant suspend

B) Configure vagrant networking for web access from host:
https://stackoverflow.com/questions/33129651/access-web-server-on-virtualbox-vagrant-machine-from-host-browser

1. Open the vagrant file (should be in the directory where you
specified to create a new vagrant machine).

2. Search for config.vm.network. If you didn't setup the file earlier,
it should be commented out.

3. Change it to look something like this config.vm.network
"private_network", ip: "55.55.55.5". Here ip address (55.55.55.5) can
be any ip address you want.

4. Now logout from the vagrant machine and reload your vagrant machine
using this command: $ vagrant reload.

5. Again ssh into your vagrant machine and restart your server by
this command python manage.py runserver 0.0.0.0:80. Again the port
address (80) can be 8000 if you want so.

6. After that, in your browser, enter the following address
http://55.55.55.5, and hopefully you should see your webapp.


C) Install Node.js with NVM (tutorial guide Digital Ocean):

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04

a) install node.js:

$ nvm ls-remote
...
       v10.15.3   (LTS: Dubnium)
->     v10.16.0   (Latest LTS: Dubnium)
        v11.0.0
...

$ nvm install v10.16.0

$ nvm use  v10.16.0

D) Ionic info:

[emadruga@stark-caverns-59860]$ ionic info
[ERROR] Error loading @ionic/angular-toolkit package.json: Error: Cannot find module 
        '@ionic/angular-toolkit/package'
✔ Gathering environment info - done!

Ionic:

   ionic (Ionic CLI)             : 4.2.1 (/usr/local/lib/node_modules/ionic)
   Ionic Framework               : @ionic/angular 4.0.0-beta.7
   @angular-devkit/build-angular : 0.8.3
   @angular-devkit/schematics    : 0.8.3
   @angular/cli                  : 6.1.5
   @ionic/angular-toolkit        : not installed

Capacitor:

   capacitor (Capacitor CLI) : 1.0.0-beta.8
   @capacitor/core           : 1.0.0-beta.8

System:

   NodeJS : v8.9.3 (/usr/local/bin/node)
   npm    : 5.5.1
   OS     : macOS



Running mongod on localhost:27017:

1) $ cd ~/ionic/morony/mongodb
2) $ mongod --dbpath ./data


Initial mongoldb config:

1) start mongo client
$ mongo
> use admin
> db.createUser(
  {
    user: "mongoadmin",
    pwd: "mongoadmin",
    roles: [ "root" ]
  }
)
> show users
> use hotels
> db.createUser(
  {
    user: "mongoadmin",
    pwd: "mongoadmin",
    roles: [ "dbOwner" ]
  }
)
> exit

2) use mongoimport to read some data into 'hotels' database, 'rooms' collection:

$ mongoimport -h localhost:27017 -d hotels -c rooms -u mongoadmin -p mongoadmin --file bkup.json
2019-07-24T19:58:12.860-0300	connected to: localhost:27017
2019-07-24T19:58:13.009-0300	imported 28 documents

3) start REST API server

3.a) Modify MONGODB_URI environment variable

[emadruga@mongodb]$ env | grep MONGO
MONGODB_URI=mongodb://mongoadmin:mongoadmin@localhost:27017/hotels

3.b) define SECRET_KEY for encrypting captcha messages

[emadruga@shielded-temple-91138]$ export SECRET_KEY='<secret-key-here>'

3.c) start REST API

[emadruga@shielded-temple-91138]$ node SignupRestAPI.js 
Database connection: mongodb://mongoadmin:mongoadmin@localhost:27017/hotels
App listening on port 8080
Existing candidates: 28

4) start web application


4.a) move to proper folder

[emadruga@ionic]$ pwd
/Users/emadruga/ionic
[emadruga@ionic]$ cd heroku
total 112
drwxr-xr-x   9 emadruga  staff   288B Nov  5  2018 shielded-temple-91138/
drwxr-xr-x  19 emadruga  staff   608B Nov  5  2018 stark-caverns-59860/

[emadruga@heroku]$ cd stark-caverns-59860/

4.b) define SECRET_KEY in environment.ts

4.c) start the server:
[emadruga@stark-caverns-59860]$ ionic serve
> ng run app:serve --host=0.0.0.0 --port=8100

[INFO] Development server running!
       
       Local: http://localhost:8100
       External: http://192.168.1.101:8100
       DevApp: signup@8100 on Sierra-Nevada.local
       
       Use Ctrl+C to quit this process

[INFO] Browser window opened to http://localhost:8100!

[ng] ℹ ｢wdm｣: wait until bundle finished: /
...



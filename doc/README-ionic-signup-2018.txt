
TODO:
- captcha buttons on home screen
- No updates: /api/rooms/update: add localhost to CORS list on signup.js
	- whitelist: edit https://localhost:8100 to http://
- use ssl certificate for https: add cert to nginx


PROD environment
================

1) On ionic/angular web app side:

In main.ts:
// disable console log
console.log = function(){};

1.5) Install pm2:

$ npm install pm2@latest -g

2) Start processes with pm2:
$ pm2 start SignupRestAPI.js --name "Rest API" --log-date-format="YYYY-MM-DD HH:mm Z"
$ pm2 start server.js --name "Website" --log-date-format="YYYY-MM-DD HH:mm Z"
$ pm2 save

3) To remove a process:
$ pm2 stop 3
$ pm2 delete 3
$ pm2 cleardump 

3) pm2 Cheat sheet: http://pm2.keymetrics.io/docs/usage/quick-start/


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



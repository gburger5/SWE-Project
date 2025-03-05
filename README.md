# SWE-Project

## Node.Js Setup instructions:

Node.js is required to initialize the project, it can be installed at: https://nodejs.org/en.

To set up the config file, navigate to ./config/. Make a copy of the file ".env.example", and rename it to ".env".

You can manually install dependencies by running the command npm run setup within the project directory in a terminal. Or, use the steps in the running and testing section to configure vscode to do this for you.

##  Postgres Setup Instructions

If you are using a database hosted online, fill out the .env with the information necessary to connect. If set up correctly, it will connect successfully.

To host a database locally, first download the postgreSQL server at https://www.postgresql.org/. Once you have done that, launch the pgAdmin gui to perform a couple setup steps.
The first thing you need to do is create a database. Navigate to the top left, and open up the Server tab and the PostgreSQL tab.

![image](https://github.com/user-attachments/assets/b71df0c2-a086-4e1c-bff9-f6bd5911c545)

It should look like this. Right click the Databases(1) tab, and create a new database. Name it whatever you like.

![image](https://github.com/user-attachments/assets/87314651-8b1a-4543-b858-29dcfe348a10)

Next, we will need to create a user profile. Navigate to the Login/Group Roles section below Databases.

![image](https://github.com/user-attachments/assets/9156fa49-c766-426c-be97-00eeec1581da)

![image](https://github.com/user-attachments/assets/e4e769d7-4860-42ac-b71b-836b017309e8)


Right click the tab, and create a new login/group role. The name you set will be the username. Go into the definition tab, and set the password. Then go to the privileges tab, and set necessary privileges. Make sure the user can login.

Finally, we will set up the .env. The name of the database you created is what you will set PGDatabase to in the .env. Set PGPort to whatever you chose during installation. PGHost can stay localhost if you are hosting locally.  Set PGUser and PGPassword according to the user profile you created.

## Running and testing:

If you are doing this in a terminal, run the command npm run compile to compile all typescript files into javascript. Run the command npm run server to start the webserver. 

If you are doing this in vscode:

Once you have downloaded the repository, in the top right of the explorer menu click this button, and then ensure that NPM Scripts has a check next to it.

![Step1](https://github.com/user-attachments/assets/ab932a66-394f-4b82-abef-33768771c5d6)

![Step2](https://github.com/user-attachments/assets/3c35fdce-fe97-4536-ad55-9d4ce96f463b)

Then, navigate to the bottom of the explorer:

![image](https://github.com/user-attachments/assets/2265d680-492f-4e0c-8b53-3f7d1ca92d70)


You can run the NPM scripts from here. They do the following things:
- **clean-install:** Performs a clean install of dependencies.
- **setup:** Performs a regular install of dependencies (Must be used if package.json & package-lock.json aren't synced)
- **linux-build:** Same as win-build but for linux
- **win-build:** Creates a dist folder which contains a copy of the project's architecture. Compiles all typescript files, and copies over /views,  the .env and any plain javascript files.
- **start:** Starts the webserver.
- **win-build & start:** self explanatory
- **linux-build & start:** self explanatory
- **test:** Nothing yet

Sources:

- Compiler explorer: https://godbolt.org/
- Ace editor: https://ace.c9.io/
- TypeORM: https://typeorm.io/

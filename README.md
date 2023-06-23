# GaRex-Sneakorum
Repository for Garex Sneakorum. Done by Gareth Yeo and Rex Yong as part of NUS orbitla project. 

## Description 
Garex Sneakorum is built using DJango and React. So far, the web application allows users to log in, access the sneaker forum page to add and view threads. 

## Table of contents
* [Functions and features](#functions-and-features)
* [Technologies](#technologies)
* [Structure of files](#structure-of-files)
* [Setup instructions](#Setup-instructions)


## Functions and features
As of Milestone 2, the available features are 
* Authentication function. Users can log in and log out of the web page
* Basic forum functions. Users can add new threads, as well as access other threads available on web page. 

## Technologies
Project is created with:
* React.js
* Python Django
* Html 5 / CSS
* React Material UI
* HTML, CSS, React Bootstrap
* POSTGRES SQL
* Django REST Framework

## Structure of files
The image below shows the files structrure of the project. **Note that the frontend has both React and HTML. The authentication pages are in HTML and CSS, whereas the Forum was done in React.js**
![File structure](https://drive.google.com/file/d/11cxreGgRTKJca-LcoCN0mvNoJH-OXmVJ/view?usp=sharing)

`GFG` is the Django Project Folder of the web page.
-   `./settings.py` relevant settings and configurations for web page
-   `./.env` contains the DATABASE_URL for deployment to Render. **This folder is hidden by .gitignore, note that you will have to create a .env file and initialise the DATABASE_URL variable to the external database link if you wish to deploy on render as well.**
-   `./urls.py` routes of the forum app API to provide endpoints for the client
-   `./views.py` consists of different functions based on urls.py

`authentication` is the DJango APP in charge of all authentication related things in the web page. 
-   `./urls.py` routes of the authentication app.
-   `./views.py` consists of different functions to enable authentication of user. The html pages are retrived from `templates/auythentication` folder shown in diagram. 
-   `./models.py` declares the tables and fields for our authentication databse


`forum_api` is the DJango APP in charge of the api related functions between frontend and backend. 
-   `./models.py` defined database models for forum. 
-   `./serializers.py` different classes to serialize database models
-   `./signals.py` automatically generate profile for each user creation
-   `./tests.py` empty file
-   `./urls.py` routes of the forum app API to provide endpoints for the client
-   `./views.py` consists of different functions to build the API


Under `forum-react-app` , contains the react folders `build`, `public` and `src` 
-   `./build` a build directory with a production build of the forum app when command `npm run build` is run in terminal. 
-   `./public` contain favicon and index.html etc.
-   `./src` stores contains all the source code of the React app, and it stores React `pages` and `components`.
    -   `./components` contain different components of forum app such as GarexNavBar, GarexSneakorumLogo, ListThreads, NewThreadForm, ReplyThreadForm. 
    -   `./pages` stores the pages of GarexSneakorum such as ForumHome and Thread. 

## Setup instructions
* Clone and download the repository from github
* Ensure that you have downloaded the necessary technologies listed above. 

Navigate to ...\GaRex-Sneakorum directory and create virtual environment. Then run the virtua environment on the terminal. Afterwards, install the requirements.txt file.
```
virtualenv venv

myenv\Scripts\activate

pip install -r requirements.txt
```

Navigate to ...\GaRex-Sneakorum\forum-react-app directory and build react.
```
npm run build
```

Once the build folder has been created, copy this build folder and replace the build folder under ...\GaRex-Sneakorum\newstatic 
This is because the django app will look for the static files under newstatic folder, so make sure you replace this build folder. 

Navigate to ...\GaRex-Sneakorum directory and run python server
```
python manage.py runserver

The application will be available on http://127.0.0.1:8000/
```




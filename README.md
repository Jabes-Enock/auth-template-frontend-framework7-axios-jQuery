 # Auth Template - Auth made easy

 <img src="github/cover.png"></br>

 ![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=DEVELOPING&color=GREEN&style=for-the-badge)

 ## :bookmark_tabs:Summary

- [Introduction](#Introduction)

- [Features and some gif's ](#features-and-demo)
    - [Register ](#register)
    - [Login ](#login)
    - [Profile ](#profile)
    - [Logout ](#logout)
- [Technologies](#Technologies)
- [Installation](#Installation)
- [My opinion about this project](#opinion)
- [Related Projects](#updates)
- [To do](#to-do)

<div id="Introduction">
</br>

## :page_facing_up:Introduction
This project is an  front end template for authentication which is integrated to an [API built in codeIgniter 4](https://github.com/Jabes-Enock/auth-template-api-codeIgniter)  to allow user to perform the basic actions of an authentication system.


For HTTP request we are using [AXIOS](https://axios-http.com/ptbr/docs/intro) and there is a file where you can define the ````baseURL````.

````
//www/js/config.js
const axiosInstance = axios.create({
  baseURL: 'http://your-url/api',
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
})
````

</div>

<div id="features-and-demo">

## :checkered_flag: Features
Here you will see the main resources used in this project, as well as some Gif's.

### Register

<center>
<img src="github/register.gif" style="height: 380px; margin: auto;">
</center>

<h4>Information</h4>

| Property  |  Description
|--- |--- 
| Endpoint | /auth/register
| Method | POST
| JSON body | username  \| email \| password

<br>

<h4>Valid data</h4>

This rules is set in the backend.

| Property  |  rules
|--- |--- 
| username | required \| unique
| email | required \| valid_email \| unique
| password | required  \| min_length[5] \| max_length[15]

<p>Code example:</p>

````
//www/js/auth/register.js
const response = await axiosInstance.post('/auth/register', {
  username: data.username,
  email: data.email,
  password: data.password,
})
````

<br>
<p>Successfully response:</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=201|created&color=GREEN&style=for-the-badge)

<br>
<p>Some  example errors messages:</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=200&color=GREEN&style=for-the-badge)
``In this case I have tried to register the user above again.``


````
{
  "username": "The username field must contain a unique value.",
  "email": "The email field must contain a unique value."
}
````

<br><br>

### Login

<center>
<img src="github/login.gif" style="height: 380px; margin: auto;">
</center>

<h4>Information</h4>

| Property  |  Description
|--- |--- 
| Endpoint | /auth/login
| Method | POST
| JSON body | email \| password

<br>

<h4>Valid data</h4>

This rules is set in the backend.

| Property  |  rules
|--- |--- 
| email | required \| valid_email 
| password | required 

<p>Code example:</p>

````
//www/js/auth/login.js
const response = await axiosInstance.post('/auth/login', {
  email: data.email,
  password: data.password,
})
````

<br>
<p>Successfully response.</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=201|created&color=GREEN&style=for-the-badge)

```You will received a token.```

````
{
  "token": "585636b94277b58dd5b8912e4816c0dd23be735d0726759f86a684f60dfd74b2"
}
````

<br>
<p>Some  example errors messages:</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=200&color=GREEN&style=for-the-badge)
``Sending invalid credentials.``


````
{
  "message": "user not found"
}
````
<br/><br/>

### Profile

<center>
<img src="github/profile.gif" style="height: 380px; margin: auto;">
</center>

| Property  |  Description
|--- |--- 
| Endpoint | /auth/profile
| Method | GET
| Header | Authorization 

<br>

<h4>Valid header</h4>

<p>Code example:</p>

````
//www/js/auth/profile.js
const response = await axiosInstance.get('/auth/profile', {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
})
````

<br>
<p>Successfully response.</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=201|created&color=GREEN&style=for-the-badge)

```You will received the user data.```

````
{
    "id": 13,
    "username": "jabes",
    "email": "jabes@example.com"
}
````

<br>
<p>Some  example errors messages:</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=401&color=GREEN&style=for-the-badge)

``Sending an invalid token.``

````
{
  "status": 401,
  "error": 401,
  "messages": {
    "error": "Unauthorized"
  }
}
````
<br/><br/>

### Logout

<center>
<img src="github/logout.gif" style="height: 380px; margin: auto;">
</center>

| Property  |  Description
|--- |--- 
| Endpoint | /auth/logout
| Method | GET
| Header | Authorization 

<br>

<h4>Valid header</h4>

<p>Code example:</p>

````
//www/js/auth/profile.js
const response = await axiosInstance.get('/auth/logout', {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
})
````

<br>
<p>Successfully response.</p>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=201|created&color=GREEN&style=for-the-badge)


<br>
<p>Some  example errors messages:</p>

``Sending an invalid token.``

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=401&color=GREEN&style=for-the-badge)

````
{
  "status": 401,
  "error": 401,
  "messages": {
    "error": "Unauthorized"
  }
}
````
<br/><br/>

</div>

<div id="Technologies">

## :bar_chart: Technologies

##### :one: Framework7
[Framework7](https://framework7.io/docs/) - "is a free and open source framework to develop mobile, desktop or web apps with native look and feel. It is also an indispensable prototyping tool to show working app prototype as soon as possible in case you need to."
</br>

##### :two:  Axios
[Axios](https://axios-http.com/) - "Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface."
</br>

##### :three:  jQuery
[jQuery](https://jquery.com/) - "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation..."

</br>

</div>


<div id="Installation">

## :computer: Installation

#### Step 1 - Download this project
  ##### Option :one: - Download Zip 
  ##### Option :two: - Cloning a repository - [how to do this](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). 

</div>

</br>
<div id="opinion">

## :trophy: Testimony :trophy:
This project helped me understand how an authentication system is handle in the frontend and how I should send data to the API which have protect routes.

I created this project to use as a standard for applications developed in Cordova, but feel free to adapt this project to create web applications developed in React, Vue or other technologies. Use creativity.
</div>
</br>


<div id="updates">

## :newspaper: See other related projects  :newspaper:

In the [Introduction section](#Introduction)  I wrote ```All datas and images used here are static``` so I thought to myself: 
      
    What If the datas were dynamic
That is why I decided to develop an API that enables the datas to be dynamic.

You can see the [API here](https://github.com/Jabes-Enock/API-store-world-cup-2022-adonisjs), below there is a preview of how the API works.

<img src="github/auth_template_backend.png">

</div>

</br></br>

<div id="to-do">

## :white_check_mark: To do 
- :black_square_button: update user info like:
    - username 
    - email 
    - password

- :black_square_button: delete user
</div>
</br>

Made with :heart: by Jabes Enock
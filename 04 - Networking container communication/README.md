## 001 Intro

how to connect multiple containes !!

## 002 case 1 container to www communication

![alt text](image.png)

Now let's start by understanding what I mean when I say network and requests. And for this, let's assume that we have a container with our application inside of it, could be a Node application, could be a Python application, or a PHP application, it does not matter, and now let's say that this application, as part of its application logic, actually wants to talk to an API, so to some website out there in the World Wide Web. For example, to send data there or to fetch data from there, and just to make this clear here with this API website, I'm talking about a site not owned by us. So this is not another container or anything like that, it's just a website, a web API, to which your application might want to talk. It might want to send a GET HTTP request to this API, for example.

So this scenario here would be about sending a request, in this case, an HTTP request, from your container, so from the application running in a container to the World Wide Web. And I actually do have an example for this. Attached, you'll find another simple starting project. It's another Node.js application, but again, it's just an example. I tend to use Node.js a lot because I work with it a lot, but you could have any kind of application, but in this application, I'm doing something special. In there in this app.js file, which holds my application code, I am using Axios, which is a third-party package, which has also mentioned in package.json as a dependency. I'm using Axios to send a GET request to this Star Wars API here. And this is not an API created or owned by me. It's not a Docker container. It's a website in the end, a web API, which you can also visit.

For example, swapi.dev/api/films will yield some data, some information about the Star Wars movies. So this is simply a dummy API, you could say, which we can use to play around with it in dummy demo applications, and that is the kind of application we have here. This application here will actually create another API, which then will live in a container later, but under the hood, this API, which I'm building here, will reach out to another API, this Star Wars API, to fetch movie and character data from there.

Now, I'll dig deeper into this example application in just a second, because we are going to work with it throughout this module, but I just want to highlight already that this is a Node application that sends an HTTP request to some other site, to some other website in this case, and therefore will definitely have HTTP communication between this app and this Star Wars API website. And that of course implies that if we put this Node app into a container, which we're going to do in this module, we need to ensure that this request can still be sent and that it can go from inside our container to outside the container. So that is one possible way of communicating in a dockerized app, sending an HTTP request to some other website or web API, which is out there.

## 003 case 2 container to local host machine communication

## 004 case 3 container to container communication

## 005 analyzing the demo app

## 006 creating a container and communicaiton to web

## 007 making container to host communication

## 008 container to container communication

## 009 Introduce docker networks elegant container to container communicaiton

## 010 How Docker resolved Ip address

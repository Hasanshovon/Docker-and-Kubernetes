## Module Introduction

1. Working with Images & containers
2. Pre-Built & Custom Images
3. Creating & Managing Images

## containers

we don't just have containers, we also have images, when working with Docker. Now, what is the difference, and why do we need both? We already heard about `Containers` in the first course module. You learned that containers in the end are small packages, you could say, that contain both your application, your website, your Node server, whatever it is, and also, and that's important, the entire environment to run that application. So a container is there's a running unit of software. It is the thing which you run in the end. But when working with Docker, we also need dissolver concept called Images, because images will be the templates, the blueprints for containers, it's actually the image, which will contain the code and the required tools to execute the code. And it's the container that then runs and executes the code. And we have this split, this separation here, so that we can create an image with all these setup instructions and all our code once, but then we can use this image to create multiple containers based on that image. So that, for example, if we talk about a Node.js web server application, we can define it once, but run it multiple times on different machines, and different servers. And the image is that sharable package with all the setup instructions and all the code. And the container will be the concrete running instance off such an image. So we run containers, which are based on images. That is the core fundamental concept, Docker is all about in the end. Images and containers, where images are the blueprints, the templates which contained the code and the application, and containers, are then the running application. And this will become clearer throughout this module, once we start working with images and containers, and actually let's start working with that, right now. Let's see how we can work with images, and containers when using Docker.
![alt text](image.png)
![alt text](image-1.png)

## Using & Running External (Pre-Built) Images

there will be two ways of creating or getting an image so that we then can run a container. The first way is that we use an already existing image. For example, because a colleague of ours already built it, or also very common, because we use one of the official pre-built images or one of the images shared by the community. And a great source for that would be Docker Hub, which you can simply Google to find `hub.docker.com`. And there you can log in but you don't need to do this right now. Instead, here in the search bar, we can, for example, search for `node`. And what we'll find is the official node Docker image, which we could use to build a node application container, a container which will later run a node application. Now this node image which you find on Docker Hub, can be used by anyone and it is distributed and created and maintained by the official node team. Now we will use such official images a lot throughout this course and in general when working with Docker, but we can especially use it right away to get started with images and containers here. And all we need to do for that is open up the command prompt or terminal on your system and then navigate in any folder of your choice and run

```shell
docker run node
```

![alt text](image-2.png)
This command here will use this node image which we find on Docker Hub and it will utilize it to create a so called container based on this image, because as I mentioned, containers are really just the running instances of images. Images contain the setup code the environment, in this case, the node image contains the node installation. And then we can run the image to run the application or in this case, to simply run the node interactive shell. Now if you hit Enter, this will give you an error that it doesn't find this image locally, which makes sense because it's on Docker Hub, and then it'll automatically pull it from Docker Hub. So now this downloads the latest node image from Docker Hub and once it downloaded it locally onto our machine, it will run this image as a container. So let's wait for this download to finish here and thereafter, you will see nothing special here. It's done and we can enter more commands. So did we now run the container? Did we now create a container based on an image? Well, yes, we did. But this container isn't really doing much. Node is of course just a software you could say and indeed we can execute node to get an interactive shell where we can insert command. But by default, and that's important, a container is isolated from the surrounding environment and just because there might be some interactive shell running inside of a container does not mean that this shell is exposed to us as a user. Nonetheless, this container was created. And you can tell by running Docker PS dash A.

```shell
docker ps -a
```

![ ](image-3.png)
PS stands for processes and with the dash A flag, this will show you all the processes all the containers Docker created for us. And if you hit enter, you will see that a minute ago I actually created a container. And to make this a bit easier to read I'll zoom out a bit and rerun this. And you'll see we created a container with this ID. The image was the node image. It was created two minutes ago, it exited so it's not running anymore and it also received a automatically generated name. We'll dive into names and into configuring containers in general in greater detail later. But what we see is that something happened but that it's not running anymore because as I said a container runs in isolation. And even though we executed node as a image or as a container based on the node image, this alone doesn't do much. Because the interactive shell exposed by node is not automatically exposed by the container to us. That is something we can change though.

```shell
docker run -it node
```

![alt text](image-4.png)

If we repeat the command from before, docker run node, and we now add an extra flag in front of node, the dash IT flag, then we will actually tell Docker that we wanna expose an interactive session from inside the container to our hosting machine. And hence if we now hit enter, we actually are in that interactive node terminal where we can run basic node commands. For example, one plus one, but we could also use node API's in here. But that's of course not the focus of this session. Now the important thing about this here is that node here is now running inside of that created container and it's just exposed to us by adding this extra flag so we can interact with that container and with node running in the container. Node is not running on our machine here and I can prove this. Please note that here we're interacting with node 14.9, which is the version that at the moment I was recording this was pulled into this image, and therefore is being used in this container. Now if I quit this process with Control + C pressed twice now the container will shut down, when I quit this and I run node dash V here like this on my system so not inside of the container, I see 14.7 as a version.
![alt text](image-5.png)

So locally on my system I got a different version installed, then the version we interacted with here, which proves that the version we did interact with must be the version from inside the container. And we don't need node to be installed on our system at all in order to be able to run this node container and interact with it. And that is really how you work with containers. At least these are some first steps of working with containers, and this also shows us what images and containers are. Images are used behind the scenes to hold all the logic and all the code a container needs, and then we create instances of an image with the Run command. This creates then the concrete containers which are based on an image. And if we now run Docker PS dash A again, we see that we get two containers now. Both are not running anymore, they have been exited. But we have more than one container based on the same image. Both containers are based on the same image.
![alt text](image-6.png)
And yes, they are not running anymore but we could absolutely have two containers which are based on the same image up and running at the same point of time, simply by opening up multiple terminals and then while repeating this docker run command. This would absolutely be possible. And that's the idea behind images and containers. Images contain the code, the setup, the meet, you could say and containers are then the running instances of those images.

## 004 Our Goal A NodeJS App

The transcript begins by explaining that in most use cases, you don't just want to download and run an image that gives you an interactive shell like the Node image does. While this is useful to get started and to have an initial experience with containers and images, it's not all you want to do. Typically, you build upon those base images to create your own images. For example, you could build on the Node image to execute certain Node.js code with that image. This example is used throughout the course, but the same concept applies to other languages like PHP, GO, or Python, depending on the application you are building.

![alt text](image-7.png)

Usually, you pull an official base image and then add your code to it to execute your application within a container. This scenario requires you to build your own image because your specific application with your code will not exist on Docker Hub unless you upload it there. Therefore, the next step is to build an image based on the Node image.

To demonstrate this, a simple Node.js dummy project is provided, which can be downloaded. This project contains four files, including a `server.js` file that has the main Node application code. The `server.js` starts a web server with Node.js, listens on port 80, and handles incoming requests to different URLs. It processes GET requests to serve HTML and POST requests to store and display a goal value. The code retrieves a goal from the request body, logs it, sets a variable, and redirects to the main route to display the updated goal.

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let userGoal = "Learn Docker!";

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>My Course Goal</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal">
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `);
});

app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  res.redirect("/");
});

app.listen(80);
```

The project also includes a `public` folder containing a CSS file for styling, which is automatically loaded by the Node server when requested. Another key file is `package.json`, which describes the Node application and its dependencies, such as the Express framework and the body-parser package. These dependencies are necessary to run the Node application.

If you wanted to run the project locally without Docker, you would need to install Node.js, navigate to the project folder, and run `npm install` to download all required dependencies. After that, you could run the `server.js` file with the `node` command, which would start the server, allowing you to access the application on localhost at port 80 and interact with it.

However, since the course focuses on Docker, the next step is to quit the local server with `Ctrl + C`, clear the console, and delete the `node_modules` folder and `package-lock.json` file created after running `npm install`. This cleans up the local setup, and the project is returned to its initial state with only the core files.

```sh
npm install

// npm audit fix --force

node server.js

```

![alt text](image-8.png)

Finally, the goal is to use Docker to build an image containing this Node.js application. This image will also use the Node Docker Hub base image to run the application code. The `.gitignore` file included in the project is optional and is only important if using Git for version control. The overall goal is to dockerize this example Node.js application and run it in a Docker container.

- ctl + C and delete node_modules folder and package-lock.json file

## 005 Building our own Image with a Dockerfile

The transcript begins by explaining how to build a custom Docker image. You first need to go to the folder containing your code and create a new file named `Dockerfile`. This is a special name recognized by Docker. To get better support for writing Docker files, it's recommended to use Visual Studio Code and install the Docker extension, which will assist with writing Docker instructions. It's not a must-have, but it makes things easier.
![alt text](image-9.png)

Next, the content discusses what to put into the Dockerfile. The file will contain the setup instructions for Docker to execute when building the image. Typically, you start with the `FROM` instruction in all caps. This allows you to build your image upon another base image. You could theoretically build an image from scratch, but usually, you want to start with an operating system or tool that your code needs. For this example, the image is built upon the Node image using `FROM node`.

Docker will pull the Node image either from the local system or from Docker Hub if it doesn't already exist locally. In this case, since the Node image was already used before, it exists on both Docker Hub and locally. This step tells Docker to start by pulling in the Node image and then continue with additional instructions.

The next step involves copying the files from the local machine into the image. This is done using the `COPY` command, with a simple instruction like `COPY . .`. The first `.` refers to the folder that contains the Dockerfile, and the second `.` represents the path inside the image where the files will be stored. Every image and container created from it has an internal filesystem, separate from your machine. It's recommended to use a subfolder instead of the root folder in the container, so here the path `/app` is used.

![alt text](image-10.png)

After copying the files, the `WORKDIR` instruction is set to `/app`, meaning all subsequent commands will be executed from this directory. This makes sure that `npm install`, which needs to be run next, is executed in the correct folder.

The `RUN` instruction is then used to execute `npm install` in the container to install the dependencies of the Node application. This is similar to running `npm install` outside of Docker to set up the project.

The difference between `RUN` and `CMD` instructions is also explained. The `RUN` command is executed during the image creation, while the `CMD` command is executed when a container is started based on the image. The `CMD` instruction is used to run the server when the container is launched: `CMD ["node", "server.js"]`.

The next important step is the `EXPOSE` instruction. Since the Node server listens on port 80, and Docker containers are isolated with their internal networks, `EXPOSE 80` is added to make this port accessible to the host machine when the container is run.

![alt text](image-11.png)

The Dockerfile now contains all the setup instructions for a Docker image. The content concludes by stating that the next steps are to see how to utilize this custom image, build it, and run it.

## 006 Run Container

![alt text](image-12.png)

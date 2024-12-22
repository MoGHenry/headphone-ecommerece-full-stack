## Introduction
This repository contains a feature-rich e-commerce application built using React.js, Express.js, MongoDB, and Docker, with deployment on AWS EC2. It was developed as an individual project to gain hands-on experience in full-stack development, secure authentication, and containerized deployment.

Key Features:
- Frontend:

  -Built with React.js for a dynamic and responsive user interface.
  -Includes key components like a product list, product details, shopping cart, and wishlist.
  -Integration with RESTful APIs for seamless interaction with the backend.
- Backend:

  -Developed using Express.js to handle API requests and manage application logic.
  -MongoDB Atlas for persistent data storage of products, cart, wishlist, and user information.

-Authentication:

  -Implemented JWT (JSON Web Tokens) for secure user login and session management.
  -Includes user registration, profile management, and access control for cart and wishlist functionalities.

- Deployment:

  -Deployed on an AWS EC2 instance using PM2 for process management.
  -Dockerized application with container orchestration via Docker Compose, including Caddy as a reverse proxy for HTTPS support.
- Additional Features:
  -User-specific cart and wishlist functionality.
  -Authentication-based access control for secure operations.
  -Persistent state management with localStorage for cart and wishlist.
This project demonstrates skills in full-stack development, integrating multiple technologies, and deploying robust web applications. Perfect for showcasing individual expertise in real-world application development.



## Table of Contents
- [IP Address and Deployed Application](#ip-address-and-deployed-application)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application in localhost](#running-the-application)
- [Dockerize the Application](#docker-setup)

## IP Address and Deployed Application
~~The application is deployed on an AWS EC2 instance with docker. You can access the live application using the following IP address:~~

~~**Web Address of Deployed Application**: `http://54.88.103.131`~~
~~[Click here to access the deployed application](http://54.88.103.131)~~

~~**EC2 Instance Public IP**: `54.88.103.131`~~

## Prerequisites

Make sure you have the following installed on your machine before starting:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

To verify if Node.js and npm are installed, run the following commands in your terminal:
```bash
node -v
npm -v
```

## Installation

### Step 1 Clone the project
First, clone the repository to your local machine using the following command:
```
git clone https://github.com/ICSI518/assignment2-MoGHenry.git
```

### Step 2: Install Dependencies
Navigate to the project directory and install the dependencies:
```
cd assignment2-MoGHenry
npm install
```

## running-the-application
### Step 3: Start the Development Server
To start the application, run the following command:
```
npm start
```

This will start the development server, and you can access the application at:

`http://localhost:3000`

## Docker-setup
### Step 1: Clone the project
You will need to setup the git in your virtual machine
Then clone the project using the following command:
```
git clone https://github.com/ICSI518/assignment2-MoGHenry.git
```

### Step 2: Create .env
cd to the project directory
In `a3` folder, create `.env` file and add your JWT Token 
```
cd assignment2-MoGHenry
touch a3/.env
nano a3/.env
```

```
JWT={Your_JWT_Token}
```

### Step 3: Install Docker
#### Add Docker’s GPG Key:
```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
#### Set Up the Docker Repository:
```
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
#### Install Docker:
```
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```
#### Start and Enable Docker:
```
sudo systemctl start docker
sudo systemctl enable docker
```
#### Verify Docker Installation:
```
docker --version
```

### Step4: Install Docker Compose
#### Download the Latest Docker Compose Binary:
```
sudo curl -L "https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
#### Apply Executable Permissions:
```
sudo chmod +x /usr/local/bin/docker-compose
```
#### Verify Docker Compose Installation:
```
docker-compose --version
```

### Step 4: Run the Application
#### Build Image:
```
docker-compose -f docker-compose-prod.yml build
```
#### Start Container and run in the background:
```
docker-compose -f docker-compose-prod.yml up -d
```
#### Start Container and run in the foreground:
```
docker-compose -f docker-compose-prod.yml up
```

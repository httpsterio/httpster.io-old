---
title: Fastest MEAN stack install on Ubuntu
date: "2015-06-07"
description: "I'll show you how to set up a MEAN stack in just a few minutes."
writingtime: 3 hours
tags:
  - sysadmin
  - linux
  - opinion
---

## Fastest MEAN Stack Install on Ubuntu

If you're looking for a server stack that's more JavaScript-friendly than your everyday LAMP stack, MEAN (MongoDB, Express.js, AngularJS, and Node.js) is a great option to consider. This stack is mostly written in JS and integrates nicely with modern JavaScript tools like Grunt, making it a natural choice for web developers who want to bring the backend closer to the frontend.

The best part? Installing MEAN is surprisingly easy, even for command line noobs like me. Here's how to set it up in just a few minutes.

### Step 1: Create your project directory and download Node.js.

First, you'll need to create a directory for your project. You can do this by running the following command:

```bash
mkdir myproject && cd myproject
```

Next, you need to download Node.js and npm. You can do this by running the following command:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

Nodesource's Node is more up to speed than the default package from `apt-get`.

Node.js is used to run JavaScript on the serverside, while npm is the package manager for Node.js applications, scripts, and tools. To install the necessary dependencies locally to the project, you can create a `package.json` file by running the following command:

```bash
npm init -y
```

This will create a `package.json` file in the project directory with some default values. You can then install the required packages by running the following command:

### Step 2: Install MongoDB

Next, you'll need to install MongoDB, which is the database for your project. You can do this by running the following command:

```bash
apt-get install mongodb
```

MongoDB is a NoSQL database, which means it handles certain tasks better than other databases, like MySQL. Depending on the project, you might want to swap this out for some other DB system. One nice feature of MongoDB is that the database files are formatted pretty much like JSON, which can be handy.

### Step 3: Install Yeoman

You'll need Yeoman to generate your project. Yeoman is a scaffolding tool that helps you get started with new projects by generating boilerplate code, installing dependencies, and more. You can download Yeoman through npm by running the following command:

```bash
npm install -g yo
```

The "-g" flag is for a global install of the tool. Once you've installed Yeoman, you can install the MEAN.JS generator by running the following command:

```bash
npm install -g generator-meanjs
```

### Step 4: Generate Your Project

Now that you have all the necessary tools installed, you can generate your MEAN.JS project by running the following command:

```bash
yo meanjs
```

The Yeoman generator will ask you a few questions about your app. Fill in the info (or just hit enter), and once the installer is done, run the following command to start your MEAN server:

```bash
grunt
```

And that's it! Your brand new MEAN server should now be visible on either `http://localhost:3000` or `http://YOUR-IP:3000`. Enjoy!
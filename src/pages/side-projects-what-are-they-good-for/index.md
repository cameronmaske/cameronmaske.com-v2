---
title: Side Projects. What Are They Good For?
date: 2013-10-10
published: true
tags: PROGRAMMING
--- 
Side projects are a great way to work on that 'pet problem' or 'idea' thats been gnawing a way in your head the last week. But aside from scratching that itch, I believe they are a vital tool in making you a better developer. I thought I'd retrospectively look over my various oddities of side project from the last year to see what I've learn from them.

# [Puppy Eyes](http://puppy-eyes.herokuapp.com/)
## What is it?
A simple flask web app that resizes and caches images as thumbnails. [It's on GitHub!](https://github.com/cameronmaske/puppy-eyes/)

## What did I learn?
I used the [Flask framework](http://flask.pocoo.org/) for the first time to build the backend. Coming from using almost exclusively Django before, I loved the simplistic, lightweight and lean mindset Flask has. Prototyping with Flask is rapid. The web server was [~100 lines of Python](https://github.com/cameronmaske/puppy-eyes/blob/master/main.py) in total.

This side project was an the eye opening experience to just how powerful Redis can be (a tech that is now a huge part of my current role). All the thumbnail were temporarily cached in Redis. I had setup Redis before to work with third party libraries (Celery) but hadn't used it as a datastore before. It's speed was blazing. Going from a File to string to Redis and back again was painless with Python.

I also used Vagrant + Puppet to boot up a separate Linux VM as development environment. Allowing me to have a full stack virtual environment, one that I could alter/destroy/reload without consequence or worrying.

# [FindYouFlowers](fhttp://findyouflowers.herokuapp.com/)
## What is it?
An app that let's you quickly search for that prefect bouquet for their special someone.
Stack wise, it a a flask app with MongoDB on the backend and AngularJS on the client. [It's on GitHub!](https://github.com/cameronmaske/find-you-flowers)

## What did I learn
I tried out MongoDB and got a great introduce to it's basics. I learnt about [Full Text Search with MongoDB](http://docs.mongodb.org/manual/core/text-search/), different ways of integrating it with [Python](http://api.mongodb.org/python/current/) and gained a better appreciate of NoSQL vs Relational.
I got better at scraping websites and tried out some different tactics, such as targeting sitemaps.
I experimented with a naive (but effective) weighted searching on the client with AngularJS. I learnt about AngularJS rule of thumb of [2,000 binding per page](http://stackoverflow.com/questions/9682092/databinding-in-angularjs) and got a better feel on the performance limitations of AngularJS.

# SpellBeta
## What is it?
A chrome extension that monitors which words you most commonly misspell. Built on an 8 hour airport layover.

## What did I learn?
I explored the world of Chorme extensions. What they can do (local storage) and what limitations they have (for example events on right click menus). I dived into  various character 'diff' algorithms (e.g. If I a word get's moved in a sentence, how can I work out which word was removed?) and how they work.

# [GeoDC](https://github.com/cameronmaske/geo-dc)
## What is it?
Geospatial data about Washington D.C. [It's on GitHub!](https://github.com/cameronmaske/geo-dc/blob/master/datasets/crime/crime.geojson)

## What did I learn?
I got an introduced to the world of Geospatial data. From creating and storing it in valid [geoJSON](https://github.com/cameronmaske/geo-dc/blob/master/datasets/crime/crime.geojson) to manipulating it, spatially joining it with other data and displaying it with [CartoDB](http://cdb.io/1hxnGai).

I also experimented with using PhantomJS + Selenium as a headless browser scraping tool. It's trade offs of  allowing full browser capacity (javascript enabled) but having hefty speed cost when compared to just a single request.

I also explored using [SaltStack](http://saltstack.com) as a provision with Vagrant. How to setup Salt States to install PhantomJS, a Python virtualenv and Fish and loved how much more intuitive it felt then Puppet as a provisioner (due to my Python not Ruby background).

# [A Groceries app.](http://tesco-groceries.herokuapp.com/)
## What is it?
My latest project, a quicker way to do the weekly groceries shop using the Tesco API.

## What did I learn?
I got much more proficient with Salt with Vagrant. Setting up install configurations for Redis, NodeJS and NPM.
I used GruntJS (another tech I use every day in my current role). The client side (all in AngularJS) is served from a single JS file (app.js). Grunt watchs and recompiled the file whenever a coffeescript source files changes. I also learnt about [grunt-angular-templates](https://npmjs.org/package/grunt-angular-templates) which minifies, combines and automatically caches any template files in javascript file.

With out indulging myself in these various side project, I wouldn't of had much a chance to learn about prototyping with Flask, data storage with Redis and MongoDB, virtual development machines with Vagrant, provisioning with SaltStack, performance considerations with AngularJS, build systems with GruntJS, scrapping PhantomJS, Geospatial data with geoJSON and CartoDB, or making Chrome extensions development!

What's your side project? Has it taught you anything new? I'd love to hear about it in the comments!

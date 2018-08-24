---
title: Resizing images using Flask and Redis.
date: 2013-06-15
tags: FLASK, REDIS
---

Recently I put together a mini-project that resizes images convenientally through Flask and caches the thumbnail images in Redis.

The code is all on [github](https://github.com/cameronmaske/puppy-eyes) and there is a [demo](http://puppy-eyes.herokuapp.com/) here to try out! To resize an image, you pass the image's url as the url parameter `link`:

![https://puppy-eyes.herokuapp.com/?link=http://i.imgur.com/75Jr3.jpg](https://puppy-eyes.herokuapp.com/?link=http://i.imgur.com/75Jr3.jpg)

And the server will return the resized _thumbnail_ image!

##So how does it work?

Using [flask](http://flask.pocoo.org/) on the backend, a check is run to see if the resized image already exists in the [redis server](http://redis.io/) (a very fast key-store) based on the image's url and sizing options passed in. If it does, great! The stored string in the redis is turned back into an image file and served back as the response.
If it does not exist, the image is downloaded, resized (by [PIL](http://www.pythonware.com/products/pil/)), stored in redis as a string (essentially caching it if a repeat call it made) and then served back.

If for some reason you linked to something that isn't an image, it should just redirect through.

This mini-project came out of the frustration of images in emails. Getting images with varying heights and widths to appear the same size across popular email clients is a nightmare. Some support max-width, some support only width, some don't even support height (I'm looking at you [Outlook](http://www.campaignmonitor.com/css/)).
While this wasn't the chosen solution in the end, I thinks it's a neat use case of how both the simplicity (and power) of redis and flask play nicely together!

Let me know if you have any questions in the comments!

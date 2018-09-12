---
title: 'Create A Factory Pytest Fixture'
order: 5
duration: 120
youtubeId: vpRGmY-s3ak
description: Short, instructive video about writing a dynamic factory pytest fixture. The example generates a `Person` object, each time with a unique name while still allowing easy customization when needed.
thumbnailUrl: /thumbnails/pytest-fixture-factory.png
uploadDate: 2018-08-31
duration8601: P2M0S
embedUrl: https://www.youtube.com/watch?v=vpRGmY-s3ak
---

This video goes over a basic factory pattern you can use in your pytest fixtures to generate
dynamic setup variables.
It covers generating a `Person` object, each time with a unique name while still allowing easy customization when needed.

<transcript>
1
00:00:00,020 --> 00:00:03,400
Let's take a look at how we can make our pytest fixtures more dynamic by turning this `person` fixture into a factory. We're gonna start by adding the keyword arguments to the fixture function.
4
00:00:11,160 --> 00:00:15,100
Next let's add a nested function inside that also passes down the keywords arguments. As a convention I like to use this same name as the fixture but with an underscore in front. We'll move our `Person` object to be return there. But we are going to initialize it with the keyword arguments that we passed down.
8
00:00:26,960 --> 00:00:29,330
Let's make the fixture return our nested function. Now we're going to refactor our test and we're going to have it treat the `person` fixture as a function.
11
00:00:39,420 --> 00:00:41,840
Let's run the test to verify that everything works....and they pass
So what's happening here? When we call our fixture we are reaching to the...nested function inside and passing through the keyword arguments to the `Person` object.
17
00:00:52,380 --> 00:00:54,560
In it's current state this isn't too useful but it shows us the basis of this nested function pattern.Let's extend this a bit further and not have it call every person Bob, but instead generate a unique name each time.
22
00:01:05,300 --> 00:01:08,340
We'll add a count variable outside of nested function. We will then get access to that variable inside of our nested function by using Python 3's `nonlocal` statement. Which just tells Python to retrieve the variable from the scope above it.
25
00:01:19,040 --> 00:01:22,060
Each time that this runs we want it to increment the count and let's attempt to `pop` the name out of our keyword arguments. But if that's not present, let's default to to "Bob" with our count tacked on at the end.
28
00:01:33,240 --> 00:01:35,900
And we'll pass the `name` to our `Person` object. Let's add one more test to demonstrate what the fixture is doing now. Each time it runs it should generate a unique name as the count is incremented, but we also have the ability to specify a name if needs be.
33
00:01:52,280 --> 00:01:55,320
Let's run the test to verify our `fixture` works as intended....and they pass.
</transcript>

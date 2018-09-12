---
title: 'Create A Yield Pytest Fixture'
order: 5
duration: 124
youtubeId: Yl6g5bboxEo
description: Short, instructive video on using a pytest yield fixture to add teardown logic to keep your test isolated. The example show to extend a database fixture to automatically remove all data after each test function run.
thumbnailUrl: /thumbnails/pytest-fixture-yield.png
uploadDate: 2018-09-11
duration8601: P2M04S
embedUrl: https://www.youtube.com/watch?v=Yl6g5bboxEo
---

This video goes over how to use `yield` in a pytest fixture to add teardown logic to keep your tests isolated.

<transcript>
1
00:00:00,000 --> 00:00:02,580
You want to keep your test functions isolated. Sometimes that means taking extra steps to clean up certain conditions you've set up for the tests to run so that they don't bleed over into other tests. 
4
00:00:07,840 --> 00:00:10,680
In this example when we run the tests they fail and that's because we have a database whose state persists across all the tests. So anytime we insert some data, it sticks around.
8
00:00:22,420 --> 00:00:25,000
Let's fix this by using a pytest `yield` fixture. Let's start afresh and remove the previous database and then inside of our database fixture instead of returning the database we're going to yield it.After the yields will tell the database to purge itself of all data.
13
00:00:39,820 --> 00:00:43,100
Now when we run the test they pass, and we can run them a few more times just for good measure. To see what's happening here let's add a few print statements so it's a bit easier to follow along.
17
00:00:50,309 --> 00:00:53,720
We'll add one just after the database is setup, one right at the end of the fixture and finally one at the end of our test. Let's run the tests again, this time a bit more verbose and focusing in on just a single test function and now we can walk through what's happening here.
23
00:01:08,080 --> 00:01:10,720
Pytest goes ahead and runs the fixtures code as usual until it gets to the `yield` statement which it returns down to the test function.The test function goes ahead and runs all the way through and finishes and then the code after the `yield` statement is executed which in this case cleans out the database.
30
00:01:25,020 --> 00:01:26,640
This is a really clean approach as we can define what we need to do to set up a fixture alongside what we need to do to tear it down and clean it up afterwards and the yield statement acts as the divider between setup and teardown.
36
00:01:38,380 --> 00:01:40,560
But what if something does wrong in our test function? Let's simulate that by throwing in a random `Exception` and then we'll run the tests again.
40
00:01:47,460 --> 00:01:48,860
Importantly we can still see that the code after the yield function still executes. This is handy as if something goes wrong in our test function such as an assertion failingthat stops the test from finishing we still run that teardown code.
</transcript>

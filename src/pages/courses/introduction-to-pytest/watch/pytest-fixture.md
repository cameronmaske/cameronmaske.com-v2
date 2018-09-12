---
title: 'Create A Pytest Fixture'
duration: 51
youtubeId: 1of-iRbwgr0
order: 4
description: Short, instructive video about writing a pytest fixture to help dry out repetition code boilerplate.
thumbnailUrl: /thumbnails/pytest-fixture.png
uploadDate: 2018-08-01
duration8601: P51S
embedUrl: https://www.youtube.com/watch?v=1of-iRbwgr0
---

This video goes over the basics of implementing your own pytest fixture to help dry out repetition code boilerplate.
It covers moving a repeated variable into a seperate function decorated with `@pytest.fixture` and then importing that into your test functions as an argument.

<transcript>
1
00:00:00,099 --> 00:00:04,430
Let's use a pytest fixture to help dry out these tests. We'll start by importing pytest. Now let's move our common test variable or in this case Bob to his own separate function.
5
00:00:15,110 --> 00:00:19,220
Using a decorator we can register the function as a pytest fixture. And now we can go about injecting that fixture as an argument to our tests.And we can get rid of the previous variables we setup.
8
00:00:30,500 --> 00:00:32,759
Let's run the tests to make sure they pass...And they do.
Behind the scenes here pytest is going to look at the arguments include in the test functions
and see if they have a matching fixture registered.
13
00:00:41,359 --> 00:00:46,620
And if so executes that function, and passes
whatever it returns down to the test as an argument. This can help to keep your tests a bit more focused and easier to read.
</transcript>

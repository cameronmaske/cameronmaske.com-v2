---
title: 'Setup and Run A Test With Pytest'
duration: 47
youtubeId: aJVvffGlwQU
order: 1
description: Short, instructive video about how to setup a python test file, write an example test and then run the test suite through pytest.
thumbnailUrl: /thumbnails/setup-run-test.png
uploadDate: 2018-08-01
duration8601: P47S
embedUrl: https://www.youtube.com/watch?v=aJVvffGlwQU
---

Take your first steps with pytest.
See how to setup a python test file, write an example test and then run the test suite.

<transcript>
1
00:00:00,030 --> 00:00:06,359
After installing pytest, let's go ahead and make our first Python test file. 
Now let's add an test function.
And we'll include an assertion that we want pytest to check to know if the test should pass or fail.
6
00:00:14,540 --> 00:00:16,700
Let's run the pytest command...
and we can see that the test passes.
Behind the scenes here pytest is ooking for any files in the directory that begin with test and then inside those files it's gonna look for any functions that begin with test to discover any tests to run.
12
00:00:31,080 --> 00:00:35,840
Now let's add another test function. This time we are gonna make it purposely fail.
Then when we run pytest again we can see that it reports that the test fails and it gives us a bit more information to help debug that a bit further.
</transcript>

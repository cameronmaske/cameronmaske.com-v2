---
title: 'How To Mock Patch A Function [Video]'
date: 2018-08-23
tags: PYTEST, MOCK
twitter_title: How To Mock Patch A Function (Testing Python With Pytest)
description: Learn by example how to use @mock.patch when testing python with pytest. Covers mocking best practices, including using autospec and assert_called_once_with to avoid potential gotchas. Want to follow along? You can run the example test code in your browser.
intro: Learn the basics of mocking when testing Python with pytest in a short and to the point video. You can also run the example test code in your browser.
---

Getting started testing with mock can be intimidating and confusing! To combat this, I've put together a short video to help you learn the essentials and avoid the common gotchas that can trip you up.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ClAdw7ZJf5E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

> You can run this code live in your browser. <br/>Hit the ▶️ button below to run the tests. Open the files (📄) to see `test_dnd.pny` and `dnd.py`.

<iframe height="600px" width="100%" src="https://repl.it/@cameronmaske/How-To-Mock-Patch-A-Function-Testing-Python-With-Pytest?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<transcript>
1
00:00:00,380 --> 00:00:04,870
Let's get rid of the randomness in this test by mocking it out. 
Let's start off by importing mock that has been built into Python since version 3.3. 
If you are Python 2, however, you'll need to install it as a separate package.
4
00:00:14,010 --> 00:00:18,730
Next, let's point mock to the function we want to override or patch.
In this case our random integer function. Let's set it to always return a value of 5.
6
00:00:23,220 --> 00:00:28,259
And let's tell mock to autospec that function.
And we'll see why that's important in a bit.
And let's include an argument in our test function to grab that mock object.
Let's run the test.... and it passes.
9
00:00:37,340 --> 00:00:41,440
So there can be a few common gotchas that can trip you up when mocking.
When specifiying the path to what you wanna patch you need to take care to point it is being used, but not where it's defined. Let's see that in action and point to the random module or where it is defined.
12
00:00:50,460 --> 00:00:55,170
And we can see that our tests failed because it's not being mocked anymore.
Speccing makes sure that anything mock tries to mimic it's original a bit more closely.
We can see that in action by turning off autospecc'ing and let's add some nonsense to the argument in our random integer function. 
16
00:01:10,840 --> 00:01:15,630
And now when we run our tests they pass and that's because
an unspecced mock will literally take anything you throw at it. Which isn't too useful when your testing. But with autospeccing on, our mocked function will check the right number of arguments.
19
00:01:25,210 --> 00:01:29,780
But we can do one better, we can make sure that our mocked function is explicitly called the arguments that we would expect. To do so we can use assert_called_once_with which is a method included on a mock object.
21
00:01:35,729 --> 00:01:39,259
Let's run the test to verify...
And it passes.
</transcript>

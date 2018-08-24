---
title: "How To Mock Patch A Function [Video]"
date: 2018-08-23
tags: PYTEST, MOCK
twitter_title: How To Mock Patch A Function (Testing Python With Pytest)
description: Learn by example how to use @mock.patch when testing python with pytest. Covers mocking best practices, including using autospec and assert_called_once_with to avoid potential gotchas. Want to follow along? You can run the example test code in your browser.
intro: Learn the basics of mocking when testing Python with pytest in a short and to the point video. You can also run the example test code in your browser.
---
Getting started testing with mock can be intimidating and confusing! To combat this, I've put together a short video to help you learn the essentials and avoid the common gotchas that can trip you up.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ClAdw7ZJf5E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

> You can run this code live in your browser. <br/>Hit the ▶️  button below to run the tests. Open the files (📄) to see `test_dnd.pny` and `dnd.py`.

<iframe height="600px" width="100%" src="https://repl.it/@cameronmaske/How-To-Mock-Patch-A-Function-Testing-Python-With-Pytest?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

<details>
    <summary>Video Transcript</summary>
    <div>
Let's get rid of the randomness in this test by mocking it out. <br/>Let's start off by importing mock that has been built into Python since version 3.3.<br/>If you are Python 2, however, you'll need to install it as a separate package.<br/>Next, let's point mock to the function we want to override or patch, in this case our random integer function.<br/>Let's set it to always return a value of 5 and let's tell mock to autospec that function And we'll see why that's important in a bit.<br/>Let's include an argument in our test function to grab that mock object.<br/>Let's run the test.... and it passes.<br/>So there can be a few common gotchas that can trip you up when mocking.<br/>When specifiying the path to what you wanna patch you need to take care to point it is being used, but not where it's defined. <br/>Let's see that in action and point to the random module or where it is defined. And we can see that our tests failed because it's not being mocked anymore. <br/>Speccing makes sure that anything mock tries to mimic it's original a bit more closely. We can see that in action by turning off autospecc'ing and let's add some nonsense to the argument in our random integer function. <br/>And now when we run our tests they pass and that's because an unspecced mock will literally take anything you throw at it. 
</div>
</details>
<br/>
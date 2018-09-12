---
title: 'Structure Your Tests With Arrange, Act, Assert'
duration: 55
youtubeId: sCthIEOaMI8
order: 2
description: Short, instructive video about using 'Arrange, Act And Assert' when testing python. See an example test being written that breaks down testing structure line by line.
thumbnailUrl: /thumbnails/structure-tests.png
uploadDate: 2018-08-01
duration8601: P55S
embedUrl: https://www.youtube.com/watch?v=sCthIEOaMI8
---

Learn how to the Arrange, Act and Assert pattern when structuring your tests.

- Arrange, setup any variables or conditions your test needs.
- Act, execute the code you want to test.
- Assert, Check that the code behaviours in a way that you would expect.

<transcript>
1
00:00:00,180 --> 00:00:03,540
When it comes to structuring your tests one pattern to keep in mind is Arrange, Act and Assert.
3
00:00:06,840 --> 00:00:10,200
You typically start out by "arranging" or setting up the test. In this case let's set up a person called Bob.
5
00:00:13,980 --> 00:00:14,900
Then we're going to "act" and call the code we want to test. So let's greet Bob.
8
00:00:21,060 --> 00:00:22,220
And finally we're going to "assert" that the code we called acted in a way we would expect.
In this case that Bob is being politely greeted.
12
00:00:32,440 --> 00:00:33,860
Let's run our test...and it passes.
Most tests follow this pattern. We "arrange" or we setup any variables,
conditions we might need. We then "act" and execute the code we are interested in testing.
And finally we "assert" or check that the code behavioured in way we would expect.
</transcript>

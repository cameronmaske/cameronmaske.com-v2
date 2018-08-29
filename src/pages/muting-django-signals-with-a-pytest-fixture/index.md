---
title: Muting Django Signals With A Pytest Fixture
date: 2018-08-01
tags: PYTEST, DJANGO
summary_image: '/cards/django-signals-pytest.png'
twitter_title: Muting Django Signals With A Pytest Fixture
twitter_description: Learn how to implement an autouse pytest fixture to mute Django signals in your test suite. Useful to help speed up tests and prevent any excess database actions.
description: Learn how to implement an autouse pytest fixture to mute Django signals in your test suite. Useful to help speed up tests and prevent any excess database actions.
intro: Learn how to implement an autouse pytest fixture to mute Django signals in your test suite. Useful to help speed up tests and prevent any excess database actions.
---

In this post, you'll learn how to implement a global pytest fixture to automatically mute (and optionally unmute) Django signals in your tests.

This post isn't a [deep dive into what signals are](https://www.bedjango.com/blog/understanding-django-signals/) or the [pros/cons of using them](https://lincolnloop.com/blog/django-anti-patterns-signals/). Others have covered that in much better detail. Instead, we are going to focus on the practicalities of controlling signals when testing.

Django signals can often have a cascading effect, for example, they can trigger more database manipulation, make external API calls, or schedule background tasks. All of which slow down your test suite.  
When testing, sometimes you don't want to worry about those side effects. That isn't to say, you should flat out ignore testing signal functionality. So let's implement something flexible enough so when needed we can opt-in and enable signals.

## Model and signal

Let's start diving into some code to set up a dummy model with an attached signal.

```python
# app/example/models.py

from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class Example(models.Model):
    text = models.CharField(max_length=500)


@receiver(pre_save, sender=Example)
def pre_save_signal(sender, instance, **kwargs):
    instance.text = "Signal override"
```

In this code, when an `Example` model is saved, it's text field is replaced through a `pre_save` signal to the string `"Signal override"`.

This example is very contrived, but its simplicity lets us clearly demonstrate if the signal in question is muted or not. Note: It doesn't follow the best practices of hooking up a signal to an `AppConfig.ready`. [This article covers it in better detail](https://www.bedjango.com/blog/understanding-django-signals/).

With our model setup, the next step is to ensure we have pytest installed and setup to run our tests, instead of Django's default test runner.

If you haven't used pytest as a test runner for Django before, [I highly recommend you consider switching or at least trying it out](http://www.cameronmaske.com/using-pytest-with-django/).
Importantly switching over doesn't mean you have to re-write all of your tests. Pytest works out of the box with [existing class-based unittest-style tests](https://docs.pytest.org/en/latest/unittest.html) a.k.a Django's TestCase.

If you want to make the switch, [the pytest-django documentation covers the how-to in 3 easy steps](https://pytest-django.readthedocs.io/en/latest/tutorial.html#step-1-installation).

## Fixture.

Fixtures are part of what makes pytest really shine. But what are they?

Pytest fixtures are functions that let you easily set up resources or functionality before a test starts, then clean up or tear down as needed after the test finishes.

They can be injected into individual tests or can be setup to be automatically used across all tests. Fixtures can have a wide range of uses, they can setup some required state, e.g. a database model or let us patch/mock certain functionality.

Without further ado, let's take a look at our fixture.

```python
# tests/intergration_tests/conftest.py
from django.db.models.signals import pre_save, post_save, pre_delete, post_delete, m2m_changed
import pytest
from unittest import mock


@pytest.fixture(autouse=True) # Automatically use in tests.
def mute_signals(request):
    # Skip applying, if marked with `enabled_signals`
    if 'enable_signals' in request.keywords:
        return

    signals = [
        pre_save,
        post_save,
        pre_delete,
        post_delete,
        m2m_changed
    ]
    restore = {}
    for signal in signals:
        # Temporally remove the signal's receivers (a.k.a attached functions)
        restore[signal] = signal.receivers
        signal.receivers = []

    def restore_signals():
        # When the test tears down, restore the signals.
        for signal, receivers in restore.items():
            signal.receivers = receivers

    # Called after a test has finished.
    request.addfinalizer(restore_signals)
```

_Note: Credit to [factoryboy's own mute_signal functionality](https://github.com/FactoryBoy/factory_boy/blob/2d735767b7f3e1f9adfc3f14c28eeef7acbf6e5a/factory/django.py#L256) from which this code is heavily influenced by_.

Let's break down the most important lines from the snippet above to explain what our fixture is doing.

### `@pytest.fixture(autouse=True)`

By decorating the function with `@pytest.fixture` we register with pytest that this is a fixture.

By setting `autouse=True` the fixture is automatically invoked and used for each test. This produces the default behaviour to mute all signals. `autouse` fixtures can be especially powerful as they provide tests with global setup/tear-down conditions without any changes required on the existing test code.
But, they should be used with caution, any slowdown in a global fixture will, in turn, slow down every test.

_Note, the scope of the fixture depends on where it lives in the codebase, more detail provided below when we explore about `conftest.py`._

### `if 'enable_signals' in request.keywords:`

There may be some instances where we want to opt-in into enabling signals. Pytest lets you "mark" tests, to easily set metadata on your test functions. One use of this is to have fixtures read that metadata to control how they behave. In this case, when we come across a test marked with `@pytest.mark.enable_signals`, the signal patching will _not_ apply, and thus _not_ mute the signals. Later on, we'll also see how we can filter and run tests based on their marks.

### `signal.receivers = []`

This is the meat of our monkey patch. We detach the receiver functions from signals, storing them in a dictionary to restore later on.

### `request.addfinalizer(restore_signals)`

After the test finishes, we should restore the signals.
`addfinalizer` is called at tear-down (a.k.a after the test finishes). It invokes `restore_signals`, which as the name suggests, reattaches the receiver functions to their corresponding signals.

### A note about `conftest.py`

Typically fixture code resides in a `conftest.py` file.
They provide a convenient place to declare fixtures that are shared with tests. Where the `conftest.py` lives dictates the scope of where it applies. If present in the root test folder, the fixture declared will be available to all tests. If present in a specific module, they will only apply to tests in that module.

```
tests/
├── conftest.py # Applies to all tests
└── example/
    ├── conftest.py # Applies only to tests in this module/folder.
    ├── test_foo.py
```

You can have multiple `conftest.py` files in a project. One common style is to have your `unit` and `integration` tests are split into different folders. In that case, you can have a `conftest.py` in each, with different flavours of the fixtures and behaviours to better match the style of test. For example, automatically muting signals for unit tests, but opting-in to mute signals for integration tests.

### Tests

Great, our fixture is set up, now let's see it in action by writing two tests, one with signals disabled, the other with signals enabled.

```python
# tests/intergration_tests/example/test_models.py

@pytest.mark.django_db
def test_signals_disabled():
    example = Example.objects.create(text="Hello World")
    assert example.text == "Hello World"

@pytest.mark.django_db
@pytest.mark.enable_signals  # Enable signals for this test.
def test_signals_enabled():
    example = Example.objects.create(text="Hello world")
    assert example.text == "Signal override"
```

By including the `@pytest.mark.enable_signals` decorator we enable signals on the marked test function.

_Note, when using `pytest-django`, you need to mark when a test requires access to the database. This ensures each test case runs in its own transaction which will be rolled back at the end of the test. [This behaviour is the same as Django’s standard django.test.TestCase class](https://pytest-django.readthedocs.io/en/latest/helpers.html#pytest-mark-django-db-request-database-access)_.

Let's run the tests to make sure everything passes.

```bash
$ docker-compose run api pytest tests/intergration_tests/example/test_models.py
Starting testing_db_1 ... done
======================= test session starts =======================
platform linux -- Python 3.6.6, pytest-3.7.0, py-1.5.4, pluggy-0.7.1
rootdir: /code, inifile:
plugins: django-3.3.3
collected 2 items

tests/intergration_tests/example/test_models.py ..                                                                                                                                                                                    [100%]

======================= 2 passed in 0.82 seconds =======================
```

Great! Our fixture and tests work.

Alternatively, if you are using Django's default class `unittest TestCase` test approach, the equivalent code would look like this...

```python
# tests/intergration_tests/example/test_legacy_models.py


class ExampleTest(TestCase):
    def test_signals_disabled(self):
        example = Example.objects.create(text="Hello World")
        self.assertEqual(example.text, "Hello World")

    @pytest.mark.enable_signals
    def test_signals_enabled(self):
        example = Example.objects.create(text="Hello world")
        self.assertEqual(example.text, "Signal override")
```

## More pytest running power

Pytest also opens up some interesting ways to slice and dice which tests to run. [Using the `-m` flag, we can run tests matching only the given mark expression](https://docs.pytest.org/en/latest/example/markers.html#marking-test-functions-and-selecting-them-for-a-run).

From this, here is how to run all tests with signals enabled.

```bash
$ docker-compose run api pytest tests/intergration_tests/example/test_models.py -m "enable_signals"
```

And here is how to run all tests with signals disabled

```bash
$ docker-compose run api pytest tests/intergration_tests/example/test_models.py -m "not enable_signals"
```

## That's it!

If you would like to check out the code used for this project, it's [available on Github](https://github.com/cameronmaske/django-drf-testing/tree/signals-example).

Let me know in the comments below any thoughts or questions you might have. Do you run your Django tests with signals enable or disabled by default?

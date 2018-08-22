---
title: Using pytest with Django
date: 2015-12-08
published: true
tags: DEVELOPMENT
intro: todo
--- 
When it comes to testing in python pytest is my favorite testing tool. pytest is a testing framework that strips out boilerplate and adds a whole bunch of sensible utilities to make your tests more pythonic. In this post we'll cover how to add that awesomeness to a Django project.

This is a cross-post of a post I did for the [TrackMaven Engine Room](http://engineroom.trackmaven.com/blog/using-pytest-with-django/).


### Comparing `unitest` to `pytest`

```python
import unittest

class TestExample(unittest.TestCase):
    def test_hello_world(self):
        self.assertEqual("hello world", "hello world")
```

#### `pytest`

```python
def test_hello_world():
    assert "hello_world" == "hello_world"
```

In our newer Django projects we've been using `pytest` instead of the default test runner. Django's prefer testing is built on top of [unittest](https://github.com/django/django/blob/2ab244ff3a799b1a49550a7e7582c4b46e402197/django/test/testcases.py#L155). Luckily for any `pytest` fans, this makes it easy to have `pytest` be a drop in [replacement](https://pytest.org/latest/unittest.html) without having to change a single test.

# How?

Let's dive into how you can setup `pytest` on your Django projects. For this post, I've created an repo with a dummy Django 1.8 [project](https://github.com/TrackMaven/using-pytest-with-django).  It's local development environment is managed by [Docker + Docker Compose.](http://engineroom.trackmaven.com/blog/a-better-development-environment-with-docker-and-fig/). All code examples are pulled from there.

We'll need one more library in addition to `pytest`  to get everything working smoothly with Django. [`pytest-django`](https://pytest-django.readthedocs.org) takes care of replicating [Django's existing testing functionality](https://docs.djangoproject.com/en/1.8/topics/testing/tools/#transactiontestcase) into `pytest`.

In our [`requirements-dev.txt`](https://github.com/TrackMaven/using-pytest-with-django/blob/master/requirements-dev.txt) we've can add in the two packages to be installed.


```txt
pytest==2.7.2
pytest-django==2.8.0
```

> These were the latest versions when this post was written, be sure to check pypi if either [`pytest`](https://pypi.python.org/pypi/pytest) or [`pytest-django`](https://pypi.python.org/pypi/pytest-django) have been updated.

We need to bootstrap `pytest` with our Django project [settings](https://docs.djangoproject.com/en/1.8/topics/settings/).

`pytest-django`'s documentation [recommends](https://pytest-django.readthedocs.org/en/latest/configuring_django.html) a few different ways to achieve this. I'd advocate loading them in through a global `conftest.py`

In `pytest` any `conftest.py` files are invoked before any tests are run. They provide a convenient method to setup hooks or configure any settings for our tests.
Where the `conftest.py` lives dictates the scope of where it applies. If present in the root test folder, hooks declared will apply to all tests. If present in a specific module, hooks will only apply to tests in that module.

```
tests/
├── conftest.py # Applies to all tests
└── example/
    ├── conftest.py # Applies only to tests in this module/folder.
    ├── test_foo.py
```

In our case, we want the [`conftest.py`](https://github.com/TrackMaven/using-pytest-with-django/blob/master/tests/conftest.py) to apply to all tests therefore we place it in our tests root directory.


```python
import os
import django
from django.conf import settings

# We manually designate which settings we will be using in an environment variable
# This is similar to what occurs in the `manage.py`
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.config.settings')


# `pytest` automatically calls this function once when tests are run.
def pytest_configure():
    settings.DEBUG = False
    # If you have any test specific settings, you can declare them here,
    # e.g.
    # settings.PASSWORD_HASHERS = (
    #     'django.contrib.auth.hashers.MD5PasswordHasher',
    # )
    django.setup()
    # Note: In Django =< 1.6 you'll need to run this instead
    # settings.configure()
```

If setup correctly, you should now be able to run the test suite. Instead of running tests through `manage.py` you run them through the `py.test` command directly.

```bash
$ docker-compose run web py.test
=== test session starts ===
platform linux -- Python 3.3.6 -- py-1.4.30 -- pytest-2.7.2
rootdir: /code, inifile:
plugins: django
collected 3 items

tests/integration_tests/example/test_models.py ..
tests/unit_tests/example/test_helpers.py .

=== 3 passed in 2.95 seconds ===
```


To run a specific test in a module/file, you just include the path after the command, like so `py.test <path>`.

```bash
$ docker-compose run web py.test tests/integration_tests/example/test_models.py
=== test session starts ===
platform linux -- Python 3.3.6 -- py-1.4.30 -- pytest-2.7.2
rootdir: /code/tests/integration_tests/example, inifile:
plugins: django
collected 2 items

tests/integration_tests/example/test_models.py ..

=== 2 passed in 2.92 seconds ===
```


To run a specific test, point `py.test` to a specific file and test name, like so `py.test <path_to_file>::<name_of_test>`.

```bash
$ docker-compose run web py.test tests/integration_tests/example/test_models.py::test_save
=== test session starts ===
platform linux -- Python 3.3.6 -- py-1.4.30 -- pytest-2.7.2
rootdir: /code/tests/integration_tests/example, inifile:
plugins: django
collected 2 items

tests/integration_tests/example/test_models.py .

=== 1 passed in 2.94 seconds ===
```


### Existing tests.

As mentioned previously, any existing Django `unittest` style tests will work out of the box. Here is an [example](https://github.com/TrackMaven/using-pytest-with-django/blob/master/tests/integration_tests/example/test_models.py).

```python
# Any existing `unittest` style tests still work without any changes needed.
from django.test import TestCase


class ExampleTestCase(TestCase):
    def setUp(self):
        self.maven = Dog(name="Maven", breed="corgi")
        self.maven.save()

    def test_save(self):
        self.assertEquals(self.maven.name, "Maven")
        # You can mix in pytest's `assert` approach!
        assert self.maven.breed == "corgi"
```

#### Database testing

One key difference to watch out for is running `pytest` style tests against the database.

By default, `pytest-django` takes a conservative approach to enabling database access in tests.  Any `pytest` style tests will fail if they try to access the database.
In order to allow database access to a test, you need add a [`py.test mark`](http://pytest.org/latest/mark.html) decorator like so...

```python
from example.models import Dog
import pytest


# If your tests need to use the database and want to use pytest
# function test approach, you need to `mark` it.
@pytest.mark.django_db
def test_save():
    maven = Dog(name="Maven", breed="corgi")
    maven.save()
    assert maven.name == "Maven"
    assert maven.breed == "corgi"
```

That's it! You can now take full advantage of `pytest` in your Django project.

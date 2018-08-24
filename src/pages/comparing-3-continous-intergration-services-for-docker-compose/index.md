---
title: Comparing 3 Continuous Intergration Services For a Docker Compose Project
date: 2018-08-11
tags: DOCKER, CI
summary_image: '/static/cards/ci.png'
twitter_title: Comparing Codeship, CircleCI and TravisCI For A Docker Compose Project
twitter_description: Find the best continuous intergration service for your Docker Compose project, by speed, cost and setup ease. Using a sample Django Rest Framework repo, this guide goes into depth about how to configuring each CI, the pricing options and measures the speed to build Docker images and run the test suite.
description: Find the best continuous intergration service for your Docker Compose project, by speed, cost and setup ease. Using a sample Django Rest Framework repo, this guide goes into depth about how to configuring each CI, the pricing options and measures the speed to build Docker images and run the test suite.
intro: Comparing Codeship, CircleCI and TravisCI by speed, cost and setup ease for a Django Rest Framework project.
---

In this post, I'm going to compare 3 different hosted continuous integration services (Codeship, CircleCI and Travis) for a Docker Compose project.

## What I'm looking for

I'll be judging the options based on the 3 main things I look for from a CI.

- Speed. I want something that will build and run my tests as fast as possible. I want to minimize the time spent waiting for my pull request's checks to pass or fail.
- Cost. How much does it cost to use and how does that scale as your project/team grows. I'll also compare the costs of public and open source project vs a private one.
- Setup complexity and ease. The less time spent to get everything up and running the better. Is the documentation useful? Are there example projects for a quickstart?.

This post doesn't focus on pushing, publishing Docker images or deploying them as services.

If you have experiences with those aspects and you'd like to share, feel free to drop a comments below.

###Our sample project

To compare our CIs, [I have set up a Python-based Django + Django Rest Framework application](https://github.com/cameronmaske/django-drf-testing/tree/testing-comparison) that uses Docker Compose for it's local development. It uses pytest as its test runner and needs to run both unit tests and integrations tests against a Postgres database. The project has [purposefully resource-heavy dummy tests setup](https://github.com/cameronmaske/django-drf-testing/blob/ae933f652b5547dd8a567aa9b58ef15b0e6e8d7d/tests/unit_tests/test_examples.py#L1) to test the performance speed of the CI solutions. to test the performance speed of each CI solution.

##[Codeship Pro](https://codeship.com/features/pro)

Codeship has two offerings, Basic and Pro. Pro includes Docker support, so we will only be looking at that one.

###Setup

Codeship requires two key files to setup your Docker containers and then run the required tests.

####Codeship Services File [`codeship-services.yml`](https://github.com/cameronmaske/django-drf-testing/blob/testing-comparison/codeship-services.yml)

Here you outline what Docker services your test suite needs.
This file is very similar to a `docker-compose.yml`, in fact, in its absence, Codeship will automatically search for a `docker-compose.yml` file to use in its place.

```yaml
# codeship-services.yml
api:
  build: .
  depends_on:
    - db
  cached: true
  environment:
    - DATABASE_URL=postgresql://user:password@db:5432/db
    - DEBUG=true
    - ALLOWED_HOSTS=*
    - SECRET_KEY=foo
db:
  image: healthcheck/postgres
  environment:
    - POSTGRES_PASSWORD=password
    - POSTGRES_USER=user
    - POSTGRES_DB=db
```

However, a few of the configuration options differ from `docker-compose.yml`. For example:

- [`encrypted_env_file`](https://documentation.codeship.com/pro/builds-and-configuration/services/#environment-variables) is added. This lets you securely store encrypted environment variables in your source control to be used by your services. Using Codeship's CLI [`jet`](https://documentation.codeship.com/pro/jet-cli/usage-overview/) environment variables can be added, edited and removed.
- [`cached`](https://documentation.codeship.com/pro/builds-and-configuration/services/#caching-the-docker-image) is added. This enables Codeship to cache a built image in their own secure registry after a build is finished. Allowing the CI to pull the image, rather than re-building each time. When setup correctly, this can help save time.

Not all configuration keys are available, [including `privileged`](https://documentation.codeship.com/pro/builds-and-configuration/services/#unavailable-features).

####Codeship Steps File [`codeship-steps.yml`](https://github.com/cameronmaske/django-drf-testing/blob/testing-comparison/codeship-steps.yml)

After your services are built/pulled, [this file defines what commands the services](https://documentation.codeship.com/pro/builds-and-configuration/steps/) need to run for their test suite.

```yaml
# codeship-steps.yml
- name: api tests
service: api
command: pytest tests/
```

For our project, this is fairly simple. However, more advanced usages allow you too:

- [Parallelize steps](https://documentation.codeship.com/pro/builds-and-configuration/steps/#parallelizing-steps-and-tests). This spins up separate containers to run simultaneously. If setup correctly this can make better use of the host machine's resources to run tests faster.
- [Limit specific commands to specific branches.](https://documentation.codeship.com/pro/builds-and-configuration/steps/#limiting-steps-to-specific-branches-or-tags)

###Pricing

Open source projects on Codeship are free.

They have a free plan, that includes:

- 100 builds a month
- 1 concurrent build
- 1 parallel test pipeline
- Unlimited projects/users/teams

Their pricing starts at **$75/month**. This gives you 1 concurrent build on 1 small instance (2 VCPU, 3.75 GB Memory). Pricing scales linearly by the number of instances and their size.

Codeship Pro builds run on individual [EC2 instances](https://documentation.codeship.com/general/about/vm-and-infrastructure/) running in the `us-east-1` region.
They all use a fixed version of Docker (18.03, the latest stable release when this was written).

##[CircleCI 2.0](https://circleci.com/)

For Docker-based projects, CircleCI enables you to run jobs in one of [two virtual environments](https://circleci.com/docs/2.0/executor-types/):

- In Docker images (`executor_type=docker`).
- In a dedicated Linux VM (`executor_type=machine`).

I prefer using the `machine` executor, as the configuration is simpler and seems easier to integrate with a [Docker Compose project](https://circleci.com/docs/2.0/docker-compose/). However, [CircleCI documentation's notes](https://circleci.com/docs/2.0/docker-compose/#using-docker-compose-with-machine-executor) that the use of the `machine` executor may require an additional fee in a future pricing update.

_I've reached out to CircleCI's support to clarify what that may mean, and will update this post with that information if they reply._

The `docker` executor requires a few workarounds ([documented here](https://gist.github.com/cameronmaske/ad032c7709cf8b9fc1da4ad8df908450)) that add to the complexity. It still a feasible option, but the few gotchas sway my favour towards the `machine` executor

###Setup

```yaml
# .circleci/config.yml
version: 2
jobs:
  build:
    machine: true
    steps:
      - checkout
      - run:
          name: Create .env file
          command: touch .env
      - run:
          name: Build Containers
          command: docker-compose build
      - run:
          name: Run Postgres
          command: docker-compose up -d db
      - run:
          name: Run Tests
          command: docker-compose run api pytest tests/
```

[CircleCI's configuration YML](https://github.com/cameronmaske/django-drf-testing/blob/testing-comparison/.circleci/config.yml) lets you define multiple jobs, that can have multiple steps (commands).

In this case, we have kept things simple and set up a single job, that builds our containers, starts the database then runs the tests.

You can control the jobs orchestration using a separate option called [workflows](https://circleci.com/docs/2.0/workflows/). This can allow you to run things in parallel (on the same machine), and potentially use resources better to speed up your test suite. You can also run tests in parallel across multiple machines, however, this is [defined for each job](https://circleci.com/docs/2.0/configuration-reference/#parallelism).

###Pricing

Open source projects are free on CircleCI. In their [FAQ](https://circleci.com/pricing/#faq-section-linux) they state they offer up to 4 containers for public projects.

They have a free plan, that includes:

- 1 container limited to 1500 build minutes per month.
- Unlimited projects/users

After which, you pay **$50** per container (and have unlimited build minutes per month). Each container allows you to run 1 concurrent job. Multiple containers allow you to either run multiple builds at the same time or single builds with parallel jobs.

Each CircleCI build container, when run as an `machine` executor has [2 CPU @ 2.3 GHz and 8GB Memory](https://circleci.com/docs/2.0/executor-types/#using-machine).

You can also pay extra (how much is currently private) to enable [Docker Layer Caching](https://circleci.com/docs/2.0/docker-layer-caching/) which could speed up large image builds. _I've reached out to CircleCI's support about how much this costs and will update this post if I receive a reply._

Currently, the default Docker version used is `17.09.0-ce` (compared to the latest stable release of `18.03.1-ce`).
[To pin a specific Docker version](https://discuss.circleci.com/t/new-docker-versions-for-machine-images-on-circleci-2-0/15686), you can do so my using `year-month` versioned image, e.g. `circleci/classic:201808-01`.

##[TravisCI](https://travis-ci.org/)

###Setup

Travis uses a `.travis.yml` [file to configure any build/test/deploy](https://docs.travis-ci.com/user/customizing-the-build/) steps that run on your virtual environment. Unlike the previous two options, Travis doesn't come with Docker installed. Instead, as part of the build, we need to `apt-get` Docker, and `curl` install Docker Compose.

```yaml
sudo: required
? addons
apt:
  packages:
    - docker-ce
services:
  - docker

? env
DOCKER_COMPOSE_VERSION: 1.22.0

before_install:
  - sudo rm /usr/local/bin/docker-compose
  - curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > docker-compose
  - chmod +x docker-compose
  - sudo mv docker-compose /usr/local/bin

  - touch .env
  # Setup your application stack. You may need to tweak these commands if you
  # doing out-of-the-ordinary docker-compose builds.

install:
  - docker-compose pull
  - docker-compose build
  - docker-compose up -d db

script:
  - docker-compose run api pytest tests/
```

After that, it's just a simple matter of running the same commands we use locally to execute the tests.

To run commands in parallel, you need to employ your bash-foo.
For example you can run a command in the background by appending an `&`.  
i.e.

    install:
      - docker-compose pull&

If you are after machine parallelism, Travis offers a build matrix, that allows you to [split up your jobs](https://docs.travis-ci.com/user/customizing-the-build/#build-matrix) across workers.

###Pricing

Open source projects are free on Travis CI.

For private projects, they have a free trial that gives you 100 builds (in total, doesn't reset each month).

After that, pricing starts at **$69** per month, and gives you:

- 1 concurrent job
- Unlimited build minutes
- Unlimited repos/collaborators

Pricing scales by job concurrency and discounts as the plan grows, e.g. 1 concurrent job is **$69**, 10 concurrent jobs is **$489** ($48.90 each).

Based on [your configuration](https://docs.travis-ci.com/user/reference/overview/#For-a-finished-build) your worker machine's specs can differ. In our case, the virtual environment was run on GCE, with 2 cores and 7.5GB Memory.

##Speed Test

To compare the speed of each offering, we'll look at two things:

- How long the test-suite took to run, reported by pytest
- How long the overall build took, reported by each service.

<table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col" style="background: #88bf8878;">Codeship</th>
      <th scope="col">CircleCI</th>
      <th scope="col">Travis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Time to run tests</th>
      <td style="background: #88bf8878;">117 seconds</td>
      <td>127 seconds</td>
      <td>128 seconds</td>
    </tr>
    <tr>
      <th scope="row">Total build time</th>
      <td style="background: #88bf8878;">2 minutes 56 seconds</td>
      <td>3 minutes 11 seconds</td>
      <td>5 minutes 3 seconds</td>
    </tr>
  </tbody>
</table>

From testing, Codeship built and ran the fastest, followed closely by CircleCI.
Travis lagged behind. It seems to be slower to spin up a instance and the added installation needed for Docker/Docker Compose costs additional time.

##Conclusion

From our 3 options, it's a close call between Codeship and CircleCI. Codeship built and ran the fastest, was easy to cache built images and had good clear documentation and example projects. However, CircleCI's pricing (**$20** cheaper on the first tier) could justify it's ever so slightly slower build time.

Subjectively, I liked CircleCI's configuration the most, as it didn't require me to change my local Docker Compose configuration. [However, one future cause for concern might be their note that [machine executor pricing may change](https://circleci.com/docs/2.0/docker-compose/#using-docker-compose-with-machine-executor).

<strong>CircleCI is a narrow winner for me</strong>. If you have complex and build intensive Docker images, Codeship's caching might tip it over the edge.

> What do you think? I'd love to hear from others if they have any additional experiences! Share them in the comments!

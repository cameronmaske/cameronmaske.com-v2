---
title: How To Run Docker On OSX With NSF (And Avoid Docker for Mac Slow Performance)
date: 2017-01-01
tags: DOCKER, OSX
summary_image: '/cards/docker-for-mac.png'
twitter_title: How To Run Docker On OSX With NSF (And Avoid Docker for Mac Slow Performance)
twitter_description: This guide show you how to overcome Docker For Mac's slow filesystem performance, by using Docker Toolbox and docker-machine-nfs (~20x faster).
description: This guide show you how to overcome Docker For Mac's slow filesystem performance, by using Docker Toolbox and docker-machine-nfs (~20x faster).
intro: Use Docker Toolbox and docker-machine-nfs to create a great local OSX Docker development environment (~20x faster vs Docker For Mac).
updated_date: 2018-01-01
---

In this post, I'll cover the best way I've found to run Docker in my local OSX development environment.

This post won't cover (and has covered in much better detail) [what Docker is](https://www.safaribooksonline.com/library/view/introduction-to-docker/9781491916179/), or [the benefits](https://www.oreilly.com/ideas/what-containers-can-do-for-you) of using it.

Before we dive into the setup instruction, it's worth addressing, why not to use Docker's own recommended solution, [Docker For Mac](https://docs.docker.com/engine/installation/mac/#/docker-for-mac).

### Why not Docker For Mac?

In short the [file system](https://forums.docker.com/t/file-access-in-mounted-volumes-extremely-slow-cpu-bound/8076). The current implementation of the file system results in high CPU usage when syncing (sharing) volumes.

As project's grow to include hundreds of files, the resulting slow down and strain becomes un-usable. Front end build processes that should be sub-second can take up to a minute. Commands run a [hundred times](https://forums.docker.com/t/file-access-in-mounted-volumes-extremely-slow-cpu-bound/8076/102) slower then in Ubuntu. Tests are magnitudes slower and are excruciating to run.

While, hopefully one day [Docker For Mac's filesystem performance issues](https://forums.docker.com/t/file-access-in-mounted-volumes-extremely-slow-cpu-bound/8076/158) will be resolved, until then this is the most reliable and efficient way I've found to run Docker on OSX.

### Step 1. Install Docker Toolbox

Download the `.pkg` from [https://github.com/docker/toolbox/releases/tag/v1.12.5](https://github.com/docker/toolbox/releases/tag/v1.12.5) and follow the GUI's install steps.

This will ensure the following packages are installed...

- VirtualBox
- Docker (client)
- Docker Compose
- Docker Machine

```bash
$ docker --version
Docker version 1.12.5, build 6b644ec
$ docker-machine --version
docker-machine version 0.8.2, build e18a919
$ docker-compose --version
docker-compose version 1.9.0, build 878cff1
```

### Step 2. Create a boot2docker virtual machine with Docker Machine

Modify the command below according to your computer's specs. Once assigned, you cannot modify these settings without destroying then re-creating the VM.

Here are the two choices to make.

- `--virtualbox-memory` - How much memory (in MBs) you want to allow the VM. `4096` (or ~4GB) should be the absolute minimum. Typically you want to use half of your computer's total memory.
- `--virtualbox-disk-size` - The maximum size (in MBs) allowed for the VM's disk size. `30000` (or ~30GB) is a good choice (you generally don't want to go below that).

With those values chosen, modify then run the following command...

```bash
docker-machine create -d virtualbox \
    --virtualbox-boot2docker-url=https://github.com/boot2docker/boot2docker/releases/download/v1.12.5/boot2docker.iso \
    --virtualbox-memory "4096" \
    --virtualbox-disk-size "30000" \
    default
```

### Step 3. Enabling NFS

By default, your `/Users/` folders is shared between your host and the VM. This enables you to seamlessly run Docker containers in the VM and still have access to your usual files. To over come those previously mentioned file system issues, we'll enhance those shared folders with [NFS](http://www.careerride.com/Linux-NFS.aspx), a high performance network file sharing system.
In order to use NFS on your freshly created VM, you'll need to install a 3rd party tool, called [`docker-machine-nfs`](https://github.com/adlogix/docker-machine-nfs).

You have two installation options, either curl or via brew. Your choice.

```bash
curl https://raw.githubusercontent.com/adlogix/docker-machine-nfs/master/docker-machine-nfs.sh | sudo tee /usr/local/bin/docker-machine-nfs > /dev/null && \
    sudo chmod +x /usr/local/bin/docker-machine-nfs
```

or

```bash
brew install docker-machine-nfs
```

Next, we'll enabled NFS by running the following command. As before, modify the command below according to your setup.

- `--shared-folder` - You want to set this to the absolute path of your development folder. If possible, limit this to just where your code lives. This will result in significantly higher performance, as less files need to be watched and synced to the VM.

With the folder chosen, modify then run the following command...

```bash
docker-machine-nfs default \
    --mount-opts="noacl,async,nolock,vers=3,udp,noatime,actimeo=2" \
    --shared-folder="/Users/cameronmaske/Development/repos"
```

The `mount-opts` settings ensure any watch file changes play nicely with any front end builders (i.e. gulp, grunt or webpack).

### Step 4. Start the VM.

In order to run docker, you'll need to do two things.

- Start the VM.
- Set the env to your local terminal.

This is accomplished by the following commands...

```bash
$ docker-machine start default
$ eval $(docker-machine env default)
```

I use ZSH as my shell. My normal workflow involves running an alias command [`dm-up`](https://github.com/cameronmaske/dotfiles/blob/61f5657b71ef3f05337dcfe5fa604bcb535238c7/.zsh/functions#L170), which boots the VM and set the resulting environment variables. Any other terminals opened check if the [VM is running](https://github.com/cameronmaske/dotfiles/blob/61f5657b71ef3f05337dcfe5fa604bcb535238c7/.zsh/functions#L162) and if so set the environment variables automatically.

[ZSH functions](https://github.com/cameronmaske/dotfiles/blob/61f5657b71ef3f05337dcfe5fa604bcb535238c7/.zsh/functions#L160).

```bash
### Docker Machine ###
# Check if `default` is running, if so, set env.
if [ $(docker-machine status default) = "Running" ]; then
    eval $(docker-machine env default);
fi;

function dm-up() {
    docker-machine start default;
    eval (docker-machine env default);
}

function dm-stop() {
    docker-machine stop default;
}
```

### Step 5. Setting up `localdocker`.

With the VM running, run `docker-machine ip default` and note down the IP (mine is `192.168.99.100`).
For convenience, I like to setup the host alias `localdocker` to use instead of the IP.

Open `/etc/hosts` with your terminal of choice (will need sudo access).

Add the following line.

```
192.168.99.100 localdocker
```

### Congratulations!

You've done it! You are now running Docker on OSX.
As a quick check run `docker ps` to verify everything is working. You should see the following.

### Benchmarks.

On my 8GB 2013 Macbook Air, I benchmarked the file system's performance of this approach vs Docker for Mac.

I started with a control test of a native non-shared volume in a container.

```bash
$ docker run --rm -it -w /tmp/ alpine /bin/sh
$ time dd if=/dev/zero of=speedtest bs=1024 count=100000
100000+0 records in
100000+0 records out
real    0m 0.24s
user    0m 0.01s
sys 0m 0.22s
```

Then with a shared volume test with Docker Machine and NFS enabled (~10x slower than native).

```bash
$ docker run --rm -it -v $PWD:$PWD -w $PWD alpine /bin/sh
$ time dd if=/dev/zero of=speedtest bs=1024 count=100000
100000
100000+0 records in
100000+0 records out
real    0m 2.36s
user    0m 0.00s
sys 0m 0.18s
```

Then a shared volume test with Docker For Mac (~190x slower than native).

```bash
$ docker run --rm -it -v $PWD:$PWD -w $PWD alpine /bin/sh
$ time dd if=/dev/zero of=speedtest bs=1024 count=100000
100000+0 records in
100000+0 records out
real    0m 45.11s
user    0m 0.19s
sys 0m 1.91s
```

There is still room for improvement, as we aren't at native file system performance yet, but the result is still usable.

### Conclusion

Hopefully soon, this post will be outdated and Docker for Mac file system issues will be resolved. Until then, this setup works for my development needs.

How do you run Docker on OSX? Do you have a better setup than what I've outlined above?
If so, I love to hear from you. Let me know in the comments or by tweeting at [me](https://twitter.com/cameronmaske).

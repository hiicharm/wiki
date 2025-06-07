---
title:  Setup VPS for Production 
description: Guide on setting up a vps server for deployment
---

## Do You Really Need One?
Before you go down this route, ask yourself, why? You have free static site hosting on GitHub pages, Cloudflare is also another popular option, and Vercel provides one-click free tier hosting for your Next.js app.
There are shared hosting options available that are much cheaper and easier to configure and manage.

**My Reasons**  

I decided to deploy my app on a VPS simply because I thought it was cool. The first time I had to actually deploy an app...not very long before the time of writing this app, I was gonna go for EC2 but I stumbled upon Lightsail's first 90 days free vps plan. I grabbed it.
At one point I was really frustrated when deploying because nothing would seem to work even in the third try. So I decided to deploy on Vercel to see if it was my code or my server config and man it was so easy, all it took was providing my repo and I had the app running. But it felt too easy, almost cheating. I wanted to do it the engineers' way(if there is any term like that?). Something that would feel real and not magic, something that would make me feel in control of things.

## Selecting A VPS

If you know why you are doing it please keep it in your mind, you might need it later!
There are multiple things to consider when selecting a VPS provider:   
- Cost
- Location
- Server Specs
- Bandwidth
- Support?

**Cost**  
If you want something to play with and learn things at little to no cost, you can try Oracle's free tier, it's pretty generous with memory but has ARM-based processors.
Some of the cheapest VPS providers are based in the EU.  
Hetzner is one popular choice, among many.  
[Resource](https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vRo18xg-h2y_H_1ytnCVTO-EEmLr_N7wTrj9BZ11kU_hVSqwZ4tGkMnJCAdnZEJz6MyqmQZHJHAQKBK/pubhtml?pli=1)  
[Resource](https://github.com/dalisoft/awesome-hosting) 

**Location**  
Probably pick a provider that has servers based around where most of your targeted users are gonna be

**Server Specs**  
Things to consider in a server:

- CPU   
1 vCPU = basic tasks  
2-4 vCPU = better concurrency  

Another factor is the CPU model, though most providers don't provide this info, you can always google!

- Memory  
1GB = light apps
2GB = docker/full-stack apps(this is what qtstream.in is deployed on)  

- Storage  
You'll have to pay more for SSDs but you'll also get better speeds, learn to decide your tradeoffs

- OS  
I'll be assuming you have a Ubuntu server, for simplicity of commands in this guide

## Initial Setup  

Some VPS providers do not really need these steps. Most of the stuff is pre configured but anyways..  

**Update** 

```
apt upgrade && apt update -y
```

**Create Non Root User** 

```
adduser charm #create user
usermod -aG sudo charm #add user to sudoers group
```


**Generate SSH Keys**  

```
ssh-keygen -t ed25519  #generate a new key pair
ssh-copy-id charm@server-ip
```


**Disable Root Login**  

```
sudo vi /etc/ssh/sshd_config
```

change the following  

```
PermitRootLogin no
PasswordAuthentication no
```

## Software Setup
If you got yourself a VPS, SSH into it and install the following:
  - neovim  -- editor
  - tmux -- session management
  - nginx -- server
  - ufw -- firewall
  - docker -- containerisation(optional)

```
sudo apt install neovim tmux nginx ufw -y
```

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
#you might not need docker-buildx-plugin and docker-compose-plugin
```

**UFW Setup**  

```
ufw allow OpenSSH
ufw allow http
ufw allow https
ufw enable
```


These are the defaults and keymaps I'm habitual to when working so...
  ```
  mkdir .config
  cd .config 
  git clone https://github.com/hiicharm/vpsconf .
  mv .bash_aliases ~/
  bash
  ```

## ToDo
- [ ] SSH
- [ ] Nginx
- [ ] Single Script


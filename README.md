# discord-join-roles
Automate the adding of roles to people who join the server, while respecting member gating.

## 👋 Getting Started

### Setup
You must provide the following ENV variables, preferably in a .env file
```ts
JOIN_ROLE_IDS: string[]; // e.x. 801579353070370837,801508563910393935,801508082274271262
GUILD_ID: string;
DISCORD_TOKEN: string;
```

### Deploying
You can either deploy this project manually using the following steps:
```console
foo@bar:~$ git clone https://github.com/ThinkFiveable/discord-join-roles.git djr    
foo@bar:~$ cd djr  
foo@bar:~$ npm install  
foo@bar:~$ npm run build  
// fill in env variables  
foo@bar:~$ node dist/index.js  
```

You can also make use of the docker/docker-compose files included with the project. To do this, all you have to do is fill out the .env variables, and then do `docker-compose up -d --build`.

### Contributing
Please follow the [Fiveable Open Source Contributing Guide](https://github.com/ThinkFiveable/open/blob/main/CONTRIBUTING.md)

## ⚖️ License

```
MIT License

Copyright (c) 2021 Connor Snow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
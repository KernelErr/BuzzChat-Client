# BuzzChat-Client
BuzzChat Client是一款基于Electron的开源聊天室客户端，依赖于BuzzChat Server。

## 程序简介
本程序主体是基于Javascript编写，界面实现是HTML语言，主要使用了[Electron](https://electronjs.org/ "Electron")搭建应用。因为初学了Photoshop、Node.js以及HTML，想巩固一下自己的能力，于是写出了这个应用。
软件作者是北邮大一新生Kevin Li，Twitter主页是[@ChinaKevinLi](https://twitter.com/ChinaKevinLi "@ChinaKevinLi")。

## 使用说明
从GitHub下载源码后，你需要在电脑上安装Node.js，并支持npm。首先需要安装依赖，切换到源码根目录下运行：
```bash
npm install
```
此时会安装所需要的依赖。
依赖安装完成后，请打开src/main.js文件，修改serveraddress的值为socket.io服务端的地址如：http://localhost:3001/ 。
最后只需要运行：
```bash
npm start
```
或者
```bash
electron .
```
即可运行。

## 开源协议
本程序完全按照Apache 2.0协议开源，基于本程序开发请遵循协议，并标明我的名字和所属学校。
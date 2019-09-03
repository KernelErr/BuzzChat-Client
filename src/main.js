const { app, BrowserWindow, Notification, Menu, ipcMain } = require('electron')
const crypto = require('crypto');
let mainWindow
let WelcomeWindow
let ChatWindow

var nickname = "";
var chatroomname = "";
var key = "";
var serveraddress = "";

function createWelcomeWindow () {
  WelcomeWindow = new BrowserWindow({
    width: 850,
    height: 550,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    resizable: false
  })
  WelcomeWindow.loadFile('./resource/html/welcome.html')
  mainWindow = WelcomeWindow
  WelcomeWindow.on('close', function () {
    if (nickname != "") {
      createChatWindow ();
    } else {

    }
  })
}

function createChatWindow () {
  ChatWindow = new BrowserWindow({
    width: 850,
    height: 550,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false
  });
  ChatWindow.loadFile('./resource/html/chat.html');
  mainWindow = ChatWindow
  ChatWindow.on('closed', function () {
    mainWindow = null;
  });
  Menu.setApplicationMenu(null);
}

app.on('ready', function(){
  //createWelcomeWindow();
  createWelcomeWindow()
}
)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWelcomeWindow()
  }
})

ipcMain.on('changenickname', (event, arg) => {
  nickname=arg;
})

ipcMain.on('changekey', (event, arg) => {
  key=arg;
})

ipcMain.on('getnickname', (event, arg) => {
  event.returnValue = nickname;
})

ipcMain.on('getkey', (event, arg) => {
  event.returnValue = key;
})

ipcMain.on('getserveraddress', (event, arg) => {
  event.returnValue = serveraddress;
})

ipcMain.on('changenchatroomname', (event, arg) => {
  chatroomname=arg;
})

ipcMain.on('encrypt', (event, arg) => {
  try {
    var encipher = crypto.createCipheriv('aes-256-ecb', key, null);
    encipher.setAutoPadding(true);
    var msg = encipher.update(arg ,'utf8','base64');
    msg += encipher.final('base64');
  } catch (e) {
    const crypterrornotificationcontent = {
      title: '聊天室',
      body: '加密出现错误，程序即将退出。'
    };
    const crypterrornotification = new Notification(crypterrornotificationcontent);
    crypterrornotification.show();
    setTimeout( function(){
      app.quit();
    }, 2000 );
  } finally {

  }
  event.returnValue = msg;
})

ipcMain.on('decrypt', (event, arg) => {
  try {
    var decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
    decipher.setAutoPadding(true);
    var msg = decipher.update(arg,'base64','utf8');
    msg += decipher.final('utf8');
  } catch (e) {
    const crypterrornotificationcontent = {
      title: '聊天室',
      body: '加密出现错误，程序即将退出。'
    };
    const crypterrornotification = new Notification(crypterrornotificationcontent);
    crypterrornotification.show();
    setTimeout( function(){
      app.quit();
    }, 2000 );
  } finally {

  }
  event.returnValue = msg;
})

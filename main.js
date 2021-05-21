(() => {
  "use strict";
  const fs = require("fs");
  const { app, BrowserWindow } = require("electron");
  // retrieve path to image folder from arguments
  const imageFolder = process.argv[2];
  if (!fs.existsSync(imageFolder)) {
    console.error(`Path "${imageFolder}" does not exist`);
    process.exit(1);
  }
  const windowStyle = {
    fullscreen: {
      alwaysOnTop: true,
      fullscreen: true,
      frame: false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
    },
    test: {
      width: 960 + 14,
      height: 540 + 7,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
    },
  };
  app.on("ready", () => {
    let win = new BrowserWindow(windowStyle.fullscreen);
    win.loadURL(`file:///${__dirname}/index.html?imageFolder=${imageFolder}`);
    win.on("closed", () => {
      win = null;
    });
  });
})();

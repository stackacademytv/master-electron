// Modules
const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const windowStateKeeper = require('electron-window-state')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  // Win state keeper

  // let state = windowStateKeeper({
  //   defaultWidth: 1000, defaultHeight: 800
  // })

  mainWindow = new BrowserWindow({
    // x: state.x, y: state.y,
    // width: state.width, height: state.height,
    // minWidth: 350, maxWidth: 1200, minHeight:300,
    width: 1000, height: 800,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      devTools: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')

  // // Manage new window state
  // state.manage(mainWindow)

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(mainMenu)
  
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

let mainMenu = new Menu()

let fileMenu = new MenuItem(
  { 
    label: 'File',
    submenu: [
      // add shortcuts later
      {label: 'Open File'},
      {label: 'Open Folder'},
      {label: 'Open Recent'},
      {label: 'Save'},
      {label: 'Save As'},
      {label: 'Close Folder'},
      {label: 'Close Editor'},
    ]
  }
)

let editMenu = new MenuItem(
  { 
    label: 'Edit',
    submenu: [
      // add shortcuts later
      {label: 'Undo'}, // might not be necessary
      {label: 'Redo'},
      {label: 'Cut'},
      {label: 'Copy'},
      {label: 'Paste'},
      {label: 'Find'}
    ]
  }
)

let viewMenu = new MenuItem(
  { 
    label: 'View',
    submenu: [
      // add shortcuts later
      {label: 'Search File'},
      {label: 'Expand Editor'},
      {label: 'Expand Terminal'},
      {label: 'Close File Panel'}
    ]
  }
)

let terminalMenu = new MenuItem(
  { 
    label: 'Terminal',
    submenu: [
      // add shortcuts later
      {label: 'New Terminal'},
      {label: 'Split Terminal'},
      {label: 'Run Task'}
    ]
  }
)

mainMenu.append(fileMenu)
mainMenu.append(editMenu)
mainMenu.append(viewMenu)
mainMenu.append(terminalMenu)

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
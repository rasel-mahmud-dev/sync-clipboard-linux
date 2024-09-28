import path from 'path'
import {app, BrowserWindow, clipboard, Tray, Menu, ipcMain} from 'electron'
import os from "os";
import {clipboardWatcher} from './ClipboardListener'
import watchFirestore from "./watchFirestore";
import { doc, setDoc} from "firebase/firestore";
import db from "../src/firebaseConfig";


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let tray = null;
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public')

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | null


function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
        },
        // frame: false
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        win.webContents.openDevTools()
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }

    // const menu = Menu.buildFromTemplate(createMenuTemplate());
    // Menu.setApp licationMenu(menu);
    // win.setMenu(null)
    // Menu.setApplicationMenu(null);


    // Handle the close event to minimize the app to tray instead of quitting
    win.on('close', (event) => {
        // if (!app.isQuiting) {
        //     event.preventDefault();
        //     win.hide(); // Hide the window
        // }
        win.close()
    });

    let watcher;

    ipcMain.handle('authenticated', async (event, auth) => {
        if (auth?.deviceId) {
            console.log("start watching...", auth?.deviceId)

            watcher = clipboardWatcher({
                watchDelay: 2000,
                onTextChange: (newText: string) => {
                    win.webContents.send('clipboard-text-change', newText);
                },
                onImageChange: (newImage: string) => {
                    win.webContents.send('clipboard-image-change', newImage);
                },
            });

            watchFirestore(auth?.deviceId, db, win)
        }
    });

    ipcMain.on('minimize-window', () => win.minimize());
    ipcMain.on('maximize-window', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    ipcMain.on('close-window', () => win.close());

    ipcMain.handle('get-system-info', () => {
        return {
            os: `${os.platform()} ${os.release()}`,
            memory: Math.round(os.totalmem() / (1024 * 1024 * 1024)), // Convert bytes to GB
            cores: os.cpus().length,
        };
    });

    ipcMain.handle('send-clip-firestore', async (event, data) => {
        const id = Date.now().toString()
        const docRef = doc(db, "clips", id);
        await setDoc(docRef, data);
        console.log("store in firstore..")
        return ""
    });

    ipcMain.handle('clipboard-stop', () => {
        watcher?.stop()
    });
}


app.on('window-all-closed', () => {
    // Don't quit the app, just hide it when all windows are closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(() => {
    createWindow();
    tray = new Tray(path.join(process.env.VITE_PUBLIC, 'copy.png')); // Add your tray icon here
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: () => {
                win.show(); // Restore window when clicked
            }
        },
        {
            label: 'Quit', click: () => {
                // app?.isQuiting = true;
                app.quit(); // Quit the app
            }
        }
    ]);

    tray.setToolTip('Your App Name');
    tray.setContextMenu(contextMenu);

    // Show the window when the tray icon is clicked
    tray.on('click', () => {
        win.show();
    });
});


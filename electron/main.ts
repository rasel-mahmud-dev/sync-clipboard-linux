import path from 'path'
import {app, BrowserWindow, clipboard, Tray, Menu} from 'electron'


const {collection, getDocs, query, queryBy, by, orderBy, onSnapshot} = require('firebase/firestore');
const db = require("../src/firebaseConfig")

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let tray = null; // To hold the tray instance
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

    // Handle the close event to minimize the app to tray instead of quitting
    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide(); // Hide the window
        }
    });
}


const messagesRef = collection(db, "clips");
const queryMessages = query(messagesRef, orderBy("timestamp"));

onSnapshot(queryMessages, (snapshot) => {
    let documents = snapshot.docChanges();

    documents.forEach((change, index) => {
        if (change.type === "added" && documents.length === index + 1) {
            const data = change.doc.data();
            clipboard.writeText(data.content);
            console.log("Content copied to clipboard:", data.content);

        }
    });
});


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
                app.isQuiting = true;
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


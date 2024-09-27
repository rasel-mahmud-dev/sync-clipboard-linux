function createMenuTemplate() {
    return [
        {
            label: 'File',
            submenu: [
                { label: 'New File', click() { console.log('New File clicked'); } },
                { label: 'Open File', click() { console.log('Open File clicked'); } },
                { type: 'separator' },
                { label: 'Exit', role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Undo', role: 'undo' },
                { label: 'Redo', role: 'redo' },
                { type: 'separator' },
                { label: 'Cut', role: 'cut' },
                { label: 'Copy', role: 'copy' },
                { label: 'Paste', role: 'paste' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { label: 'Reload', role: 'reload' },
                { label: 'Toggle Developer Tools', role: 'toggleDevTools' },
                { type: 'separator' },
                { label: 'Actual Size', role: 'resetZoom' },
                { label: 'Zoom In', role: 'zoomIn' },
                { label: 'Zoom Out', role: 'zoomOut' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                { label: 'Learn More', click() { console.log('Learn More clicked'); } }
            ]
        }
    ];
}

export default createMenuTemplate

import './style.css'
import React from "react";
import ReactDOM from 'react-dom/client'
import Counter from './Counter'


ReactDOM.createRoot(document.getElementById('app')).render(<Counter />)

// Remove Preload scripts loading
postMessage({payload: 'removeLoading'}, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})

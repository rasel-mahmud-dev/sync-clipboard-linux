import React from 'react';
import './App.scss';

function ActionBar() {

    const minimizeWindow = () => {
        window.electron.minimizeWindow();
    };

    const maximizeWindow = () => {
        window.electron.maximizeWindow();
    };

    const closeWindow = () => {
        console.log(window)
        window.electron.closeWindow();
    };

    return (
        <div className="App">
            <div className="title-bar">
                <button className="window-control" onClick={minimizeWindow}>_</button>
                <button className="window-control" onClick={maximizeWindow}>[]</button>
                <button className="window-control" onClick={closeWindow}>X</button>
            </div>
            <h1>Frameless Electron App with React</h1>
        </div>
    );
}

export default ActionBar;

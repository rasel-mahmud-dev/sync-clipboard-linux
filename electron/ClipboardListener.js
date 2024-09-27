const { clipboard } = require("electron");

export function clipboardWatcher({
                                     watchDelay = 1000,
                                     onImageChange,
                                     onTextChange,
                                 }) {
    let lastText = clipboard.readText();
    let lastImage = clipboard.readImage();

    const intervalId = setInterval(() => {
        const text = clipboard.readText();
        const image = clipboard.readImage();

        if (onImageChange && imageHasDiff(image, lastImage)) {
            lastImage = image;
            onImageChange(image);
        }

        if (onTextChange && textHasDiff(text, lastText)) {
            lastText = text;
            onTextChange(text);
        }
    }, watchDelay);

    return {
        stop: () => clearInterval(intervalId),
    };
}

function imageHasDiff(a, b) {
    // Check if either image is empty to avoid unnecessary comparison
    if (a.isEmpty() || b.isEmpty()) {
        return !a.isEmpty() || !b.isEmpty(); // Return true if one of them is not empty
    }

    return a.toDataURL() !== b.toDataURL();
}

function textHasDiff(a, b) {
    return a !== b; // Return true if the texts are different
}

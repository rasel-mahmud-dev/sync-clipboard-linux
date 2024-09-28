import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

function watchFirestore(deviceId: string, db: any, win: any) {
    const messagesRef = collection(db, "clips");
    const queryMessages = query(
        messagesRef,
        where("receiverIds", "array-contains", deviceId),
        orderBy("timestamp")
    );

    console.log("Watching Firestore for deviceId:", deviceId); // Add this log
    onSnapshot(queryMessages, (snapshot) => {
        console.log("Received Firestore snapshot"); // Add this log
        let documents = snapshot.docChanges();
        console.log("Number of document changes:", documents.length); // Add this log

        documents.forEach((change, index) => {
            console.log("Change detected:", change.type, change.doc.data()); // Add this log

            win.webContents.send('emit::firestore', change);

            if (change.type === "added" && documents.length === index + 1) {
                const data = change.doc.data();
                console.log(data);
                // clipboard.writeText(data.content);
                console.log("Content copied to clipboard:", data.content);
            }
        });
    });
}

export default watchFirestore

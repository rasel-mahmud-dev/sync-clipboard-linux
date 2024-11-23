import {initializeApp} from 'firebase/app';
import {collection, getFirestore, onSnapshot, query} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLGSwitD1ESeLT12Ffcp52ETJLXNsjvd8",
    authDomain: "rs-app-97456.firebaseapp.com",
    projectId: "rs-app-97456",
    storageBucket: "rs-app-97456.appspot.com",
    messagingSenderId: "330026526849",
    appId: "1:330026526849:web:f95e14cf6469009a7ec580",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


export function watchRemoteClipboard(db) {

    const messagesRef = collection(db, "clips");
    const queryMessages = query(
        messagesRef,
        // where("receiverIds", "array-contains", deviceId),
        // orderBy("timestamp")
    );

    onSnapshot(queryMessages, (snapshot) => {
        console.log("Received Firestore snapshot"); // Add this log
        let documents = snapshot.docChanges();
        console.log("Number of document changes:", documents.length); // Add this log

        documents.forEach((change, index) => {
            console.log("Change detected:", change.type, change.doc.data()); // Add this log
            if (change.type === "added" && documents.length === index + 1) {
                const data = change.doc.data();
                console.log(data);
                // clipboard.writeText(data.content);
                console.log("Content copied to clipboard:", data.content);
            }
        });
    });

}

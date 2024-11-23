
import {QWidget, QBoxLayout, QLabel, Direction} from '@nodegui/nodegui';
import { collection, getDocs } from "firebase/firestore";
import { createClipItem } from "./ClipItem";
import {db} from "../firebase/init";

export function createClipList(): QWidget {
    const clipListPage = new QWidget();
    const layout = new QBoxLayout(Direction.TopToBottom);
    clipListPage.setLayout(layout);


    const header = new QLabel();
    header.setText("Clips List");
    header.setInlineStyle(`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  `);

    const statusLabel = new QLabel();
    statusLabel.setText("Fetching clips...");
    statusLabel.setInlineStyle(`
    font-size: 14px;
    color: gray;
    margin-bottom: 10px;
  `);

    layout.addWidget(header);
    layout.addWidget(statusLabel);

    // Fetch clips from Firestore
    async function fetchClips() {
        try {

            const clipItem = new QWidget();
            // console.log(layout.addWidget, "layout.addWidget")

            const layout3 = new QBoxLayout(Direction.LeftToRight);

            const idLabel = new QLabel();
            idLabel.setText(`ID: 23423423432}`);

            layout3.addWidget(idLabel);

            clipItem.setLayout(layout3);

            layout.addWidget(clipItem)

            // const clipsRef = collection(db, "clips");
            // const snapshot = await getDocs(clipsRef);

            // if (snapshot.empty) {
            //     statusLabel.setText("No clips found.");
            //     return;
            // }

            // snapshot.forEach((doc) => {
            //     // const clipItem = createClipItem(doc.id, doc.data());
            //     // layout.addWidget(clipItem);
            //     const clipItem = new QWidget();
            //     // console.log(layout.addWidget, "layout.addWidget")
            //     layout.addWidget(clipItem)
            // });
            //
            // statusLabel.setText(""); // Clear the status once items are loaded
        } catch (error) {
            console.error("Error fetching clips:", error);
            // statusLabel.setText("Error fetching clips. Check the console.");
        }
    }

    // Load clips when the page is created
    fetchClips();

    return clipListPage;
}

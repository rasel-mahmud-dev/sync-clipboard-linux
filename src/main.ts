import {
  QMainWindow,
  QWidget,
  QLabel,
  QPushButton,
  QIcon,
  QBoxLayout,
  Direction,
  QGroupBox,
  QApplication
} from '@nodegui/nodegui';
import { collection, onSnapshot, orderBy, getDocs, query, where } from "firebase/firestore";

import * as path from "node:path";
import sourceMapSupport from 'source-map-support';
import {db, watchRemoteClipboard} from "./firebase/init"
import {createClipList} from "./components/ClipList";
import {createGridLayout} from "./components/HomeGridLayout";

sourceMapSupport.install();

function main(): void {


  const win = new QMainWindow();
  win.resize(600, 600); // Resize the window
  win.setWindowTitle("Navigation Grid");

  const layout = new QBoxLayout(0); // Using QBoxLayout with vertical direction
  const centralWidget = createGridLayout();
  layout.addWidget(centralWidget);

  // Create a central QWidget for the main window and set the layout
  const widget = new QWidget();
  widget.setLayout(layout);
  win.setCentralWidget(widget);



  // // Add a button to interact with clipboard
  // const clipboardButton = new QPushButton();
  // clipboardButton.setText("Copy to Clipboard");
  //
  // const clipboard = QApplication.clipboard()
  //
  // clipboard.addEventListener("changed", function (data){
  //   const clipboardText = clipboard.text();
  //   // console.log('Text ddddddddd:', clipboardText);
  //
  // })

  //
  // clipboardButton.addEventListener('clicked', () => {
  //   const text = "This is copied to clipboard!";
  //   clipboard.setText(text);  // Set text to clipboard
  //   console.log('Text copied to clipboard:', text);
  // });
  //
  // // Another button to read from clipboard
  // const readClipboardButton = new QPushButton();
  // readClipboardButton.setText("Read from Clipboard");

  // readClipboardButton.addEventListener('clicked', () => {
  //   const clipboardText = clipboard.text();
  //   console.log('Text read from clipboard:', clipboardText);
  //   label2.setText(`Clipboard says: ${clipboardText}`);
  // });
  //
  // button.addEventListener('clicked', async () => {
  //   // try {
  //   //   // Reference to the "clips" collection
  //   //   const collectionRef = collection(db, "clips");
  //   //
  //   //   // Fetch all documents in the collection
  //   //   const snapshot = await getDocs(collectionRef);
  //   //
  //   //   if (snapshot.empty) {
  //   //     console.log("No documents found in the collection.");
  //   //     return;
  //   //   }
  //   //   // Iterate through all documents
  //   //   snapshot.forEach((doc) => {
  //   //     console.log(`Document ID: ${doc.id}`);
  //   //     console.log("Document Data:", doc.data());
  //   //   });
  //   // } catch (error) {
  //   //   console.error("Error retrieving documents:", error);
  //   // }
  // });

  // rootLayout.addWidget(label);
  // rootLayout.addWidget(button);
  // rootLayout.addWidget(clipboardButton);
  // rootLayout.addWidget(readClipboardButton);
  // rootLayout.addWidget(label2);

  // const clipListPage = createClipList();
  // win.setCentralWidget(clipListPage);

  // win.setCentralWidget(centralWidget);
  // win.setStyleSheet(
  //     `
  //   #myroot {
  //     background-color: #009688;
  //     height: '100%';
  //     align-items: 'center';
  //     justify-content: 'center';
  //   }
  //   #mylabel {
  //     font-size: 16px;
  //     font-weight: bold;
  //     padding: 1;
  //   }
  // `
  // );

  win.show();
  win.setFocus();

  // watchRemoteClipboard(db);


  (global as any).win = win;
}

main();

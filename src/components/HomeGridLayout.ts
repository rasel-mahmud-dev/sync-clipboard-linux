import {QGridLayout, QLabel, QWidget} from "@nodegui/nodegui";

// Example navigation data
const navigation = [
    {id: "234", name: "Home", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #FF5733, stop:1 #FFBD33);"},
    {id: "234dfsdf", name: "MMM", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #33FF57, stop:1 #33FFBD);"},
    {id: "123", name: "App", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #3357FF, stop:1 #33BDFF);"},
    {id: "1234", name: "Clip", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #FF33A1, stop:1 #FF33D4);"},
    {id: "1235", name: "Configuration", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #A133FF, stop:1 #D433FF);"},
    {id: "1236", name: "About", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #33FFF7, stop:1 #33A1FF);"},
    {id: "1237", name: "Setting", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #FF5733, stop:1 #C70039);"},
    {id: "1238", name: "Login", icon: "", gradient: "background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #FF33A1, stop:1 #FFB233);"},
];

// Function to create the grid layout with 2 rows and 4 columns
function createGridLayout() {
    const gridLayout = new QGridLayout();
    let row = 0;
    let col = 0;

    // Remove the default spacing between the items (both rows and columns)
    gridLayout.setHorizontalSpacing(5); // No horizontal space
    gridLayout.setVerticalSpacing(5); // No vertical space

    // Loop through the navigation items and create labels for each
    for (let item of navigation) {
        const label = new QLabel();
        label.setText(item.name);
        label.setObjectName(`nav-${item.id}`);

        // Set background gradient using the custom gradient value from the navigation array
        label.setStyleSheet(`
            ${item.gradient} /* Apply the gradient */
            color: white; /* White text for contrast */
            padding: 3px;
            border-radius: 5px;
            text-align: center; /* Center the text */         
        `);

        // Add the label to the grid layout (2 rows, 4 columns)
        gridLayout.addWidget(label, row, col);

        // Move to the next column; if we exceed 4 columns, move to the next row
        col++;
        if (col > 1) {
            col = 0;
            row++;
        }
    }

    const centralWidget = new QWidget();
    centralWidget.setLayout(gridLayout); // Apply the grid layout to the central widget
    centralWidget.setMaximumSize(450, 300); // Set th
    return centralWidget
}

export { createGridLayout };

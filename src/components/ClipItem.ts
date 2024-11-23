
import { QWidget, QLabel, QBoxLayout, Direction } from '@nodegui/nodegui';

export function createClipItem(id: string, data: Record<string, any>): QWidget {
    const clipItem = new QWidget();
    const layout = new QBoxLayout(Direction.LeftToRight);

    const idLabel = new QLabel();
    idLabel.setText(`ID: ${id}`);
    idLabel.setInlineStyle(`
    font-size: 12px;
    color: gray;
    margin-right: 10px;
  `);

    const dataLabel = new QLabel();
    dataLabel.setText(`Data: ${JSON.stringify(data)}`);
    dataLabel.setInlineStyle(`
    font-size: 14px;
    color: black;
  `);

    layout.addWidget(idLabel);
    layout.addWidget(dataLabel);

    clipItem.setLayout(layout);

    return clipItem;
}

import React from 'react';
import './GridView.css'; // Assuming you have a CSS file for styles
import Collapsible from 'react-collapsible';


const GridView = () => {
  const data_new = [
    {
      group: {
        name: 'Group 1', content: [
          { key: { name: 'Group1 - Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1.1', 'Value1.1.2', 'Value1.1.3'] },
          { key: { name: 'Group1 - Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.2.1', 'Value1.2.2', 'Value1.2.3'] },
          { key: { name: 'Group1 - Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.3.1', 'Value1.3.2', 'Value1.3.3'] },
          { key: { name: 'Group1 - Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1.1', 'Value1.1.2', 'Value1.1.3'] },
          { key: { name: 'Group1 - Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.2.1', 'Value1.2.2', 'Value1.2.3'] },
          { key: { name: 'Group1 - Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.3.1', 'Value1.3.2', 'Value1.3.3'] },
          { key: { name: 'Group1 - Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1.1', 'Value1.1.2', 'Value1.1.3'] },
          { key: { name: 'Group1 - Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.2.1', 'Value1.2.2', 'Value1.2.3'] },
          { key: { name: 'Group1 - Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.3.1', 'Value1.3.2', 'Value1.3.3'] },
          { key: { name: 'Group1 - Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1.1', 'Value1.1.2', 'Value1.1.3'] },
          { key: { name: 'Group1 - Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.2.1', 'Value1.2.2', 'Value1.2.3'] },
          { key: { name: 'Group1 - Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.3.1', 'Value1.3.2', 'Value1.3.3'] }
        ]
      },
    },
    {
      group: {
        name: 'Group 2', content: [
          { key: { name: 'Group2 - Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.1.1', 'Value2.1.2', 'Value2.1.3'] },
          { key: { name: 'Group2 - Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.2.1', 'Value2.2.2', 'Value2.2.3'] },
          { key: { name: 'Group2 - Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.3.1', 'Value2.3.2', 'Value2.3.3'] }
        ]
      },
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>At Dispatch</th>
            <th>At Submission</th>
            <th>At Approval/Rejection</th>
          </tr>
        </thead>
      </table>
      {data_new.map((group, index) => (
        <Collapsible key={index} trigger={group.group.name}>
          <table>
            <tbody>
              {group.group.content.map((item, itemIndex) => (
                <tr key={index}>
                  <td>{item.key.name}<br /><div className="description">{item.key.description}</div></td>
                  {item.value.map((val, valIndex) => (
                    <td key={valIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Collapsible>
      ))}
    </div>
  );
};

export default GridView;

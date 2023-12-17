import React from 'react';
import './GridView.css'; // Assuming you have a CSS file for styles


const GridView = () => {
  const data_new = [
    {
      group: {
        name: 'Group 1', content: [
          { key: { name: 'Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1', 'Value1.2', 'Value1.3'] },
          { key: { name: 'Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.1', 'Value2.2', 'Value2.3'] },
          { key: { name: 'Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value3.1', 'Value3.2', 'Value3.3'] }
        ]
      },
    },
    {
      group: {
        name: 'Group 2', content: [
          { key: { name: 'Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1', 'Value1.2', 'Value1.3'] },
          { key: { name: 'Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.1', 'Value2.2', 'Value2.3'] },
          { key: { name: 'Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value3.1', 'Value3.2', 'Value3.3'] }
        ]
      },
    },
  ];

  const data = [
    { key: { name: 'Key1', description: 'Lorem ipsum dolor sit amet' }, value: ['Value1.1', 'Value1.2', 'Value1.3'] },
    { key: { name: 'Key2', description: 'Lorem ipsum dolor sit amet' }, value: ['Value2.1', 'Value2.2', 'Value2.3'] },
    { key: { name: 'Key3', description: 'Lorem ipsum dolor sit amet' }, value: ['Value3.1', 'Value3.2', 'Value3.3'] }

  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Header</th>
          <th>At Dispatch</th>
          <th>At Submission</th>
          <th>At Approval/Rejection</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.key.name}<br /><div className="description">{item.key.description}</div></td>
            {item.value.map((val, valIndex) => (
              <td key={valIndex}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GridView;

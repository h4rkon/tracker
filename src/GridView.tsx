import React, { useState, useEffect } from 'react';
import './GridView.css'; // Assuming you have a CSS file for styles
import Collapsible from 'react-collapsible';
import EditableCell from './EditableCell';

import { getSubmission, updateCell } from './apiService'; // Import the function from apiService
import { Submission, Group, Attribute, Key, SingleValue } from './model';

const GridView = () => {
  const [data, setData] = useState<Group[]>([]); // State to store fetched data

  useEffect(() => {
    const loadData = async () => {
      try {
        const submissionData = await getSubmission();
        setData(submissionData.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
    loadData();
  }, []);

  const handleValueChange = async (
    groupIndex: number,
    itemIndex: number,
    column: 'onDispatch' | 'onSubmission' | 'onApprovalOrDenial',
    newValue: string
  ) => {
    // Update the local state first
    const updatedData = [...data];
    updatedData[groupIndex].content[itemIndex][column].value = newValue;
    setData(updatedData);

    // Then send the update to the server (or in this case, update the cached data)
    try {
        await updateCell(groupIndex, itemIndex, column, newValue);
        console.log('Cell updated successfully');
    } catch (error) {
        console.error('Error updating cell:', error);
        // Optionally, revert the local state update in case of an error
    }
  };

  
  return (
    <div className="table-container">
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
          {data.map((group, groupIndex) => (
            <tr key={groupIndex}>
              <td colSpan={4}>
                <Collapsible trigger={group.name} open={true}>
                  <div className="collapsible-content">
                    <table>
                      <tbody>
                        {group.content.map((item, itemIndex) => (
                          <tr key={`${groupIndex}-${itemIndex}`}>
                            <td>{item.key.name}<br /><div className="description">{item.key.description}</div></td>
                            <td>
                            <EditableCell
                                  value={item.onDispatch.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "onDispatch" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'onDispatch', newValue)} />
                            </td>
                            <td>
                              <EditableCell
                                  value={item.onSubmission.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "onSubmission" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'onSubmission', newValue)} />
                            </td><td>
                              <EditableCell
                                  value={item.onApprovalOrDenial.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "onApprovalOrDenial" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'onApprovalOrDenial', newValue)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Collapsible>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default GridView;

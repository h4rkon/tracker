import React, { useState, useEffect } from 'react';
import './GridView.css'; // Assuming you have a CSS file for styles
import Collapsible from 'react-collapsible';
import EditableCell from './EditableCell';

import { getSubmission, updateCell, updateComment } from './apiService'; // Import the function from apiService
import { Group, ChangeHistory, ValueComment } from './model';

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

  const handleCommentChange = async (
    groupIndex: number,
    itemIndex: number,
    column: 'atDispatch' | 'atSubmission' | 'atOutcome',
    newComment: string
  ) => {
    
    const change: ValueComment = {
      user: "DummyUser",
      datetime: new Date().toLocaleString(),
      comment: newComment
    }

    try {
      await updateComment(groupIndex, itemIndex, column, change);
      console.log('Cell updated successfully');
  } catch (error) {
      console.error('Error updating cell:', error);
      // Optionally, revert the local state update in case of an error
  }
  }

  const handleValueChange = async (
    groupIndex: number,
    itemIndex: number,
    column: 'atDispatch' | 'atSubmission' | 'atOutcome',
    newValue: string
  ) => {
    // Update the local state first
    const updatedData = [...data];
    const attribute = updatedData[groupIndex].content[itemIndex];
    const oldValue = attribute[column].value;

    const change: ChangeHistory = {
      id: 123,
      user: "DummyUser", // Replace with actual user info if available
      datetime: new Date().toLocaleString(),
      oldValue,
      newValue
    };
    attribute[column].history.push(change);

    attribute[column].value = newValue
    setData(updatedData)

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
                                  value={item.atDispatch.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "atDispatch" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'atDispatch', newValue)} 
                                  onCommentChange={(newComment) => 
                                    handleCommentChange(groupIndex, itemIndex, 'atDispatch', newComment)
                                  }
                                  history={item.atDispatch.history}
                                  comments={item.atDispatch.comments}/>
                            </td>
                            <td>
                              <EditableCell
                                  value={item.atSubmission.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "atSubmission" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'atSubmission', newValue)}
                                  onCommentChange={(newComment) => 
                                    handleCommentChange(groupIndex, itemIndex, 'atSubmission', newComment)
                                  }
                                  history={item.atSubmission.history}
                                  comments={item.atSubmission.comments}/>
                            </td><td>
                              <EditableCell
                                  value={item.atOutcome.value}
                                  identifier={{ groupName: group.name, keyName: item.key.name, columnName: "atOutcome" }}
                                  onValueChange={(newValue) => handleValueChange(groupIndex, itemIndex, 'atOutcome', newValue)}
                                  onCommentChange={(newComment) => 
                                    handleCommentChange(groupIndex, itemIndex, 'atOutcome', newComment)
                                  }
                                  history={item.atOutcome.history}
                                  comments={item.atOutcome.comments}/>
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

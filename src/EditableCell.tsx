import { Server } from 'http';
import React, { useState } from 'react';

type EditableCellProps = {
  value: string;
  identifier: {
    groupName: string;
    keyName: string;
    columnName: string;
  };
  onValueChange: (newValue: string, identifier: EditableCellProps["identifier"]) => void;
};

const EditableCell: React.FC<EditableCellProps> = ({ value, identifier, onValueChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onValueChange(inputValue, identifier);
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setInputValue(value); // Revert to the original value
      setIsEditing(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onValueChange(inputValue, identifier);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return isEditing ? (
    <input
      className="editable-cell-input"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      onBlur={handleBlur}
      onFocus={handleFocus}
      autoFocus
    />
  ) : (
    <div onClick={() => setIsEditing(true)} className='editable-cell-div'>{value}</div>
  );
};

export default EditableCell;

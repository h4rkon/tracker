import React, { useState } from 'react';

type EditableCellProps = {
  value: string;
  onValueChange: (newValue: string) => void;
};

const EditableCell: React.FC<EditableCellProps> = ({ value, onValueChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onValueChange(inputValue);
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
      onBlur={handleBlur}
      onFocus={handleFocus}
      autoFocus
    />
  ) : (
    <div onClick={() => setIsEditing(true)} className='editable-cell-div'>{value}</div>
  );
};

export default EditableCell;

import { Server } from 'http';
import React, { useState, useRef } from 'react';
import { ChangeHistory, ValueComment } from './model';
import Collapsible from 'react-collapsible';
import CommentsSection from './CommentsSections';

type EditableCellProps = {
  value: string;
  identifier: {
    groupName: string;
    keyName: string;
    columnName: string;
  };
  onValueChange: (newValue: string, identifier: EditableCellProps["identifier"]) => void;
  onCommentChange: (newComment: string, identifier: EditableCellProps["identifier"]) => void;
  history: ChangeHistory[];
  comments: ValueComment[];
};

const EditableCell: React.FC<EditableCellProps> = ({ value, identifier, onValueChange, onCommentChange, history, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [comment, setComment] = useState('');
  const cellRef = useRef<HTMLDivElement>(null);

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      onCommentChange(comment, identifier);
      setComment('');
      setIsEditing(false);
    }
  };

  const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (cellRef.current && !cellRef.current.contains(event.relatedTarget)) {
      setIsEditing(false);
      onValueChange(inputValue, identifier);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const historyTooltip = history?.map(entry =>
    `${entry.datetime.toLocaleString()}: ${entry.user} changed from "${entry.oldValue}" to "${entry.newValue}"`
  ).join('\n');

  return isEditing ? (
    <div ref={cellRef}>
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
      <input
        className="comment-input"
        type="text"
        value={comment}
        onChange={handleCommentInputChange}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Comment</button>
      <CommentsSection open={true} comments={comments} />
    </div>
  ) : (
    <div
      title={historyTooltip}
      className='editable-cell-div'>
      <div title={historyTooltip} onClick={() => setIsEditing(true)}>{value}</div>
      <CommentsSection open={false} comments={comments} />
    </div>
  );
};

export default EditableCell;

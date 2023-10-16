import React from 'react';

const IndividualMessageComponent = ({ message, user, event, sent }) => {
  const messageStyle = {
    backgroundColor: sent ? '#DCF8C6' : '#EDEDED',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '10px',
    maxWidth: '70%',
    alignSelf: sent ? 'flex-end' : 'flex-start',
  };

  const userStyle = {
    fontWeight: 'bold',
    marginBottom: '6px',
  };

  return (
    <div style={messageStyle}>
      <div style={userStyle}>{user} - {event}</div>
      <div>{message}</div>
    </div>
  );
};

export default IndividualMessageComponent;

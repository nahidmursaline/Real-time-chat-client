import React from 'react';
import classNames from 'classnames';

const Message = ({ user, message, timestamp, currentUser }) => {
  const isCurrentUser = user === currentUser;
  const messageDate = new Date(timestamp);
  const formattedDate = messageDate.toLocaleDateString();
  const formattedTime = messageDate.toLocaleTimeString();

  return (
    <div className={classNames("mb-4 p-4 rounded-lg", {
      "bg-blue-100 self-end": isCurrentUser,
      "bg-gray-100 self-start": !isCurrentUser
    })}>
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          <strong className="mr-2">{user}</strong>
          {isCurrentUser && <span className="text-xs text-blue-600">(You)</span>}
          <span className="ml-auto text-xs text-gray-500">{formattedDate} {formattedTime}</span>
        </div>
        <p className="text-sm">{message}</p>
       
        
      </div>
    </div>
  );
};

export default Message;





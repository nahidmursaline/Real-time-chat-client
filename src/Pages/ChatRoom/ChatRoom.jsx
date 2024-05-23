import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import Message from '../Message/Message';
import { AuthContext } from '../../provider/AuthProvider';

const socket = io('http://localhost:5000');

const ChatRoom = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`http://localhost:5000/rooms/${id}/messages`);
        setMessages(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
      setLoading(false);
    };

    fetchMessages();

    socket.emit('joinRoom', id);
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', id);
      socket.off('newMessage');
    };
  }, [id]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      roomId: id,
      message: newMessage,
      user: user.email
    };

    try {
      await axios.post(`http://localhost:5000/rooms/${id}/messages`, messageData);
      socket.emit('sendMessage', messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat Room</h1>
      {loading ? ( 
        <div className="flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mb-4 p-4 border rounded h-64 overflow-y-scroll">
          {messages.length > 0 ? (
            messages.map((message) => (
              <Message key={message._id} user={message.user} message={message.message} timestamp={message.timestamp} currentUser={user?.email} />
            ))
          ) : (
            <p>No messages yet</p>
          )}
        </div>
      )}
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded mr-2"
        />
        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;


















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const result = await axios.get(
          'https://real-time-chat-server-lemon.vercel.app/rooms'
        );
        setRooms(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'https://real-time-chat-server-lemon.vercel.app/rooms',
        {
          name: newRoomName,
          description: newRoomDescription,
        }
      );
      setRooms((prevRooms) => [...prevRooms, result.data]);
      setNewRoomName('');
      setNewRoomDescription('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center ">
        Chat Rooms Create & List
      </h1>
      <form onSubmit={handleCreateRoom} className="mb-4">
        <div>
          <label className="block font-semibold">Room Name:</label>
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mt-2">
          <label className="block font-semibold">Description:</label>
          <input
            type="text"
            value={newRoomDescription}
            onChange={(e) => setNewRoomDescription(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Create Room
        </button>
      </form>
      <ul className="space-y-2">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <li key={room._id} className="p-2 border rounded hover:bg-gray-200">
              <Link to={`/chatRoom/${room._id}`} className="block">
                {room.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No chat rooms available</p>
        )}
      </ul>
    </div>
  );
};

export default ChatRoomList;

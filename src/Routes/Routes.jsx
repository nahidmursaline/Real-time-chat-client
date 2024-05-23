import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ChatRoom from "../Pages/ChatRoom/ChatRoom";

import ChatRoomList from "../Pages/ChatRoomList/ChatRoomList";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Message from "../Pages/Message/Message";
import SignUp from "../Pages/SignUp/SignUp";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'chatRoom/:id',
            element: <ChatRoom></ChatRoom>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'signup',
            element: <SignUp></SignUp>
        },
        {
          path: 'chatRoomList',
          element: <ChatRoomList></ChatRoomList>
        },
        {
          path: 'message',
          element: <Message></Message>
        },
      
      ]
    },
  ]);
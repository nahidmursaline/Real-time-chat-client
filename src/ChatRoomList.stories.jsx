import React from 'react';
import ChatRoomList from './Pages/ChatRoomList/ChatRoomList';



export default {
  title: 'Components/ChatRoomList',
  component: ChatRoomList,
};

const Template = (args) => <ChatRoomList {...args} />;

export const Default = Template.bind({});
Default.args = {
  
};

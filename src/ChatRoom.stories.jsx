import React from 'react';
import ChatRoom from './Pages/ChatRoom/ChatRoom';


export default {
  title: 'Components/ChatRoom',
  component: ChatRoom,
};

const Template = (args) => <ChatRoom {...args} />;

export const Default = Template.bind({});
Default.args = {
 
};

import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import "./chat.css"
export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <ListGroup variant="flush">
      { conversations.length === 0 ? 
      <div style={{textAlign : 'center' , marginTop : '20px' , fontSize :'30px'}} >You dont any contacts yet :/ </div> :
      conversations.map((conversation, index) => (
        <ListGroup.Item
        
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(', ')}{ "'s family "}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

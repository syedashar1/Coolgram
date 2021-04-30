import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {

  const ListForChat = useSelector((state) => state.ListForChat);
  const { users : users } = ListForChat

  const { contacts } = useContacts()

  return (
    <ListGroup variant="flush">
      {contacts.map(x => (
        <ListGroup.Item key={x._id}>
          {x.name + "'s family " }
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

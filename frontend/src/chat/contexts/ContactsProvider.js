import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  // const [contacts, setContacts] = useLocalStorage('contacts', [])
  const ListForChat = useSelector((state) => state.ListForChat);
  const { users : users } = ListForChat

  // function createContact(id, name) {
  //   setContacts(prevContacts => {
  //     return [...prevContacts, { id, name }]
  //   })
  // }

  return (
    <ContactsContext.Provider value={{ contacts : users  }}>
      {children}
    </ContactsContext.Provider>
  )
}

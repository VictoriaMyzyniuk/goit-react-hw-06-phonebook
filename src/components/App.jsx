// import { useState, useEffect } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/App.styled';

import { useSelector, useDispatch } from 'react-redux';
import { addContacts, updateFilter, deleteContact } from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const { contactsList, filter } = useSelector(state => state.contacts);

  // const [contacts, setContacts] = useState(() => {
  // return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  // });

  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   // localStorage.setItem('contacts', JSON.stringify(contacts));
  //   console.log(contactsState);
  // }, [contactsState]);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const dublicateContact = findDublicateContact(contact, contactsList);
    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : dispatch(addContacts({ ...values, id: nanoid() }));
  };

  const findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  const onFilterChange = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  const getNeeddedCard = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log('contactsList', contactsList);
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteCard = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      {!!contactsList.length && (
        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={onFilterChange} />
        </>
      )}

      <ContactList neddedCards={getNeeddedCard()} deleteCard={deleteCard} />
    </Container>
  );
};

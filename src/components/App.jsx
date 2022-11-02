// import { useState, useEffect } from 'react';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Container } from 'components/App.styled';

import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  updateFilter,
  deleteContact,
  getContactsData,
} from 'redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const { contactsList, filter } = useSelector(getContactsData);

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
      : dispatch(addContact({ ...values, id: nanoid() }));
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

import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormEl,
  InputEl,
  Label,
  SubmitButton,
  Error,
} from 'components/ContactForm/ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContactsData } from 'redux/contactsSlice';
import { nanoid } from 'nanoid';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .min(4)
    .max(10)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const { contactsList } = useSelector(getContactsData);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    const contact = {
      name,
      number,
    };

    const dublicateContact = findDublicateContact(contact, contactsList);
    if (dublicateContact) {
      alert(`${contact.name} is already in contacts`);
    } else {
      dispatch(addContact({ ...values, id: nanoid() }));
      resetForm();
    }
  };

  const findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormEl autoComplete="off">
        <Label htmlFor="name">Name</Label>
        <InputEl type="text" name="name" placeholder="Enter name" />
        <Error name="name" component="div" />

        <Label htmlFor="number">Number</Label>
        <InputEl type="tel" name="number" placeholder="Enter phone number" />
        <Error name="number" component="div" />
        <SubmitButton type="submit">Add contact</SubmitButton>
      </FormEl>
    </Formik>
  );
};

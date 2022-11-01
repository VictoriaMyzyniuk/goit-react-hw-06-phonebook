import { PropTypes } from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormEl,
  InputEl,
  Label,
  SubmitButton,
  Error,
} from 'components/ContactForm/ContactForm.styled';

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

export const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
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

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

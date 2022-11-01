import { PropTypes } from 'prop-types';
import {
  ContactListEl,
  ContactListItem,
  ContactItemHeader,
  ContactItemText,
  ContactItemButton,
} from 'components/ContactList/ContactList.styled';
export const ContactList = ({ neddedCards, deleteCard }) => {
  return (
    <ContactListEl>
      {neddedCards.map(({ name, number, id }) => {
        return (
          <ContactListItem key={id}>
            <ContactItemHeader>{name}</ContactItemHeader>
            <ContactItemText>{number}</ContactItemText>
            <ContactItemButton type="button" onClick={() => deleteCard(id)}>
              Delete
            </ContactItemButton>
          </ContactListItem>
        );
      })}
    </ContactListEl>
  );
};

ContactList.propTypes = {
  neddedCards: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  deleteCard: PropTypes.func.isRequired,
};

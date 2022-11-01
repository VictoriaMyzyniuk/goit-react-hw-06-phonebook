import { PropTypes } from 'prop-types';
import {
  FilterWrapper,
  FilterInput,
  FilterLabel,
} from 'components/Filter/Filter.styled';
export const Filter = ({ value, onFilterChange }) => {
  return (
    <FilterWrapper>
      <FilterLabel htmlFor="text">Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        value={value}
        onChange={onFilterChange}
      />
    </FilterWrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

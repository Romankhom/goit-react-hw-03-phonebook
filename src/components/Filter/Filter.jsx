import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ contacts, value, onChangeFilter }) =>
  contacts.length > 2 && (
    <input
      type="text"
      className={styles.filterContact}
      value={value}
      onChange={onChangeFilter}
      placeholder="Search contact by name"
    />
  );

Filter.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};

export default Filter;

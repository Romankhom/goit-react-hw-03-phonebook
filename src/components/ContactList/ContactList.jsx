import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.listContacts}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.contacts}>
        <span className={styles.nameField}>{name}</span>
        <span className={styles.phoneField}>{number}</span>
        <button
          type="button"
          className={styles.deleteBtn}
          value={id}
          onClick={onDeleteContact}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactList;

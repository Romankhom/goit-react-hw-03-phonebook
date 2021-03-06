import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import styles from "./ContactForm/ContactForm.module.css";
import filterContacts from "../utility/filterContacts";

const uuidv1 = require("uuid/v1");

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
    ],
    filter: ""
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = contact => {
    const newContact = contact.name;
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === newContact)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const contactToAdd = {
        ...contact,
        id: uuidv1()
      };

      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd]
      }));
    }
  };

  deleteContact = e => {
    const id = e.target.value;
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.contactsWrapper}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          contacts={contacts}
          value={filter}
          onChangeFilter={this.changeFilter}
        />
        <ContactList
          id={contacts.id}
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

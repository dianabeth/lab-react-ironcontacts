import React from 'react';
import contacts from './contacts.json';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: contacts.slice(0, 5),
    };
  }

  addRandomContact = () => {
    const unusedContacts = contacts.filter((item) => {
      const contactIsAlreadyPresentOnTheList = this.state.list.includes(item);
      return !contactIsAlreadyPresentOnTheList;
    });
    if (unusedContacts.length) {
      const contact =
        unusedContacts[Math.floor(Math.random() * unusedContacts.length)];

      const list = [...this.state.list, contact];
      this.setState({
        list: list,
      });
    }
  };

  sortByName = () => {
    const list = [...this.state.list];
    list.sort((firstItem, secondItem) => {
      return firstItem.name > secondItem.name ? 1 : -1;
    });
    this.setState({
      list: list,
    });
  };

  sortByPopularity = () => {
    const list = [...this.state.list];
    list.sort((firstItem, secondItem) => {
      return firstItem.popularity > secondItem.popularity ? -1 : 1;
    });
    this.setState({
      list: list,
    });
  };

  handleContactRemoval = (index) => {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list,
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((contact, index) => (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>
                  <button onClick={() => this.handleContactRemoval(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

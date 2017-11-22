import React, { Component } from 'react'
import classes from './App.css'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import uniqid from 'uniqid'

class App extends Component {
  state = {
    persons: [
      { id: uniqid(), name: 'Hampton', age: 24 },
      { id: uniqid(), name: 'Nozomi', age: 26 },
      { id: uniqid(), name: 'IsCool', age: 32 }
    ],
    otherState: 'some other value',
    userName: 'Hampton',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = { ...this.state.persons[personIndex] }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })
  }

  userNamesHandler = (event) => {
    this.setState({
      userName: event.target.value
    })
  }


  deletePersonHandler = (index) => {
    //Always create a copy then update the state with set state do not 
    //mutate the actual state objects
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(index, 1)
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({ showPersons: !doesShow })
  }

  render() {
    let persons = null

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
      )
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </ div>
    )
  }
}

export default App

import {useState,useEffect} from 'react'
import List from './List'
import Form from './Form'
import {} from './styles.css'

function Contacts() {
  
  const [contacts,setContacts] = useState([
    {
      fullname: 'Doğukan',
      phone_number:'51238'
    },
    {
      fullname: 'Ferhat',
      phone_number:'95914'
    },
    {
      fullname: 'Erhan',
      phone_number:'301239'
    }
    ,
    {
      fullname: 'Aliemre',
      phone_number:'049128'
    }

  ])

  useEffect(()=> {
    console.log(contacts)
  },[contacts])

  return (
    <div id='container'>
      <h1>Contacts</h1>
      <List contacts={contacts}/>
      <Form addContact={setContacts} contacts={contacts}/>
    
    </div>
  )
}

export default Contacts
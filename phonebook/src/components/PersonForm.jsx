import React from 'react'

export const PersonForm = ({handler, newContact, setNewContact}) => {
  return (
    <div>
        <form onSubmit={handler}>
            <div>
                name : 
                <input type="text" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})}/>
            </div>
            <div>
                number :
                <input type='text' value={newContact.number} onChange={e => setNewContact({...newContact, number:e.target.value})}/>
            </div>
            
            <button type='submit'>Add Contact </button>
        </form>
    </div>
  )
}

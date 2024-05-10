import React from 'react'

export const Persons = ({persons, textSearch, searchResult, handler}) => {
  return (
    <ul>
        { !textSearch ? persons.map((person) => 
            <li key={person.id}>{person.name} {person.number} <button key = {person.id} onClick={() => handler(person.id)}>delete</button></li> 
        ) :
        searchResult.map((result) => 
          <li key={result.name}>{result.name} {result.number} <button key = {result.id} onClick = {() => handler(result.id)}>delete</button></li>)
      }
    </ul>
  )
}

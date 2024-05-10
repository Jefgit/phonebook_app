import React from 'react'

export const Filter = ({searchKey, handler}) => {
  return (
    <div>
      filter shown with
      <input type="text" value={searchKey} onChange={handler} />
    </div>
  )
}

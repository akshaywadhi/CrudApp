import React from 'react'
import './CrudData.css'

export default function CrudData({data,edit,deleteUser}) {
  return (
    <>
      {
        data.map((user => (
      
          <tr key={user._id}>
            <td>
              {user.name}
            </td>
            <td>
              {user.lname}
            </td>
            <td>
              {user.age}
            </td>
            <td>
              {user.city}
            </td>
            <td>
              <button className='btn btn-secondary me-3' onClick={() =>edit(user)}>Edit</button>
              <button className='btn btn-danger' onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        )))
      }
      
    </>
  )
}

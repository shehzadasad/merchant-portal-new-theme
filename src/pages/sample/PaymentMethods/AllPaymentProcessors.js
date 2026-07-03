import * as React from 'react'
const mystyle = {
  width: '50px',
  fontSize: '12px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '10px',
}

function AllPaymentProcessors() {
  return (
    <div>
      <span> Stripe </span>
      <span>
        <input style={mystyle} value='100'></input>%{' '}
      </span>
    </div>
  )
}

export default AllPaymentProcessors

import React from 'react'
import tick from '../assets/images/tick.png'

const appliedId = localStorage.getItem('appliedId')

const Apply = () => {


    return (
        <div >
            <img src={tick} />
            <h3>Successfully Applied to borrow</h3>
            <h5>You can contact the Admin using following</h5>
            <p>phone number:</p>
            <p>email</p>
        </div>
    )
}

export default Apply

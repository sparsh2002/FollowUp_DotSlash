import React , {useEffect , useState} from 'react'
import firebase from 'firebase'
import { Button } from '@material-ui/core'
const Apply = () => {
    const appliedPost = localStorage.getItem('appliedPost')
    const appliedauthorName = localStorage.getItem('appliedauthorName')
    const appliedDescription = localStorage.getItem('appliedDescription')
    const applieditemCategory = localStorage.getItem('applieditemCategory')
    const appliedTitle = localStorage.getItem('appliedTitle')
    const userId = localStorage.getItem('userId')
    

    function Order(){
        firebase.firestore()
        .collection('user')
        .doc(userId)
        .collection('borrow')
        .add({
            appliedPost,
            appliedauthorName,
            appliedDescription,
            applieditemCategory,
            appliedTitle
        })
    }
    return (
        <div>
         <p> Purchase Id:{appliedPost}</p>
         <p>Author : {appliedauthorName}</p>
         <p>Title : {appliedTitle}</p>
         <p>itemCategory: {applieditemCategory}</p>
         <p>Description : {appliedDescription}</p>
         
         <Button onClick={Order}>Confirm Order</Button>
        </div>
    )
}

export default Apply

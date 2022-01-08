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
    

    async function Order(){
        // add to user who borrowed the item
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

        // deleting the instance from the discussion sectoin

        const snapshot1 = await firebase.firestore()
            .collection('discussion')
            .limit(1)
            .where('postId',"==" , appliedPost)
            .get()

        snapshot1.docs[0].ref.delete();   
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

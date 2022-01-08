import React ,{useState , useEffect} from 'react'
import firebase from 'firebase'



const EditProfile = () => {
    const [name , setname] = useState("")
    const [email , setemail] = useState("")
    function SetProfile(e){
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        firebase.firestore()
        .collection('user')
        .doc(userId)
        .set({
            name : name ,
            email: firebase.auth().currentUser.email
        })
        .then(()=>{
            setname('')
        })

        console.log('submitted')
    }
    return (
        <div>
            <p>This is Edit profile section </p>
           <form className='form' onSubmit={SetProfile} style={{flexDirection: 'column'}}>
                <label>Name</label>
                <input type='string' value={name} onChange ={e => setname(e.currentTarget.value)} />
                <button>Continue</button>
            </form>
        </div>
    )
}

export default EditProfile

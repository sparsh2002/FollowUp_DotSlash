import React , {useState} from 'react'
import EditProfile from '../components/UserProfile/EditProfile'
import {Button} from '@material-ui/core'
const UserProfile = () => {
    const [page,setpage] = useState();
    function toggleProfile(){
        if(page===""){
            setpage(<EditProfile />)
        }
        else{
            setpage("")
        }
    }
    return (
        <div>
            <h1>This is UserProfile Page</h1>
            <Button onClick={toggleProfile}> Edit Profile</Button>
            {
                page
            }
        </div>
    )
}

export default UserProfile


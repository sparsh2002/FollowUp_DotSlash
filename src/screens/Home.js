import { useState,useEffect } from 'react';
import firebase from 'firebase'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Form from '../components/Discussions/Form';


function FetchPrevPosts(){
    const userId = localStorage.getItem('userId')
    const [data,setdata]  = useState([])
    useEffect(() =>{
        firebase.firestore()
        .collection('discussion')
        .onSnapshot((snapshot) =>{ 
          setdata(snapshot.docs.map((doc)=>doc.data()))
        })
    },[])
    return data;
}

function GetData(){
    const [data, setdata] = useState([])
    let id = localStorage.getItem('userId')
    useEffect(() => {
        const fetched = firebase
        .firestore()
        .collection('user')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
        
    }, [])

    for(var i=0 ; i<data.length ; i++){
        if(data[i]['id']==id){
            setdata(data[i])
        }
    }
    return data
}


const Home =  () => {
    const data = FetchPrevPosts()
    // const userData = GetData()
    // console.log(userData[0].name)    
    return ( 
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            
        <Grid container direction="column" className='previous-chats'>
        <div><h1>This is Home Screen</h1></div>
            {
                data ? (
                    data.map((res,i ) => <div key = {i}>{res.content}</div>)
                ) : " "
            }
        </Grid>
        <Grid className='new-post'>
            <Form />
        </Grid>
        </div>

     );
}
 
export default Home;
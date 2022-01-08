import { useState,useEffect } from 'react';
import firebase from 'firebase'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Form from '../components/Discussions/Form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


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

        <Grid className='new-post'>
            <Form />
        </Grid>
        <Grid container direction="column" className='previous-chats'>
        
            {
                data ? (
                    data.map((res,i ) => 
                    <Box sx={{ m:2, p:2 }}>
                    <Grid direction="column" spacing={2} align="left">
                    <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <p>{data.name}</p>
                    </Stack>
                    <div style={{ backgroundColor:'red' }}>Sell</div>
                    <Typography>{data.title}</Typography>
                    <Typography>{data.Description}</Typography>
                    
                    <Button variant="contained" align="right">Apply</Button>

                    </Grid>
                    </Box>
                    )
                ) : " "
            }
        </Grid>

        </div>

     );
}
 
export default Home;
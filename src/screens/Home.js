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
                    <Box sx={{ m:3, p:4, border: '2px solid #ccc', borderRadius: '40px' }}>
                    <Stack direction="column" spacing={2} align="left">
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center'}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <p>{res.name}</p>
                    </Stack>
                    {res.postType === 'sell' ?
                    <div style={{ backgroundColor:'red', width:'70px', color:'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>For Sale</div> :
                    <div style={{ backgroundColor:'green', width:'70px', color:'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>To Lend</div>

                    }
                    <h2>{res.Title}</h2>
                    <Typography variant="p">{res.Description}</Typography>
                    <div>
                        <img src={res.imageUrl} />
                    </div>
                    {
                        res.postType === 'sell' ? <div style={{ display: 'flex' }}>
                            <h3>Sale Price: </h3>
                            <h4> ₹ {res.price}</h4>
                        </div> : <div style={{ display: 'flex' }}>
                            <h3>Return Date: </h3>
                            <h4 > {res.duration}</h4>
                        </div> 
                    }
                    <div style={{ display: 'flex' }}>
                    <h3>Contact Details: </h3>
                    <h4>&nbsp;&nbsp;+917398816950</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'right'}}>
                    <Button variant="contained" align="right">Apply {res.applicationNumber}</Button>
                    </div>
                    </Stack>
                    </Box>
                    )
                ) : " "
            }
        </Grid>

        </div>

     );
}
 
export default Home;
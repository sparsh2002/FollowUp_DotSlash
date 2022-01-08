import React ,{useEffect , useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Redirect , useHistory } from 'react-router-dom';
import firebase from 'firebase'
import Comments from './Comments'
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

function GetImage(imageUrl) {
    const [profilePath, setprofilePath] =useState('')
    useEffect(() => {
        firebase
        .storage()
        .ref(`${imageUrl}`)
        .getDownloadURL()
        .then(fireBaseUrl => {
          setprofilePath(fireBaseUrl);
        });
    }, [])
    return profilePath
}
const PostView = (props) => {
    // console.log(props.data)
    // const { history } = props  
    const history = useHistory()
    // console.log(history)
    const data = FetchPrevPosts()
    const imagePath = GetImage(props.data.imageUrl)
    function paymentGateway(postId , Title , itemCategory , name , description , price){
        localStorage.setItem('appliedPost', postId)
        localStorage.setItem('appliedTitle',Title)
        localStorage.setItem('applieditemCategory', itemCategory)
        localStorage.setItem('appliedauthorName', name)
        localStorage.setItem('appliedDescription',description)
        localStorage.setItem('appliedPrice' , price)
        // return <Redirect to='/payment' />
        history.push('/payment')
    }

    function borrow(postId , Title , itemCategory , name , description){
        localStorage.setItem('appliedPost', postId)
        localStorage.setItem('appliedTitle',Title)
        localStorage.setItem('applieditemCategory', itemCategory)
        localStorage.setItem('appliedauthorName', name)
        localStorage.setItem('appliedDescription',description)
        // return <Redirect to="/apply" />
        history.push('/apply')
    }
    return (
        <div>
            <Box sx={{ m:3, p:4, border: '2px solid #ccc', borderRadius: '40px', width: '80%', boxShadow: " -1px 3px 5px #888888" }}>
                    <Stack direction="column" spacing={1} align="left">
                    
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center'}}>
                    <Avatar alt="Remy Sharp" src="" />
                    <p>{props.data.name}</p>
                    </Stack>
                    
                    {
                    props.data.postType === 'sell' ?
                    <div style={{ backgroundColor:'red', width:'70px', color:'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>For Sale</div> :
                    <div style={{ backgroundColor:'green', width:'70px', color:'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>To Lend</div>

                    }
                    <h2>{props.data.Title}</h2>
                    <Typography variant="p">{props.data.Description}</Typography>

                    <div>
                        <img src={imagePath} width={100} />
                    </div>

                    {
                        props.data.postType === 'sell' ? <div style={{ display: 'flex' }}>
                            <h3>Sale Price: </h3>
                            <h4> ₹ {props.data.price}</h4>
                        </div> : <div style={{ display: 'flex' }}>
                            <h3>Return Date: </h3>
                            <h4 > {props.data.duration}</h4>
                        </div> 
                    }

                    <div style={{ display: 'flex' }}>
                    <h3>Contact Details: </h3>
                    <h4>&nbsp;&nbsp;+917398816950</h4>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'right'}}>
                    {props.data.postType === 'sell' ?
                    <Button variant="contained" align="right" onClick={() => 
                        paymentGateway(props.data.postId , props.data.Title , props.data.itemCategory , props.data.name , props.data.Description , props.data.price)
                    }>Buy </Button> :
                    <>
                    <Button variant="contained" align="right" onClick={() => borrow(props.data.postId , props.data.Title , props.data.itemCategory , props.data.name , props.data.Description)}>Apply </Button>
                    
                    </>
                    }
                    </div>
                    
                    <Comments
                        allComments={props.data.comments}                   
                     />
                    </Stack>

                    </Box>
        </div>
    )
}

export default PostView

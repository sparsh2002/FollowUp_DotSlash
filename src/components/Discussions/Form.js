import React  from 'react'
import { makeStyles} from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import rene from '../../assets/images/rene.jpg'
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState,useEffect } from 'react';
import firebase from 'firebase'
import uuid from 'react-uuid'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(theme => ({
    paper: {
      display: 'block',
      margin: 'auto',
      }
      }));

const names = [
  'Books',
  'Electronics',
  'Furniture',
  'Equipments',
];


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


const Form = () => {
    const userId = localStorage.getItem('userId')
    const userData = GetData();
    const classes = useStyles();
    const [collapse, setCollapse] = useState(true)
    const [isChecked, setisChecked] = useState(false)
    const [imageUrl, setimageUrl] = useState('')
    const [data, setData] = useState({
        postType: 'NA',
        price: 'NA',
        itemCategory: '',
        Duration: new Date(),
        Title: '',
        Description: '',
        imageUrl: ''
    })

    function SavePost(){
        const postId = uuid()
        const date = new Date()
        firebase.firestore()
        .collection('discussion')
        .add({
            postId,
            timeStamp: date,
            name:userData[0].name,
            posterId: userId,
            postType: data.postType,
            price: data.price,
            itemCategory: data.itemCategory,
            Duration: data.Duration,
            Title: data.Title,
            Description: data.Description,
            imageUrl:`/images/${userId}/items/${postId}`
        })

        firebase.firestore()
        .collection('user')
        .doc(userId)
        .collection(data.postType)
        .add({
            postId,
            timeStamp: date ,
            name:userData[0].name,
            price: data.price,
            itemCategory: data.itemCategory,
            Duration: data.Duration,
            Title: data.Title,
            Description: data.Description,
            imageUrl:`/images/${userId}/items/${postId}`
        })

        // Added image to firebase storage

        firebase
        .storage()
        .ref(`/images/${userId}/items/${postId}`)
        .put(imageUrl)
        .on("state_changed" , alert("Profile Image Uploaded") , alert);
        

        setData({
            postType: 'NA',
            price: 'NA',
            itemCategory: '',
            Duration: new Date(),
            Title: '',
            Description: ''
        })
        setimageUrl('')

        // console.log('submitted')
    }
    function change(e){
        console.log(e.target.value)
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    function checkbox(e){
        // console.log(e.target.value)
        setisChecked(!isChecked)

        if(isChecked){
        setData({
            ...data,
            'Duration': 'NA'
        })
    }
    }

    function changeDuration(e){
        // console.log(e)
        setData({
            ...data,
            'Duration': e
        })
        // console.log(data)
    }

    function expand(){
        setCollapse(!collapse)
    }

    return (
        <div>
        { collapse  ? 
                (
                    <>
                <Paper sx={{ p:3, boxShadow:2, width:'80%'}} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={rene} sx={{width:56,height:56 }} src={rene}/>
                <h2 style={{marginTop:"10px"}}>Prasang Maheshwari</h2>
                </Stack>
                <Button onClick={expand}>Create Post</Button>
                </div>
                </Paper>
                </>

                )
             :
        <>
            <Paper sx={{ p:3, boxShadow:2, width:'80%' }} >
            <Stack direction="column" spacing={2}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={rene} sx={{width:56,height:56 }}/>
                <h2 style={{marginTop:"10px"}}>Prasang Maheshwari</h2>
                </Stack>
                <Button onClick={expand}>collapse</Button>
                </div>
                <TextField
                id="standard-textarea"
                label="Title"
                placeholder="Enter Title"
                name="Title"
                multiline
                fullWidth
                variant="standard"
                value={data.Title}
                onChange={change}
                />
                <TextField
                id="standard-multiline-static"
                label="Description"
                name="Description"
                multiline
                fullWidth
                rows={4}
                variant="standard"
                value={data.Description}
                onChange={change}
                />

                <input type ='file' onChange={e => setimageUrl(e.target.files[0])} />
                

                <FormControl component="fieldset">
                <FormLabel component="legend">Post Type</FormLabel>
                <RadioGroup
                row aria-label="Post type" 
                name="postType"
                value={data.postType}
                onChange={change}>
                    <FormControlLabel value="lend" control={<Radio />} label="Lend" />
                    <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                </RadioGroup>
                </FormControl>

                <FormControl sx={{ maxWidth: 300 }}>
                <InputLabel >Item Category</InputLabel>
                <Select
                label="Item Category"
                value={data.itemCategory}
                onChange={change}
                // input={<OutlinedInput label="Name" />}
                // MenuProps={MenuProps}
                name="itemCategory"
                >
                <MenuItem value="">None</MenuItem>
                {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    >
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            

            {
                data.postType === 'lend'? (
                        <>
                        <FormGroup>
                        <FormControlLabel name="Duration" control={<Checkbox />} label="Don't need to Return" onChange={checkbox}/>
                        </FormGroup>

                        {
                            isChecked? null :
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                        
                        label="Date mobile"
                        inputFormat="MM/dd/yyyy"
                        value={data.Duration}
                        onChange={changeDuration}
                        renderInput={(params) => <TextField {...params} />}
                        name="Duration"
                        />
                        </LocalizationProvider>
                        
                        }
                        
                        </>
                ) : (
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={data.price}
                        onChange={change}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        name='price'
                    />
                    </FormControl>
                )
            }

                <Button variant="contained" align="right"  onClick={SavePost}>Post</Button>

            </Stack>
        </Paper>
        </>
        }
        </div>
    )
}

export default Form

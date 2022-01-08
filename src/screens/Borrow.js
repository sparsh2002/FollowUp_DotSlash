import React , {useEffect , useState} from 'react'
import Drawer from '../components/UI/drawer'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@mui/material/Typography'
import Cards from '../components/UI/cards'
import firebase from 'firebase'
function GetData(){
    const userId = localStorage.getItem('userId')
    const [data , setdata] = useState([])
    useEffect(() => {
        firebase.firestore()
        .collection('user')
        .doc(userId)
        .collection('borrow')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
    }, [])
    return data
}

function GetBoughtData(){
    const userId = localStorage.getItem('userId')
    const [data , setdata] = useState([])
    useEffect(() => {
        firebase.firestore()
        .collection('user')
        .doc(userId)
        .collection('bought')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
    }, [])
    return data
}



function Borrow() {
    const show = {
        borrowData :GetData(),
        boughtData : GetBoughtData()
    }
    return (
        <div>
            <Drawer />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} >
                    <Cards data={{ title:'Borrow' , description:"This section is used to Display the items you have placed for lending" , list:{show} , type:'borrow'}} />

                </Grid>

                <Grid item xs={12} sm={12} md={12} >
                    {/* <Cards data={{ title:'Bought' , description:"This section is used to Display the items you have placed for lending"}} /> */}
                    <Cards data={{ title:'Bought' , description:"This section is used to Display the items you have placed for lending" , list:{show} , type:'bought'}} />

                </Grid>
            </Grid>
        </div>
    )
}

export default Borrow
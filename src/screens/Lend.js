import React , {useState , useEffect} from 'react'
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
        .collection('lend')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
    }, [])
    return data
}

function Lend() {
    const lendData = GetData()
    // console.log(lendData)
    return (
        <div>
            <Drawer/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} >
                    <Cards data={{ title:'Lend' , description:"This section is used to Display the items you have placed for lending" , list:{lendData}}} />
                </Grid>

                <Grid item xs={12} sm={12} md={12} >
                    
                <Cards data={{ title:'Sold' , description:"This section is used to Display the items you have Sold"}} />

                </Grid>

                {/* <Grid item xs={12} sm={12} md={12} >
                   
                <Cards data={{ title:'Lend' , description:"This section is used to Display the items you have placed for lending"}} />

                </Grid> */}
            </Grid>


        </div>

    )
}

export default Lend
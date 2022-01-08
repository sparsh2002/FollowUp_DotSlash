import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemButton from '@mui/material/ListItemButton';
import firebase from 'firebase'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};


export default function BasicModal(props) {
  const type = props.type
  var printable
  if(type=='lend'){
    printable = props.data.list.show.lendData
  }
  else if(type=='sold'){
    printable = props.data.list.show.soldData
  }
  else if(type=='borrow'){
    printable = props.data.list.show.borrowData
  }
  else if(type=='bought'){
    printable = props.data.list.show.boughtData
  }
  
  // console.log(printable)
  const [open, setOpen] = React.useState(props.open);
  const {history}=props;
  const handleOpen = () => setOpen(props.open);
  const handleClose = () =>{
       
    setOpen(false);
    history.push("/borrow")};

  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {
              printable?.map((res )=><div>
                <h4>{res.Title}</h4>
                <p>{res.name}</p>
                <p>{res.itemCategory}</p>
                <br />
              </div>)
            }
             {/* <List>
                    {lend?.map((res) => <ListItem onClick={() => { }}>
                        <ListItemText primary={res.list.lendData[i]} />
                        <Button variant="contained">View</Button>
                    </ListItem>)}
            </List> */}
          
        </Box>
      </Modal>
    </div>
  );
}
import { useState } from 'react'
import './Payment.css'
import {Button} from '@material-ui/core'
import firebase from 'firebase'
// import iphone from '../../assets/images/ecom/iphone.jpeg';
// import macbook from '../../assets/images/ecom/macbook.jpeg';
const iphone = 'https://source.unsplash.com/100x100/?iphone'
const macbook = 'https://source.unsplash.com/100x100/?macbook'

function SaveData(acknowleged) {
  sessionStorage.setItem('paymentComplete' , acknowleged)
}

function Payment() {
  const appliedPost = localStorage.getItem('appliedPost')
    const appliedauthorName = localStorage.getItem('appliedauthorName')
    const appliedDescription = localStorage.getItem('appliedDescription')
    const applieditemCategory = localStorage.getItem('applieditemCategory')
    const appliedTitle = localStorage.getItem('appliedTitle')
    const appliedPrice = localStorage.getItem('appliedPrice')
    const userId = localStorage.getItem('userId')
    

    async function Order(){
        // add to user who borrowed the item
        firebase.firestore()
        .collection('user')
        .doc(userId)
        .collection('bought')
        .add({
            appliedPost,
            appliedauthorName,
            appliedDescription,
            applieditemCategory,
            appliedTitle
        })

        // deleting the instance from the discussion sectoin

        const snapshot1 = await firebase.firestore()
            .collection('discussion')
            .limit(1)
            .where('postId',"==" , appliedPost)
            .get()

        snapshot1.docs[0].ref.delete();   
    }
  const phonePrice = 67999;
  const laptopPrice = 125000;

  const [acknowledged, setacknowledged] = useState(true)
  SaveData(acknowledged)
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_HAN6gNq5Mqpqwp",
      currency: "INR",
      amount: amount,
      name: appliedauthorName,
      description: "Thanks for purchasing",
      image:
        "",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
      },
      prefill: {
        name: "Sparsh",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="App">
      <p> Purchase Id:{appliedPost}</p>
         <p>Author : {appliedauthorName}</p>
         <p>Title : {appliedTitle}</p>
         <p>itemCategory: {applieditemCategory}</p>
         <p>Description : {appliedDescription}</p>
         <p>Price: {appliedPrice}</p>
      <Button onClick={() => displayRazorpay(appliedPrice*100)} color="primary">
        Proceed to Pay
      </Button>
      <h4>First Complete the payment Then Move to the Confirm Order</h4>
      <Button onClick={Order}>Confirm Order</Button>
    </div>
  );
}

export default Payment;
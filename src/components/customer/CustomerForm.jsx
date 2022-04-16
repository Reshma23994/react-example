import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customerAction } from '../../redux/action/customerAction'
import instance from '../../utils/serviceConfig';
const CustomerForm = (props) => {
  const initUserData = {
    user_name: "",
    email: "",
    comment: "",

  }
  const initformError = {
    user_name: "",
    email: "",
    comment: "",
  }
  const [formError, setFormError] = useState(initformError)
  // console.log(props.getCompData)

  const dispatch = useDispatch();
  console.log(`props`, props)
  const [customerData, setCustomerData] = useState(initUserData);


  const handleChange = (event) => {
    const { name, value } = event.target
    setCustomerData({
      ...customerData,
      [name]: value
    })
  }

  const isFormValid = () => {
    let error = {}
    let flag = false
    if (customerData.user_name.length === 0) {
      error.user_name = "Name is required"

    }
    if (customerData.email.length === 0) {
      error.email = "Email is required"
    }
    if (customerData.comment.length === 0) {
      error.comment = "Comment is required"
    }
    if (customerData.email.length > 0 && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(customerData.email))) {
      error.email = "Please enter correct emailid"
    }
    console.log("formError before: ", formError)
    setFormError({ ...initformError, ...error })

    console.log("formError after: ", formError)
    if (formError["user_name"].length === 0 && formError.email.length === 0 && formError.comment.length === 0) {
      console.log(formError.user_name.length);
      console.log(formError.user_name)
      console.log(formError.email.length);
      console.log(formError.comment.length);
      flag = true

    }
    else {
      console.log("inside el: ", flag)
      flag = false;
    }
    console.log("flag: ", flag)
    return flag

  }

  const postCompData = async () => {
    try {
      const response = await instance.post("/customer", customerData)
      console.log("response: ", response);
      if (response?.status === 201) {
        console.log("done")
        props.getCompData();

      }

    }
    catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formError handleSubmit: ", formError)
    if (isFormValid()) {
      postCompData()
      setCustomerData(initUserData)
      console.log("dispatched");

    }
  }

  return (

    <form>
      <h1>Contact Form</h1>
      <fieldset>
        <div className="name">
          <input name="user_name" type="text" className="feedback-input" value={customerData.user_name} placeholder="Name" id="name" onChange={handleChange} />
          <span className="error" id="nameSpan">{formError.user_name}</span>
        </div>
        <div className="email">
          <input name="email" type="text" className="feedback-input" value={customerData.email} id="email" placeholder="Email" onChange={handleChange} />
          <span className="error" id="emailSpan">{formError.email}</span>

        </div>
        <div className="text">
          <textarea name="comment" className="feedback-input" id="comment" value={customerData.comment} placeholder="Comment" onChange={handleChange} />
          <span className="error" id="commentSpan">{formError.comment}</span>
        </div>
      </fieldset>
      <div className="submit">
        <input type="submit" value="Submit" onClick={handleSubmit} id="button-blue" />
      </div>
    </form>
  );

}


export default CustomerForm

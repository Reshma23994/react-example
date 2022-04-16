import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './Customer.css';
import './customerList.css';
import CustomerForm from './CustomerForm';
import instance from '../../utils/serviceConfig';
import CustomerList from './customerList';
import { customerAction } from '../../redux/action/customerAction';


function Customer() {
    useEffect(() => {
        getCompData()
    }, []);
    const dispatch = useDispatch()
    const getCompData = async () => {
        try {
            const response = await instance.get("/customer")
            console.log("response: ", response);
            if (response?.status === 200) {
                dispatch(customerAction.listContact(response.data))
                //response.data

            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (

        <div>
            <CustomerForm getCompData={getCompData} />
            <CustomerList />
        </div>

    );
}


export default Customer
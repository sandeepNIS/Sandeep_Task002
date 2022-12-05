// CreateStudent Component for add new account

// Import Modules
import React, { useState } from "react";
import axios from 'axios';
import AccountForm from "./AccountForm";

// CreateAccount Component
const CreateAccount = () => {
const [formValues] =
	useState({ name: '', email: '', password: '' })
// onSubmit handler
const onSubmit = accountObject=> {
	axios.post(
'account/addaccount',
	accountObject,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
	.then(res => {
		if (res.status === 200)
		alert('account successfully created')
		else
		Promise.reject()
	})
	.catch(err => alert('Something went wrong'))
}
	
// Return Account form
return(
	<AccountForm initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Create Account
	</AccountForm>
)
}

// Export CreateAccount Component
export default CreateAccount

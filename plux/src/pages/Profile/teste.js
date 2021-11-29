import React, { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'


const RegistrationForm = () => {
    
    // customer obj
    const [customer, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        mobileNumber: "",
        dateOfBirth: new Date(),
        password: "",
        confirmPassword: ""
    });

    // error fields to display on form
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailAddressError, setEmailAddressError] = useState("");
    const [mobileNumberError, setMobileNumberError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const [passwordShown, setPasswordShown] = useState("");

    const togglePassword = () => {
        setPasswordShown(prevPass => !prevPass);
    }

    // Handle all other controlled fields 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerData(prev => ({
             ...prev,
              [name]: value 
        }));
      }


      const calculateAge = (dob) => {

        let birthDate = new Date(dob);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        const calculation = Math.abs(age.getUTCFullYear() - 1970);
        
        return calculation;
      }


    // Handle date change
    const handleDateChange = (event) => {
        setCustomerData(prev => ({
            ...prev,
            dateOfBirth: event.target.value
        }))
    };

    const handleEmailChange = (event) => {
        setCustomerData(prev => ({
            ...prev,
            emailAddress: event.target.value
        }))
    }

    // Handle Mobile number change
    const handleMobileNumberChange = (event) => {

        let val = event.target.value;
        val = val.replace(/[^0-9]/gm, '');

        let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(6, val.length)}`;
        num = num.trim();
        
        setCustomerData(prev => ({
            ...prev,
            mobileNumber: num
        }))

    };


    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setCustomerData(prev => ({
             ...prev,
              [name]: value 
        }));
    }

    // on each render compare password with confirm password field
    useEffect(() => {
        checkPassword(customer);
    },[customer])


    // check if the password matches confirm password, 
    const checkPassword = (customer) => {
        if(customer.password === customer.confirmPassword) {
            setPasswordError("Passwords match");
            
        } else if(customer.password !== customer.confirmPassword) {
            setPasswordError("Passwords don't match")
  
        } else {
            setPasswordError("")
        }
    }


    // submit form data
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        console.log("Age: " + calculateAge(customer.dateOfBirth));
  
            fetch("http://localhost:8080/api/v2/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    emailAddress: formData.get('emailAddress'),
                    mobileNumber: formData.get('mobileNumber'),
                    dateOfBirth: formData.get('dateOfBirth'),
                    password: formData.get('password')
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.fieldErrors) {
                        data.fieldErrors.forEach(fieldError => {
                            if(fieldError.field === 'firstName') setFirstNameError(fieldError.message);
                            if(fieldError.field === 'lastName') setLastNameError(fieldError.message);
                            if(fieldError.field === 'emailAddress') setEmailAddressError(fieldError.message);
                            if(fieldError.field === 'mobileNumber') setMobileNumberError("Mobile Number is invalid.");
                            if(fieldError.field === 'dateOfBirth') setDateOfBirthError(fieldError.message);
                            if(fieldError.field === 'password') setPasswordError(fieldError.message);

                    });
                    } else {

                        setCustomerData({
                            firstName: '',
                            lastName: '',
                            emailAddress: '',
                            mobileNumber: '',
                            dateOfBirth: new Date(),
                            password: '',
                            confirmPassword: ''
                        })
                        alert("Data posted successfully");
                        
                    }
                })
                .catch((err) => console.log("ERROR: " + err));
        
            
     }



    return (

        <div className="register-form-background">
            
            <form className="register-form-bg" id="register-form" method="POST" onSubmit={handleSubmit}>
                <h2 className="register-form-heading">Register</h2>

                <div className="register-form-fields">
    
                
                        <div className="row">
                            {/*First Name*/}
                            <div className="col-sm">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="register-form-labels">First name</label>

                                    {firstNameError ? <span className="field-validation-styling">{firstNameError}</span> : ''}

                                    <input type="text" 
                                        onFocus={() => setFirstNameError('')}
                                        className="shadow-none form-control register-form-input-field" 
                                        name="firstName"
                                        placeholder="Enter First Name" 
                                        value={customer.firstName}
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>

                            <div className="col-sm">
                                {/*Last Name*/}
                                <div className="form-group">
                                    <label htmlFor="lastName" className="register-form-labels">Last name</label>

                                    {lastNameError ? <span className="field-validation-styling">{lastNameError}</span> : ''}
                                    <input type="text" 
                                        onFocus={(e) => setLastNameError('')}
                                        className="shadow-none form-control register-form-input-field" 
                                        name="lastName"
                                        placeholder="Enter Last Name" 
                                        value={customer.lastName} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    



                    {/*Email Address*/}
                    <div className="form-group">
                        <label htmlFor="emailAddress" className="register-form-labels">Email Address</label>

                        {emailAddressError ? <span className="field-validation-styling">{emailAddressError}</span> : ''}

                        <input type="email" 
                            //required
                            onFocus={(e) => setEmailAddressError('')}
                            className="shadow-none form-control register-form-input-field" 
                            name="emailAddress"
                            placeholder="Enter Email Address" 
                            value={customer.emailAddress} 
                            onChange={handleEmailChange} 
                        />                      
                    </div>

                    {/*Contact Number*/}
                    <div className="form-group">
                        <label htmlFor="mobileNumber" className="register-form-labels">Mobile Number</label>

                        {mobileNumberError ? <span className="field-validation-styling">{mobileNumberError}</span> : ''}

                        <input type="tel"
                            onFocus={(e) => setMobileNumberError('')}
                            className="shadow-none form-control register-form-input-field" 
                            name="mobileNumber"
                            id="mobileNumber"
                            placeholder="Enter Mobile Number"
                            maxLength="12"
                            value={customer.mobileNumber}
                            onChange={handleMobileNumberChange}
                        />
                    </div>


                    {/*Date Of Birth*/}
                    <div className="form-group">
                        <label htmlFor="dateOfBirth" className="register-form-labels">Date Of Birth</label>

                        {dateOfBirthError ? <span className="field-validation-styling">{dateOfBirthError}</span> : ''}

                        <input type="date" 
                            onFocus={(e) => setDateOfBirthError('')}
                            className="shadow-none form-control register-form-input-field" 
                            name="dateOfBirth"
                            max="2010-01-01"
                            selected={customer.dateOfBirth} 
                            onChange={handleDateChange} 
                        />
                    </div>
     

                    {/*Password*/}
                    <div className="form-group">
                        <label htmlFor="password" className="register-form-labels">Password</label>

                        {passwordError ? <span className="field-validation-styling">{passwordError}</span> : ''}

                        <input type={passwordShown ? "text" : "password"} 
                            onFocus={(e) => setPasswordError('')}
                            className="shadow-none form-control register-form-input-field" 
                            name="password"
                            placeholder="Enter Password" 
                            value={customer.password} 
                            onChange={handlePasswordChange} 
                        />
                      
                    </div>

                    {/*Confirm Password*/}
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="register-form-labels">Confirm Password</label>

                        <input type={passwordShown ? "text" : "password"} 
                            minLength="8"
                            className="shadow-none form-control register-form-input-field" 
                            name="confirmPassword"
                            placeholder="Confirm Password" 
                            value={customer.confirmPassword} 
                            onChange={handlePasswordChange} />
                    </div>

                    {/*Checkbox to show password*/}
                    <div className="form-check register-show-password-group">
                        <input type="checkbox" className="shadow-none form-check-input register-form-check-field" onChange={togglePassword} />
                        <label className="form-check-label register-show-password-lbl">Show password</label>
                        <label className="form-check-label register-forgot-password-lbl">Forgot password?</label>
                    </div>

                    <button type="submit" className="shadow-none btn register-btn">Create Account</button>
                    <label className="form-labels" className="form-check-label sign-in-lbl">Already have an account? <span style={{ color: "#A7E25E", textDecoration: "none" }}>Sign in</span></label>
                </div>
            </form>
        </div>
      
    )
}

export default RegistrationForm;
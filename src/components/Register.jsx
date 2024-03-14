import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../context/AccountContext'

const FormLogin = ({ email,pass,setPass,setEmail, handleAddAccount, name,setName }) => {
    return(
        <>
        <form className='form-login' onSubmit={handleAddAccount}>
            <div className="input-type">
                <input 
                    type="email" 
                    name='Email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="input-type">
                <input 
                    type="text" 
                    name='displayName' 
                    placeholder='Username' 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="input-type">
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    value={pass} 
                    onChange={e => setPass(e.target.value)}
                />
            </div>
            <button className='bt-sign-final'>
                Register
            </button>
        </form>
        </>
    )
}

const Register = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [name,setName] = useState('')

    const handleAddAccount = async (e) => {
        e.preventDefault();
    
        const userCredentials = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass,
                displayName: name
            }),
        };
    
        try {
            const response = await fetch('http://localhost:7777/auth/register', userCredentials);
            const responseData = await response.json();
            console.log(responseData);    
            // Check if registration was successful
            if (responseData.message === "User registered and logged in successfully") {
                // Redirect to a specific page
                navigate('/'); // Replace '/dashboard' with the desired URL
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='authentication-component'>
            <div className="auth-component">
                <div className="logo">
                    <img src="./img/phone.jpg" alt="" />
                </div>
                <div className="form-component">
                    <FormLogin 
                        email={email} 
                        setEmail={setEmail}
                        pass={pass}
                        name={name}
                        setName={setName}
                        setPass={setPass}
                        handleAddAccount={handleAddAccount}
                    />
                </div>
            </div>
        </div>
    )
}

export default Register
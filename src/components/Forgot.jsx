import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Forgot = () => {

    const [email,setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:7777/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            console.log(responseData)
            setMessage(responseData.message);
            setError(''); // Clear any previous error message
        } catch (error) {
            setError(error.message);
            setMessage(''); // Clear any previous success message
        }
    };


    return (
        <div className='authentication-component'>
            <div className="auth-component">
                <div className="logo">
                    <img src="./img/phone.jpg" alt="" />
                </div>
                <div className='forgot form-component'>
                    <form 
                        action="" 
                        className="form-login"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-type">
                            <input 
                                type="email" 
                                name='Email' 
                                placeholder='Email' 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <p className={`class-out ${ error ? 'red' : 'green'}`}>
                            {error} {message}
                        </p>
                        <button className='bt-sign-final'>
                            Send Reset Password
                        </button>
                        <div className="sign-in-button switch">
                            <Link to={'/'}>
                                <p>
                                    Go to Login
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot
import React, { useState } from 'react'
import AdminComponent from './AdminComponent'

const FormLogin = ({ adminInput, passInput,setAdminInput, setPassInput,handleForm, error }) => {
    return(
        <>
        <form className='form-login' onSubmit={handleForm}>
            <div className="input-type">
                <input 
                    type="text" 
                    name='admin' 
                    placeholder='Admin Username' 
                    value={adminInput} 
                    onChange={e => setAdminInput(e.target.value)}
                />
            </div>
            <div className="input-type">
                <input 
                    type='password' 
                    name='password' 
                    placeholder='Password' 
                    value={passInput} 
                    onChange={e => setPassInput(e.target.value)}
                />
                <p style={{color:"red"}}>
                    {error}
                </p>
            </div>
            <button className='bt-sign-final'>
                Login
            </button>
        </form>
        </>
    )
}

const LoginAdmin = ({ adminInput, passInput, setAdminInput, setPassInput,handleForm,error }) => {
    
    return (
        <>
        <div className='authentication-component'>
            <div className="auth-component">
                <div className="logo">
                    <img src="./img/img1.png" alt="" />
                </div>
                <div className="form-component">
                    <FormLogin 
                        adminInput={adminInput}
                        passInput={passInput}
                        setAdminInput={setAdminInput}
                        setPassInput={setPassInput}
                        handleForm={handleForm}
                        error={error}
                    />
                </div>
            </div>
        </div>0
        </>
    )
}

const AdminSide = () => {
    
    const [adminInputs,setAdminInputs] = useState({ adminname:"menudo123", password:"menudo123" })
    const [adminInput,setAdminInput] = useState("")
    const [passInput,setPassInput] = useState("")
    const [error,setError] = useState("")

    const handleForm = (e) => {
        e.preventDefault()
    }

    return (
        <div className='admin-component'>
            { (adminInput == adminInputs.adminname && passInput == adminInputs.password) ? <>  
                <AdminComponent/>
            </> : 
            <> 
                <LoginAdmin adminInput={adminInput} passInput={passInput} setAdminInput={setAdminInput} error={error} setPassInput={setPassInput} handleForm={handleForm}/> 
            </>  }
        </div>
    )
}

export default AdminSide
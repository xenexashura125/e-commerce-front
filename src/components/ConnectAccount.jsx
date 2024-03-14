import React from 'react'
// import GoogleLogin from 'react-google-login';

const ConnectAccount = () => {

    const google = ( ) => {
        window.open('http://localhost:7777/auth/google',"_self")
    }
    const facebook = ( ) => { 
        window.open('http://localhost:7777/auth/facebook',"_self")
    }

    return (
        <div className='connect-accounts'>
            <div className="item-connect gl" onClick={google}>
                <div className="logo">
                    <img src="./img/p1.png" alt="" />
                </div>
                <h5>
                    Sign in with Google
                </h5>
            </div>
            <div className="item-connect gm" onClick={google}>
                <div className="logo">
                    <img src="./img/p2.png" alt="" />
                </div>
                <h5>
                    Sign in with Gmail
                </h5>
            </div>
            <div className="item-connect fb" onClick={facebook}>
                <div className="logo">
                    <img src="./img/p3.png" alt="" />
                </div>
                <h5>
                    Sign in with Facebook
                </h5>
            </div>
        </div>
    )
}

export default ConnectAccount
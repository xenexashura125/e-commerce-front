import React, { useContext, useState } from 'react';

const createAccountContext = React.createContext();

export function useAccount() {
    return useContext(createAccountContext);
}

const AccountContext = ({ children }) => {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [owner, setOwner] = useState(null);
    const [accountList, setAccountList] = useState([]);

    const logout = () => {
        localStorage.removeItem('userToken');
        window.open('http://localhost:7777/auth/logout', '_self');
    };

    const handleLogin = async (e, email, pass) => {
        e.preventDefault();

        const userCredentials = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        };

        try {
            const response = await fetch('http://localhost:7777/auth/login', userCredentials);
            const responseData = await response.json();
            console.log(responseData.user);
            console.log(responseData);

            // Check if login was successful
            if (responseData.message === 'Login successful') {
                setUser(responseData.user);
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleDeleteAccount = async (userId) => {
        try {
            const response = await fetch(`http://localhost:7777/auth/delete-account/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Handle account deletion success
                console.log('Account deleted successfully');
            } else {
                // Handle errors if the deletion fails
                console.error('Error deleting account:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const updateAccount = async (userId, email, password, displayName) => {
        const updatedUser = { userId, email, password, displayName }; // Create an updated user object

        try {
            const response = await fetch(`http://localhost:7777/auth/update-account/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Handle account update success
                console.log('Account updated successfully');
                // You can also update the account list here if needed
            } else {
                // Handle errors if the update fails
                console.error('Error updating account:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };
    

    const value = {
        user,
        owner,
        setOwner,
        handleLogin,
        logout,
        accountList,
        setAccountList,
        handleDeleteAccount,
        updateAccount,
    };

    return (
        <createAccountContext.Provider value={value}>
            {children}
        </createAccountContext.Provider>
    );
};

export default AccountContext;

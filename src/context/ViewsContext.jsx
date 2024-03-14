import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function

const createViewsContext = React.createContext();

export function useViews() {
    return useContext(createViewsContext);
}

const ViewsContext = ({ children }) => {
    

    const updateItemViews = async (brand, model) => {
        try {
            const response = await fetch('http://localhost:7777/views/update-view-count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ brand, model }),
            });
    
            if (response.ok) {
                console.log('Item view count updated successfully');
            } else {
                console.error('Failed to update item view count');
            }
        } catch (error) {
            console.error('Error updating item view count:', error);
        }
    };

    const value = {
        updateItemViews
    }

    return (
        <createViewsContext.Provider value={value}>
            {children}
        </createViewsContext.Provider>
    )
}

export default ViewsContext
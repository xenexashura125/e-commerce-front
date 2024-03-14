import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccountContext from './context/AccountContext';
import InventoryContext from './context/Inventory';
import ViewsContext from './context/ViewsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <AccountContext>
      <ViewsContext>
        <InventoryContext>
          <App />
        </InventoryContext>
      </ViewsContext>
    </AccountContext>
  </React.Fragment>
);

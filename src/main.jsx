import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-full w-full flex bg-clear bg-center">
      <App />
    </div>
  </React.StrictMode>,
)

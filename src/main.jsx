import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UsersProvider } from './context/usersContext'; // ✅ correct path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsersProvider> {/* ✅ MUST wrap App */}
      <App />
    </UsersProvider>
  </React.StrictMode>
);
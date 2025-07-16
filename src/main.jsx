import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux' // Provider component enables all components to access Redux store
import store from './store.js' // Import the Redux store from store.js

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider component wraps the App to make Redux store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
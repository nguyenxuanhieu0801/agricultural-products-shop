import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/GlobalStyles';
import 'sweetalert2/src/sweetalert2.scss';
import { theme } from 'utils/constants';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'redux/store';
import 'tippy.js/dist/tippy.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

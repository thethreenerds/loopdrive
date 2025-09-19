import React from "react";
import ReactDom from 'react-dom/client';
import App from './app';
import "bootstrap/dist/css/bootstrap.min.css";


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);
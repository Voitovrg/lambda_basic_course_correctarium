import ReactDOM from "react-dom/client";
import React from 'react';
import App from './App';
import {TextProvider} from "./components/TextContext/TextContext";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<TextProvider><App/></TextProvider>)
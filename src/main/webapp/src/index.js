import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import '@patternfly/patternfly/patternfly.css';
import App from './components/App';
import UserService from "./services/UserService";


const renderApp = () => createRoot(document.getElementById("root")).render(<App />);

UserService.initKeycloak(renderApp);

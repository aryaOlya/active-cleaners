import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EmailList from './components/Emails/EmailList';
import ComposeEmail from './components/Emails/ComposeEmail';
import OutBox from './components/Emails/OutBox';
import Home from './components/Home';

import EmailItem from './components/Emails/EmailItem';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/emails' element={<EmailList/>} />
      <Route path="/email/:id" element={<EmailItem/>} />
      <Route path="/send-email" element={<ComposeEmail/>} />
      <Route path="/outbox" element={<OutBox/>} />
    </Route>
  )
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


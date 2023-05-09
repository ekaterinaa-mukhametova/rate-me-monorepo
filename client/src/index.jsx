import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Main from './pages/Main';
import AdminPanel from './pages/AdminPanel';
import UserProfile from './pages/UserProfile';
import { ReviewReadMode, ReviewEditMode } from './pages/Review';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/admin-panel',
    element: <AdminPanel />,
  },
  {
    path: '/user-profile/:userId',
    element: <UserProfile />,
  },
  {
    path: '/review/:reviewId',
    element: <ReviewReadMode />,
  },
  {
    path: '/review/:reviewId/edit',
    element: <ReviewEditMode />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

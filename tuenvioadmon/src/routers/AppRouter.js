import React from 'react'
//React Router DOM
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Pages
import Login from '../Pages/Loginpage';
import DashBoardRoutes from './DashBoardRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  return (

    <Router>

      <Routes>
        <Route path='/' element={<PublicRoute>
          <Login />
        </PublicRoute>} />
        <Route path='/*' element={<PrivateRoute>
          <DashBoardRoutes />
        </PrivateRoute>} />

      </Routes>
    </Router>


  )
}

export default AppRouter
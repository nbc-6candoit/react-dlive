import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthChecked } from '../redux/modules/authSlice';

const PrivateRoute = () => {
    const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    const delayRedirect = setTimeout(() => {
      if (!isLogin) {
        navigate("/login");
      }
    }, 1500);


        return () => clearTimeout(delayRedirect);
    }, [dispatch, isLogin, navigate]);

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    if (!isLogin) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const auth = getAuth();

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
    }, [auth]);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (isAuthenticated) {
        return children;
    }


}

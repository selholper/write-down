import React, { useContext, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { AppContext } from 'App';

const RequireAuth: React.FC<PropsWithChildren> = observer((props) => {
    const { authStore } = useContext(AppContext);

    if (authStore.isInitializing)
        return <CircularProgress className="position-absolute top-50 start-50 translate-middle"/>;
    if (!authStore.isAuthorized)
        return <Navigate to="/sign-in" />;
    return <>{props.children}</>;
});

export default RequireAuth;
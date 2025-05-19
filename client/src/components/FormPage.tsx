import React, { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import FormStore from 'stores/view/FormStore';
import { AppContext } from 'App';

interface FormPageProps {
    formStore: FormStore
    returnPath: string
}

const FormPage: React.FC<PropsWithChildren<FormPageProps>> = observer(props => {
    const { authStore } = useContext(AppContext);

    const hideSnackbar = (): void => {
        props.formStore.resetAlertText();
    };

    return (
        <>
            <div className="position-absolute top-50 start-50 translate-middle text-center border border-dark rounded">
                {props.children}
            </div>
            {authStore.isAuthorized && <Navigate to={props.returnPath} replace={true} />}
            <Snackbar open={!!props.formStore.alertText} autoHideDuration={5000} onClose={hideSnackbar}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert severity="error">{props.formStore.alertText}</Alert>
            </Snackbar>
        </>
    );
});

export default FormPage;
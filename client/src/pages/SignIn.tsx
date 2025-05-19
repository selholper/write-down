import React, { useContext } from 'react';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { AppContext } from 'App';
import FormPage from 'components/FormPage';
import Form from 'components/Form';
import FormInput from 'components/FormInput';
import FormStore from 'stores/view/FormStore';
import { required } from 'utils/validator';
import LinkWithDescription from 'components/LinkWithDescription';

const SignIn: React.FC<{ returnPath: string }> = observer((props) => {
    const { authStore } = useContext(AppContext);
    const formStore = useLocalObservable<FormStore>(() => (
        new FormStore({
            'name': [required],
            'password': [required],
        }, authStore.signIn)
    ));

    return (
        <div className="text-center">
            <FormPage formStore={formStore} returnPath={props.returnPath}>
                <Form title="Sign In" store={formStore}>
                    <FormInput id="name" type="text" name="name" label="Username"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle color={formStore.fields.name.errorMsg ? 'error' : 'inherit'}/>
                                </InputAdornment>
                            )
                        }}></FormInput>
                    <FormInput id="password" type="password" name="password" label="Password"></FormInput>
                </Form>
            </FormPage>
            <LinkWithDescription description="Dont't have an account yet? " href="/sign-up" label="Sign Up" />
        </div>
    );
});

export default SignIn;
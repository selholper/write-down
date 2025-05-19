import React, { useContext } from 'react';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { AppContext } from 'App';
import FormPage from 'components/FormPage';
import Form from 'components/Form';
import FormInput from 'components/FormInput';
import FormStore from 'stores/view/FormStore';
import { required, email, equals } from 'utils/validator';
import LinkWithDescription from 'components/LinkWithDescription';

const SignUp: React.FC<{ returnPath: string }> = observer((props) => {
    const equals_password = (s: string): string => 
        !equals(s, formStore.fields.password.value) ? 'Wrong password.' : '';

    const { authStore } = useContext(AppContext);
    const formStore = useLocalObservable<FormStore>(() => (
        new FormStore({
            'name': [required],
            'email': [required, email],
            'password': [required],
            'password-repeat': [required, equals_password]
        }, authStore.signUp)
    ));

    return (
        <div className="text-center">
            <FormPage formStore={formStore} returnPath={props.returnPath}>
                <Form title="Sign Up" store={formStore}>
                    <FormInput id="name" type="text" name="name" label="Username"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle color={formStore.fields.name.errorMsg ? 'error' : 'inherit'} />
                                </InputAdornment>
                            )
                        }}></FormInput>
                    <FormInput id="email" type="email" name="email" label="Email"></FormInput>
                    <FormInput id="password" type="password" name="password" label="Password"></FormInput>
                    <FormInput id="password-repeat" type="password" label="Repeat password"></FormInput>
                </Form>
            </FormPage>
            <LinkWithDescription description="Already have an account? " href="/sign-in" label="Sign In" />
        </div>
    );
});

export default SignUp;
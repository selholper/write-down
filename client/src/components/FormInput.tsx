import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, TextFieldProps } from '@mui/material';
import { FormStoreContext } from './Form';

type FormInputProps = Omit<TextFieldProps, 'error' | 'helperText' | 'onChange'>;

const FormInput: React.FC<FormInputProps> = observer(props => {
    const formStore = useContext(FormStoreContext);

    return (
        <TextField {...props}
            size={props.size ? props.size : 'small'} // @ts-ignore
            error={!!formStore.fields[props.id].errorMsg} // @ts-ignore
            helperText={formStore.fields[props.id].errorMsg}
            onChange={((event) => formStore.onFieldChange(event.currentTarget.id, event.currentTarget.value))}>
        </TextField>
    );
});

export default FormInput;
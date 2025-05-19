import React, { createContext, PropsWithChildren } from 'react';
import { Stack, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import FormStore from 'stores/view/FormStore';

interface FormProps {
    title: string
    store: FormStore
}

const submit = async (event: React.FormEvent, onSubmit: (data: FormData) => Promise<void>): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    await onSubmit(data);
};

export const FormStoreContext = createContext<FormStore>({} as FormStore);

const Form: React.FC<PropsWithChildren<FormProps>> = observer(props => (
    <Stack className="z-index-1 p-2 bg-white rounded text-center"
        component="form" onSubmit={async (event) => await submit(event, props.store.submit)} {...props}
        spacing={1.3}
        noValidate>
        <h2>{props.title}</h2>
        <FormStoreContext.Provider value={props.store}>
            {props.children}
        </FormStoreContext.Provider>
        <Button variant="contained" type="submit" disabled={!props.store.allValid}>Submit</Button>
    </Stack>
));

export default Form;
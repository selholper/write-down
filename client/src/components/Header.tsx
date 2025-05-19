import React, { useContext} from 'react';
import { AppBar, Button, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AppContext } from 'App';

const Header: React.FC = () => {
    const { authStore, notesStore } = useContext(AppContext);

    return (
        <AppBar position="sticky" className="d-flex flex-row">
            <IconButton onClick={notesStore.addNote}>
                <Add />
            </IconButton>
            <div className="flex-grow-1" />
            <Button color="inherit" onClick={authStore.signOut}>Logout</Button>
        </AppBar>
    );
};

export default  Header;
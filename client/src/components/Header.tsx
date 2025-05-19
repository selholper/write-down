import React, { useContext} from 'react';
import { AppBar, Button, IconButton, Typography, Box } from '@mui/material';
import { Add, Person } from '@mui/icons-material';
import { AppContext } from 'App';

const Header: React.FC = () => {
    const { authStore, notesStore } = useContext(AppContext);

    return (
        <AppBar position="sticky" className="d-flex flex-row">
            <IconButton onClick={notesStore.addNote}>
                <Add />
            </IconButton>
            <div className="flex-grow-1" />
            {authStore.userInfo && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <Person sx={{ mr: 1 }} />
                    <Typography variant="body1">
                        {authStore.userInfo.name}
                    </Typography>
                </Box>
            )}
            <Button color="inherit" onClick={authStore.signOut}>Logout</Button>
        </AppBar>
    );
};

export default  Header;
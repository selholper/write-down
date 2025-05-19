import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from '@mui/material';
import { AppContext } from 'App';
import Header from 'components/Header';
import NoteCard from 'components/NoteCard';

const Main: React.FC = observer(() => {
    const { notesStore } = useContext(AppContext);

    return (
        <>
            <Header />
            <Grid container sx={{ m: 0, p: 2 }} className="w-100">
                {notesStore.notes?.map((note) => (
                    <Grid sx={{ m: 2 }} className="w-100" item key={note.id}>
                        <NoteCard key={note.id} note={note} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
});

export default Main;
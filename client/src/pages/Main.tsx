import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Typography, Divider, Box } from '@mui/material';
import { AppContext } from 'App';
import Header from 'components/Header';
import NoteCard from 'components/NoteCard';
import { Note } from 'stores/domain/NotesStore';

const Main: React.FC = observer(() => {
    const { notesStore } = useContext(AppContext);
    
    // Separate pinned and unpinned notes
    const pinnedNotes: Note[] = [];
    const unpinnedNotes: Note[] = [];
    
    notesStore.notes?.forEach(note => {
        if (note.isPinned) {
            pinnedNotes.push(note);
        } else {
            unpinnedNotes.push(note);
        }
    });

    return (
        <>
            <Header />
            <Grid container sx={{ m: 0, p: 2 }} className="w-100">
                {/* Pinned Notes Section */}
                {pinnedNotes.length > 0 && (
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Pinned Notes
                        </Typography>
                        {pinnedNotes.map((note) => (
                            <Grid sx={{ m: 2 }} className="w-100" item key={note.id}>
                                <NoteCard key={note.id} note={note} />
                            </Grid>
                        ))}
                        <Divider sx={{ mt: 2, mb: 2 }} />
                    </Box>
                )}
                
                {/* Unpinned Notes Section */}
                {unpinnedNotes.length > 0 && (
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Other Notes
                        </Typography>
                        {unpinnedNotes.map((note) => (
                            <Grid sx={{ m: 2 }} className="w-100" item key={note.id}>
                                <NoteCard key={note.id} note={note} />
                            </Grid>
                        ))}
                    </Box>
                )}
                
                {/* No Notes Message */}
                {(!notesStore.notes || notesStore.notes.length === 0) && (
                    <Typography variant="body1" sx={{ m: 2 }}>
                        No notes yet. Create a new note using the "+" button in the header.
                    </Typography>
                )}
            </Grid>
        </>
    );
});

export default Main;
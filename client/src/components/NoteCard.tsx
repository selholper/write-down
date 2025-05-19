import React, { useContext, useState } from 'react';
import { IconButton, Modal, Paper, Typography, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Note } from 'stores/domain/NotesStore';
import { AppContext } from 'App';

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const { notesStore } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);

    return (
        <>
            <Paper sx={{ p: 2 }} className="d-flex flex-row align-items-baseline"
                role="button" onClick={() => setModalOpen(true)}>
                <div>
                    <Typography variant="h5">{title}</Typography>
                    <Typography>{text}</Typography>
                </div>
                <IconButton sx={{ ml: 'auto' }} onClick={() => notesStore.deleteNote(note.id)}>
                    <Delete />
                </IconButton>
            </Paper>
            <Modal open={modalOpen} onClose={() => { 
                setModalOpen(false);
                void notesStore.updateNote({ id: note.id, title, text });
            }}>
                <Paper sx={{ p: 2 }} style={{ outline: 'none' }} 
                    className="position-absolute top-50 start-50 translate-middle d-flex flex-column w-50">
                    <TextField multiline maxRows={2} placeholder='Title...'
                        value={title} onChange={(event) => setTitle(event.target.value)} />
                    <TextField multiline minRows={3} maxRows={6} placeholder='Text...'
                        value={text} onChange={(event) => setText(event.target.value)} />
                </Paper>
            </Modal>
        </>
    );
};

export default NoteCard;
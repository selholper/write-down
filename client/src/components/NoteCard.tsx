import React, { useContext, useState } from 'react';
import { IconButton, Modal, Paper, Typography, TextField, Box, Tooltip } from '@mui/material';
import { Delete, PushPin, PushPinOutlined, ColorLens } from '@mui/icons-material';
import { Note } from 'stores/domain/NotesStore';
import { AppContext } from 'App';

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const { notesStore } = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [color, setColor] = useState(note.color);
    const [isPinned, setIsPinned] = useState(note.isPinned);

    const handlePinToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newPinnedState = !isPinned;
        setIsPinned(newPinnedState);
        void notesStore.updateNote({ ...note, isPinned: newPinnedState });
    };

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    backgroundColor: color,
                    borderLeft: isPinned ? '5px solid #f0c14b' : 'none'
                }}
                className="d-flex flex-row align-items-baseline"
                role="button"
                onClick={() => setModalOpen(true)}
            >
                <div>
                    <Typography variant="h5">{title}</Typography>
                    <Typography>{text}</Typography>
                </div>
                <Box sx={{ ml: 'auto', display: 'flex' }}>
                    <Tooltip title={isPinned ? "Unpin note" : "Pin note"}>
                        <IconButton onClick={handlePinToggle}>
                            {isPinned ? <PushPin /> : <PushPinOutlined />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete note">
                        <IconButton onClick={(e) => {
                            e.stopPropagation();
                            notesStore.deleteNote(note.id);
                        }}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>
            <Modal open={modalOpen} onClose={() => {
                setModalOpen(false);
                void notesStore.updateNote({ id: note.id, title, text, color, isPinned });
            }}>
                <Paper
                    sx={{ p: 2, backgroundColor: color }}
                    style={{ outline: 'none' }}
                    className="position-absolute top-50 start-50 translate-middle d-flex flex-column w-50"
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Tooltip title="Change note color">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ColorLens sx={{ mr: 1 }} />
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    style={{ width: '30px', height: '30px' }}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title={isPinned ? "Unpin note" : "Pin note"}>
                            <IconButton onClick={() => setIsPinned(!isPinned)}>
                                {isPinned ? <PushPin /> : <PushPinOutlined />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        multiline
                        maxRows={2}
                        placeholder='Title...'
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 1 }}
                    />
                    <TextField
                        multiline
                        minRows={3}
                        maxRows={6}
                        placeholder='Text...'
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 1 }}
                    />
                </Paper>
            </Modal>
        </>
    );
};

export default NoteCard;
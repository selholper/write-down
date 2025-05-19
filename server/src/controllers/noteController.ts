import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { Note } from 'db/models';

export const get = async (req: Req, res: Res): Promise<Res> => {
    const notes = await Note.findAll({ where: { userId: req.user!.id }});
    return res.json(notes);
};

export const create = async (req: Req, res: Res, next: Next): Promise<Res | void> => {
    try {
        const { title, text } = req.body;
        const note = await Note.create({ userId: req.user!.id, title, text });
        return res.json(note);
    }
    catch (err) {
        if (err.errors)
            return res.status(400).send(err.errors[0].message);
        else
            return next(err);
    }
};

export const change = async (req: Req, res: Res): Promise<Res> => {
    const { id, title, text } = req.body;
    const note = await Note.findByPk(id as string);
    if (!note)
        return res.status(400).send('Invalid noteId.');
    if (note.userId !== req.user!.id)
        return res.status(400).send('Permission denied.');
    await note.update({ title, text });
    return res.json(note);
}; 

export const destroy = async (req: Req, res: Res): Promise<Res> => {
    const { noteId } = req.query;
    const note = await Note.findByPk(noteId as string);
    if (!note)
        return res.status(400).send('Invalid noteId.');
    if (note.userId !== req.user!.id)
        return res.status(400).send('Permission denied.');
    await note.destroy();
    return res.send(`Successfully deleted note ${noteId}.`);
};
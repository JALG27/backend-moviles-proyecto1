import {Request, Response} from 'express'
import Nota from "../models/notes"

export const Nuevanota = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.user as any;
    const { titulo, descripcion } = req.body;

    const Newnote = new Nota({
        usuarioId: _id,
        titulo,
        descripcion
    });
    await Newnote.save();
    return res.status(201).json(Newnote);
}

export const Mostrarnota = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.user as any;
    const notes = await Nota.find({usuarioId: _id});
    return res.status(200).json(notes);
}

export const Mostrardetalles = async (req: Request, res: Response): Promise<Response> => {
    const nota = await Nota.findOne({_id:req.params.id});
    if(!nota){
        return res.status(400).json({msg:'La nota no existe'})
 }
 return res.status(201).json(nota);
}

export const Editarnota = async (req: Request, res: Response): Promise<Response> => {
    await Nota.updateOne({_id:req.params.id},{titulo:req.body.titulo, descripcion:req.body.descripcion});
    return res.status(201).json({msg:"Nota guardada"});
}

export const Borrarnota = async (req: Request, res: Response): Promise<Response> => {
    const nota = await Nota.findOne({_id:req.params.id});
    if(!nota){
        return res.status(400).json({msg:'La nota no existe'});
    }
    await Nota.deleteOne({_id:req.params.id});
    return res.status(201).json({msg:"Nota eliminada"});
}

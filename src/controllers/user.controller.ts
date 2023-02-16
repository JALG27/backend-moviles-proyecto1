import {Request, Response} from 'express'
import User, { IUser } from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import Nota, {Notes} from '../models/notes'
import bcrypt from "bcrypt"

function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 604800 // 7 dias o 604800 segundos
    });
}

export const Registro = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Porfavor. Enviar tu nombre, apellido, email y tu password'});
    }

   const user = await User.findOne({ email: req.body.email });
   if (user) {
    return res.status(400).json({msg: 'El usuario ya existe'});
   }

   const Newuser = new User(req.body);
   await Newuser.save();
   return res.status(201).json(Newuser);

};

export const Entrar = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'Porfavor. Enviar tu email y tu password'})
    }

    const user = await User.findOne({ email: req.body.email })
    if(!user) {
        return res.status(400).json({msg: 'El usuario no existe'});
    }

    const isMatch = await user.comparePassword(req.body.password);
    if(isMatch) {
        return res.status(200).json({token: createToken(user)});
    }

    return res.status(400).json({
        msg: 'El email o el password son incorrectos'
    });
}

export const Borrarusuario = async (req: Request, res: Response): Promise<Response> => {
        const { _id } = req.user as any;
        const usuario = await User.findOne({_id });
    if(!usuario){
        return res.status(400).json({msg:'El usuario no existe'});
    }
    await User.deleteOne({_id});
    await Nota.deleteMany({usuarioId: _id});
    return res.status(201).json({msg:"Usuario eliminado"});

}

export const EditarUsuario = async (req: Request, res: Response): Promise<Response> => {
    // const { nombre, apellido, email, password } = req.body;
    const { _id } = req.user as any;
    const { password, ...rest } = req.body;
    let editUser = {
        ...rest
    };
    if(password){
        editUser = {
            ...editUser,
            password: await cambiarPassword(password)
        }
    }
    await User.updateOne({_id }, editUser);
    const user = await User.findOne({_id });
    return res.status(201).json({msg:"Usuario guardado", user});
}

export const MostrarDetallesUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.user as any;
    const user = await User.findOne({_id});
    if(!user){
        return res.status(400).json({msg:'user no existe'})
 }
 return res.status(201).json(user);
}

const cambiarPassword = async (pass : string) =>{
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(pass, salt)
    return password;

}
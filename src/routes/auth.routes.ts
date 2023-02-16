
import {Router} from 'express'
import passport, { session } from 'passport'
const router = Router();

import {Registro, Entrar,  Borrarusuario, EditarUsuario, MostrarDetallesUsuario} from '../controllers/user.controller'
import {Nuevanota, Mostrarnota, Mostrardetalles, Editarnota, Borrarnota} from '../controllers/notes.controller'

router.post('/Registro', Registro)
router.post('/Entrar', Entrar)

router.route('/user')
        .delete(passport.authenticate('jwt', {session: false}), Borrarusuario)
        .put(passport.authenticate('jwt', {session: false}), EditarUsuario) // Editar una nota
        .get(passport.authenticate('jwt', {session: false}), MostrarDetallesUsuario) // Usuario por id del token

router.route('/Nota')
    .post(passport.authenticate('jwt', {session: false}),Nuevanota) // Crear nota
    .get(passport.authenticate('jwt', {session: false}), Mostrarnota) // MOstrar notas por el usuario del token

router.route('/Nota/:id')
        .get(Mostrardetalles) // Obtener una nota por id
        .put(Editarnota) // Editar una nota
        .delete(Borrarnota) // Borrar una nota

export default router;
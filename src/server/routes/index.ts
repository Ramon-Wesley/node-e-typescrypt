import {Router} from 'express';

import {CidadesController, UsuariosController} from '../controllers';
import { PessoasController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();


router.get('/', (req, res) => {
  return res.send('Olá, DEV!');
});
router.get('/cidades',ensureAuthenticated ,CidadesController.getAllValidation,CidadesController.getAll);
router.get('/cidades/:id',ensureAuthenticated ,CidadesController.getByIdValidation,CidadesController.getById);
router.post('/cidades',ensureAuthenticated ,CidadesController.createValidation,CidadesController.create);
router.put('/cidades/:id',ensureAuthenticated ,CidadesController.updateBYIdValidation,CidadesController.updateById);
router.delete('/cidades/:id',ensureAuthenticated ,CidadesController.deleteByIdValidation,CidadesController.deleteById);

router.get('/pessoas',ensureAuthenticated ,PessoasController.getAllValidation,PessoasController.getAll);
router.get('/pessoas/:id',ensureAuthenticated ,PessoasController.getByIdValidation,PessoasController.getById);
router.post('/pessoas',ensureAuthenticated ,PessoasController.createValidation,PessoasController.create);
router.put('/pessoas/:id',ensureAuthenticated ,PessoasController.updateByIdValidation,PessoasController.upadateById);
router.delete('/pessoas/:id',ensureAuthenticated ,PessoasController.deleteByIdValidation,PessoasController.deleteById);


router.post('/entrar',UsuariosController.signInValidation,UsuariosController.signIn)
router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.signUp)



export {router};
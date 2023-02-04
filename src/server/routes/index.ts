import {Router} from 'express';

import {CidadesController, UsuariosController} from '../controllers';
import { PessoasController } from '../controllers';

const router = Router();


router.get('/', (req, res) => {
  return res.send('Olá, DEV!');
});;
router.get('/cidades',CidadesController.getAllValidation,CidadesController.getAll);
router.get('/cidades/:id',CidadesController.getByIdValidation,CidadesController.getById);
router.post('/cidades',CidadesController.createValidation,CidadesController.create);
router.put('/cidades/:id',CidadesController.updateBYIdValidation,CidadesController.updateById);
router.delete('/cidades/:id',CidadesController.deleteByIdValidation,CidadesController.deleteById);

router.get('/pessoas',PessoasController.getAllValidation,PessoasController.getAll);
router.get('/pessoas/:id',PessoasController.getByIdValidation,PessoasController.getById);
router.post('/pessoas',PessoasController.createValidation,PessoasController.create);
router.put('/pessoas/:id',PessoasController.updateByIdValidation,PessoasController.upadateById);
router.delete('/pessoas/:id',PessoasController.deleteByIdValidation,PessoasController.deleteById);


router.post('/entrar',UsuariosController.signInValidation,UsuariosController.signIn)
router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.signUp)



export {router};
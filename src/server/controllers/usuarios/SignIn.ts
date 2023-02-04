import {StatusCodes} from 'http-status-codes'
import * as yup from 'yup'
import { IUsuario } from '../../database/models'
import { validation } from '../../shared/middleware'
import { Request,Response } from 'express'
import { UsuariosProvider } from '../../database/providers/usuarios'
interface IBodyProp extends Omit<IUsuario,'id'|'nome'>{}


export const signInValidation=validation((getSchema)=>({
  body:getSchema<IBodyProp>(yup.object().shape({
    email:yup.string().required().email().min(5),
    senha:yup.string().required().min(6)
  }))
}))


export const signIn=async(req:Request<{},{},IBodyProp>,res:Response)=>{

const {email,senha} = req.body

const result = await UsuariosProvider.getByEmail(email)

if(result instanceof Error){
return res.status(StatusCodes.UNAUTHORIZED).json({
  errors:{
    default:'Email ou senha inválidos'
  }
})
}

if(senha !== result.senha){
  return res.status(StatusCodes.UNAUTHORIZED).json({
    errors:{
      default:'Email ou senha inválidos'
    }
  })
}else{
  return res.status(StatusCodes.OK).json({accessToken: 'teste.teste.teste'})
}

//return res.status(StatusCodes.CREATED).json(result)
}
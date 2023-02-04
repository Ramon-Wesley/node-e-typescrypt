import { Request,Response } from "express";
import * as yup from 'yup'
import {StatusCodes} from 'http-status-codes'
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middleware";
import { UsuariosProvider } from "../../database/providers/usuarios";

interface IBodyProps extends Omit<IUsuario,'id'>{}


export const signUpValidation=validation((getSchema)=>({
  body:getSchema<IBodyProps>( yup.object().shape({
    email:yup.string().email().required().min(5),
    nome:yup.string().required().min(3),
    senha:yup.string().required().min(6)
  }))
}))


export const signUp=async(req:Request<{},{},IBodyProps>,res:Response)=>{
if(!req.body){
  return res.status(StatusCodes.BAD_REQUEST).json({errors:{default:'Valores inválidos!'}})
}

  const result= await UsuariosProvider.create(req.body)

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:{
      default:result.message
    }})
  }

  return res.status(StatusCodes.CREATED).json(result)
}
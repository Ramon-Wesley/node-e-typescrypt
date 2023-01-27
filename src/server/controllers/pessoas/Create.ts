import { Request,Response } from "express";
import * as yup from 'yup';
import {StatusCodes} from 'http-status-codes'
import { validation } from "../../shared/middleware";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IBodyProps extends Omit<IPessoa,'id'>{ }


export const createValidation=validation((getSchema)=>({
  body:getSchema<IBodyProps>(yup.object().shape({
    cidadeId:yup.number().integer().required().moreThan(0),
    email:yup.string().email().required(),
    nomeCompleto:yup.string().min(8).required()
  }))
}))


export const create=async(req:Request<{},{},IBodyProps>,res:Response)=>{
const result = await PessoasProvider.create(req.body)

if(result instanceof Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:{
    default:result.message
  }})
}else{
return res.status(StatusCodes.CREATED).json(result)
}
}
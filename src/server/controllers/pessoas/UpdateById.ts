import { Request,Response } from "express";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps{
  id?:number
}

interface IBodyProps extends Omit<IPessoa,'id'>{}

export const updateByIdValidation=validation((getSchema)=>({
  params:getSchema<IParamsProps>(yup.object().shape({
    id:yup.number().integer().moreThan(0).required()
  })),
  body:getSchema<IBodyProps>(yup.object().shape({
    cidadeId:yup.number().integer().required().moreThan(0),
    email:yup.string().email().required(),
    nomeCompleto:yup.string().required().min(7)
  }))
}))

export const upadateById=async(req:Request<IParamsProps,{},IBodyProps>,res:Response)=>{
  if(!req.params.id){
     return res.status(StatusCodes.BAD_REQUEST)
     .json({errors:{default:'Adicione um "id" válido!'}})
  }
  const result =await PessoasProvider.updateById(req.params.id,req.body)
  if(result instanceof Error){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:result.message})
  }
  return res.status(StatusCodes.NO_CONTENT).json(result)
}
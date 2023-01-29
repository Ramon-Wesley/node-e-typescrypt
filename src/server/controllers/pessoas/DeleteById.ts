import { Request,Response } from "express";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps{
  id?:number
}

export const deleteByIdValidation=validation((getSchema)=>({
  params:getSchema<IParamsProps>(yup.object().shape({
    id:yup.number().integer().moreThan(0).required()
  }))
}))

export const deleteById=async(req:Request<IParamsProps>,res:Response)=>{
if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({errors:{default:'Adicione um "id" válido! '}})

  const result = await PessoasProvider.deleteById(req.params.id)

  if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:{
    default:result.message
}})

  return res.status(StatusCodes.NO_CONTENT).send()
}
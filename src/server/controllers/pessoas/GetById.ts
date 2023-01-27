import { Request,Response } from "express";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamsProps{
  id?:number
}

export const getByIdValidation=validation((getSChema)=>({
  params:getSChema<IParamsProps>(yup.object().shape({
    id:yup.number().integer().required().moreThan(0)
  }))
}))

export const getById=async(req:Request<IParamsProps>,res:Response)=>{
  if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
    errors:{
      default:'O registro "id" precisa ser informado!'
    }
  })
  

const result = await PessoasProvider.getById(req.params.id)

if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:result.message})

return res.status(StatusCodes.OK).json(result)

}
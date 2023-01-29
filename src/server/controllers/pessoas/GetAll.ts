import { Request,Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IQueryProps{
  page?:number,
  limit?:number,
  filter?:string
}

export const getAllValidation=validation((getSchema)=>({
  query:getSchema<IQueryProps>(yup.object().shape({
    filter:yup.string().notRequired(),
    limit:yup.number().integer().moreThan(0).notRequired(),
    page:yup.number().integer().moreThan(0).notRequired()
  }))
}))


export const getAll=async(req:Request<{},{},{},IQueryProps>,res:Response)=>{

  const result = await PessoasProvider.getAll(req.query.filter || "" ,req.query.limit || 7, req.query.page || 1 )
  const count = await PessoasProvider.count(req.query.filter)

  if(result instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:{default:result.message}})

  if(count instanceof Error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors:{default:count.message}})

res.setHeader("access-control-expose-headers","x-total-count")
res.setHeader("x-total-count", count)

return res.status(StatusCodes.OK).json(result)

}
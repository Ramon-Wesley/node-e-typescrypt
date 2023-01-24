import { Request, Response,RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

interface IQueryProps{
  id?:number;
  page?:number;
  limit?:number;
  filter?:string;
}

// const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
//   nome: yup.string().required().min(3),
//   estado:yup.string().required().min(3),
// });

export const getAllValidation =validation((getSchema)=>({
  query:getSchema<IQueryProps>( yup.object().shape({
  page: yup.number().notRequired().moreThan(0),
  limit:yup.number().notRequired().moreThan(0),
  filter:yup.string().notRequired(),
  id:yup.number().notRequired().integer().default(0)
})),

}));

export const getAll = async (req:Request<{},{},{},IQueryProps>,res:Response)=>{

 const result= await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "",Number (req.query.id))
 const count = await CidadesProvider.count(req.query.filter)
 
 if(result instanceof Error) {
  return res.status(StatusCodes.BAD_REQUEST).json({
    errors:{
      default:result.message
    }
  })
 }else if(count instanceof Error){
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default:count.message
    }
  })
 }
 res.setHeader('access-control-expose-headers', 'x-total-count');
 res.setHeader('x-total-count', count);


 return res.status(StatusCodes.OK).json(result);

};
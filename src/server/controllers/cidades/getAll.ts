import { Request, Response,RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface IQueryProps{
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
  filter:yup.string().notRequired()
})),

}));

export const getAll = async (req:Request<{},{},{},IQueryProps>,res:Response)=>{
  res.setHeader('access-control-expose-headers','x-total-count');
  res.setHeader('x-total-count',1);
  
  return res.status(StatusCodes.OK).json([
    {
      id:1,
      nome:"Caxias"
    }
  ])
  
};
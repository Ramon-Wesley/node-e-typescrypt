import { Request, Response,RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ICidade } from "../../database/models";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<ICidade,'id'>{}

// const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
//   nome: yup.string().required().min(3),
//   estado:yup.string().required().min(3),
// });

export const createValidation =validation((getSchema)=>({
  body:getSchema<IBodyProps>( yup.object().shape({
  nome: yup.string().required().min(3),
}))

}));

export const create = async (req:Request<{},{},ICidade>,res:Response)=>{
  console.log(req.body);
  
  return res.status(StatusCodes.CREATED).json(1);
  
}
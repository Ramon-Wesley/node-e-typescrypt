import { RequestHandler } from "express";
import {SchemaOf,ValidationError} from 'yup'
import { StatusCodes } from "http-status-codes";




type TProperty= 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: SchemaOf<T>)=> SchemaOf<any>;

type TAllSchemas = Record<TProperty,SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema)=> Partial<TAllSchemas>;

type TValidation = (getAllAchemas:TGetAllSchemas)=>RequestHandler;


export const validation : TValidation=(getAllAchemas)=>async(req,res,next)=>{
  const schemas = getAllAchemas((schema) => schema);
  const errorsResult: Record<string,Record<string, string>>={};

  Object.entries(schemas).forEach(([key,schema])=>{
    try{
       schema.validateSync(req[key as TProperty], {abortEarly: false})
      // return next();
   }catch(error){
     const yupError = error as ValidationError;
     const errors:Record<string,string> ={};
 
     yupError.inner.forEach(error =>{
       if(error.path === undefined) return;
 
       errors[error.path] = error.message;
     });

     errorsResult[key]= errors;
    // return res.status(StatusCodes.BAD_REQUEST).json({errors});
   }
  })

  if(Object.entries(errorsResult).length === 0){
    return next();
  }else{
    return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
  }
};
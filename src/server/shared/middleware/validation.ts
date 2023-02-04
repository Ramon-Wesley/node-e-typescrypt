import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import {SchemaOf,ValidationError} from 'yup'

type TProperty='body'|'query' |'params'| 'header'
type TGetSChema=<T>(getSchema:SchemaOf<T>)=>SchemaOf<T>
type TAllSchema=Record<TProperty,SchemaOf<any>>
type TGetAllSchema=(getSchema:TGetSChema)=>Partial<TAllSchema>

type TValidation=(getSchema:TGetAllSchema)=>RequestHandler

export const validation:TValidation=(getSchema)=>async(req,res,next)=>{
    const schemas = getSchema((schema)=>schema)
    const ErrorResult:Record<string,Record<string,string>>={}

    
    Object.entries(schemas).forEach(([key,schema])=>{
        try {
            schema.validateSync(req[key as TProperty],{abortEarly:false})
        } catch (err) {
            const yupError=err as ValidationError
            const errors:Record<string,string>={}
                yupError.inner.forEach((error)=>{
                    if(error.path === undefined) return 
                    errors[error.path]=error.message
                })
                ErrorResult[key]=errors
        }
    })
if(Object.entries(ErrorResult).length === 0){
    return next()
}else{

    return res.status(StatusCodes.BAD_REQUEST).json({errors:ErrorResult})
}

}
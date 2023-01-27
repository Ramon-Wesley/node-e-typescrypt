import { Knex } from "../../knex";
import { ETableNames } from "../../ETableName";
import { IPessoa } from "../../models";


export const getAll=async(filter:string,limit:number,page:number):Promise<IPessoa[] | Error>=>{

  try {
    const result=await Knex(ETableNames.pessoa)
    .select('*')
    .where('nomeCompleto','like',`%${filter}%`)
    .offset((page-1)*limit)
    .limit(limit)

    return result
  } catch (error) {
    console.log(error)
    return new Error("Erro ao listar os registros!")
  }

} 
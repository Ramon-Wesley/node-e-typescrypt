import knex from "knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../seeds/E TableName";


export const create = async (cidade:Omit<ICidade,'id'>):Promise<number | Error> =>{
  try {
    const [result] = await knex(ETableNames.cidade).insert(cidade).returning('id');

    if(typeof result==='object'){
      return result.id
    }else if(typeof result === 'number'){
      return result
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
  console.log(error);
  return new Error('Erro ao cadastrar o regiistro')  
  }
}
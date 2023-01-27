import { Knex } from "../../knex";
import { ETableNames } from "../../ETableName";


export const deleteById=async(id:number):Promise<void | Error> =>{

  try {
    const result=await Knex(ETableNames.pessoa)
    .where('id','=',id)
    .del()

    if(result > 0) return

    return new Error('Erro ao excluir o cadastro!')

  } catch (error) {
    console.log(error)

    return new Error('Erro ao excluir o cadastro!')
  }
}

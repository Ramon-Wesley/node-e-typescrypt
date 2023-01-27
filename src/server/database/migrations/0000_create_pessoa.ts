import knex, { Knex } from 'knex' ;
import { ETableNames } from '../ETableName';


export async function up(knex: Knex) {
  knex.schema.createTable(ETableNames.pessoa, table =>{
    table.bigIncrements('id').primary().index();
    table.string('nomeCompleto').index().notNullable();
    table.string('email').unique().notNullable();

    table
    .bigInteger('cidadeId')
    .index()
    .references('id')
    .inTable(ETableNames.cidade)
    .onUpdate('CASCADE')
    .onDelete("RESTRICT");

    table.comment('Tabela usada para armazenar pessoas no sistema!');
  }).then(()=>{
    console.log(`# Created Table ${ETableNames.pessoa}`)
  })
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa)
.then(()=>{
  console.log(`# Dropped table ${ETableNames.pessoa}`)
})
}


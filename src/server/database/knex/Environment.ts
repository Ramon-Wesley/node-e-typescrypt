import {Knex} from 'knex'
import path from 'path';


export const development:Knex.Config={
  client:'sqlite3',
  useNullAsDefault:true,
  connection:{
    filename:path.resolve(__dirname,'..','..','..','..','database_.sqlite')
  },
  migrations: {
    directory:path.resolve(__dirname,'..','migrations')
  },
  seeds: {
    directory:path.resolve(__dirname,'..','seeds')
  },
  pool:{
    afterCreate: (connection:any,done:Function)=>{
      connection.run('PRAGMA foreign_keys = ON')
      done();
    }
  }
};

export const test:Knex.Config = {
  ...development,
  connection:':memory:',
};

export const production:Knex.Config={
client:'pg',
migrations:{
  directory:path.resolve(__dirname,'..','migrations')
},

seeds:{
  directory:path.resolve(__dirname,'..','seeds')
},
connection:{
  host:process.env.DATABASE_HOST,                       
  database:process.env.DATABASE_NAME,
  password:process.env.DATABASE_PASSWORD,
  user:process.env.DATABASE_USER,
  port:Number(process.env.DATABASE_PORT),
  ssl:{rejectUnauthorized:false}
}
};
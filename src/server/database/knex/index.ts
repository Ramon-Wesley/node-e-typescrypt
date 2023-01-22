import Knex from 'Knex';
import {development,production,test} from './Environment'

const getEnvironment= ()=>{
  switch(process.env.NODE_ENV){
    case'production':return production;
    case 'test':return test;

    default:return development;
  }
};

export const knex=Knex(getEnvironment());
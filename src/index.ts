import { Knex } from './server/database/knex';
import { server } from './server/server';

const localhost=process.env.ON_LOCALHOST 
const port=process.env.PORT as number | undefined


const serverListen=():void=>{
  server.listen(port|| 8000, () => console.log(`App rodando na porta ${port || 8000}`));
}

if(localhost !== 'true'){
  Knex.migrate
  .latest()
  .then(()=>{
    Knex.seed.run().then(()=>{
      serverListen()
    }).catch(console.log)
    
  })
  .catch(console.log)
}else{
  serverListen();
}



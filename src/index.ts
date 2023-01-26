import { Knex } from './server/database/knex';
import { server } from './server/server';

const localhost=process.env.ON_LOCALHOST

const serverListen=():void=>{
  server.listen(process.env.PORT|| 3333, () => console.log(`App rodando na porta ${process.env.PORT || 3333}`));
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



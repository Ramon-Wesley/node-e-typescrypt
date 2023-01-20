
import {StatusCodes} from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades = updateById',()=>{

  it('Atualiaza registro', async()=>{
    const tes1= await testServer
    .post('/cidades')
    .send({nome:'caxias'})
    expect(tes1.statusCode).toEqual(StatusCodes.CREATED);

    const testUpdated= await testServer
    .put(`cidades/${tes1.body}`)
    .send({nome: "Caxias"});

    expect(tes1.statusCode).toEqual(StatusCodes.NO_CONTENT)

  });

  it('Tenta atualizqar registro que não existe', async()=>{
    const res1=await testServer
    .put('/cidades/99999')
    .send({nome:'caxias'})

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default')

  })
})
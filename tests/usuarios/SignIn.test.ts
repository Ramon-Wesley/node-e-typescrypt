import {StatusCodes} from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Usuarios - SigniIn',()=>{

beforeAll(async()=>{
  await testServer.post('/cadastrar').send({
    nome:'Jorge',
    senha:'123456',
    email:'jorge@gmail.com',
  })
})

it('Faz Login',async()=>{
  const res1= await testServer.post('/entrar')
  .send({
    senha:'123456',
    email:'jorge@gmail.com'
  })
  expect(res1.statusCode).toEqual(StatusCodes.OK)
  expect(res1.body).toHaveProperty('accessToken');
})
it('Senha errada',async()=>{
  const res1= await testServer.post('/entrar')
  .send({
    senha:'1234567',
    email:'jorge@gmail.com'
  });
  expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  expect(res1.body).toHaveProperty('errors.default');
})
it('email errado',async ()=>{
  const res1=await testServer
  .post('/entrar')
  .send({
    senha:'123456',
    email:'jorgeeeeeeeeee@gmail.com'
  })
  expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  expect (res1.body).toHaveProperty('errors.default')

})
it('Formato do email inválido',async()=>{
  const res1=await testServer
  .post('/entrar')
  .send({
    senha:'123456',
    email:'jorgegmail.com'
  })

  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(res1.body).toHaveProperty('errors.body.email')
})
it('Senha curta',async()=>{
  const res1=await testServer
  .post('/entrar')
  .send({
    senha:'12',
    email:'jorge@gmail.com'
  })
  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(res1.body).toHaveProperty('errors.body.senha')
})
it('Senha não informada',async()=>{
  const res1=await testServer
  .post('/entrar')
  .send({
    email:'jorge@gmail.com'
  })
  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(res1.body).toHaveProperty('errors.body.senha')
})
it('Email não informado',async()=>{
  const res1=await testServer.post('/entrar')
  .send({
    senha:'123456'
  })
  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(res1.body).toHaveProperty('errors.body.email')
})
})

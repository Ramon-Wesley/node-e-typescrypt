// import { StatusCodes } from "http-status-codes";
// import {testServer} from '../jest.setup'

// describe('Testa controller de cadastro de usuario',()=>{
// it('Cadastra o usuário 1',async()=>{
//   const res1= await testServer
//   .post('/cadastrar')
//   .send({
//     senha:'123456',
//     nome:'Juca da Silva',
//     email: 'Jucasilva@gmail.com'
//   })

//   expect(res1.statusCode).toEqual(StatusCodes.CREATED)
//   expect(typeof res1.body).toEqual('number')

// })
// it('Cadastra usuario 2',async ()=>{
// const res1= await testServer
// .post('/cadastrar')
// .send({
//   senha:'123456',
//   nome:'Pedro da Rosa',
//   email:'Pedro@Gmail.com'
// })
// expect(res1.statusCode).toEqual(StatusCodes.CREATED)
// expect(typeof res1.body).toEqual('number')

// })
// it('Erro ao cadastrar um usuario com email duplicado', async()=>{
//   const res1=await testServer
//   .post('/cadastrar')
//   .send({
//     senha:'123456',
//     nome:'Pedro da Rosa',
//     email:'pedroDuplicado@Gmail.com'
//   })
  
//   expect(res1.statusCode).toEqual(StatusCodes.CREATED)
//   expect(typeof res1.body).toEqual('number')

//   const res2=await testServer
//   .post('/cadastrar')
//   .send({
//     senha:'123456',
//     nome:'Juca da Silva',
//     email:'pedroDuplicado@Gmail.com'
//   })
//   expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
//   expect(res2.body).toHaveProperty('Errors.default')
// })
// it('Erro ao cadastrar um usuario sem email'),async()=>{
//   const res1=await testServer
//   .post('/cadastrar')
//   .send({
//     senha:'123456',
//     nome:'Juca da Silva'
//   })
//   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
//   expect(res1.body).toHaveProperty('errors.body.email')
// }
// it('Erro ao cadastrar o usuário sem nome',async()=>{
//   const res1=await testServer
//   .post('/cadastrar')
//   .send({
//     senha:'123456',
//     email:'Joao@Gmail.com'
//   })
//   expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
//   expect(res1.body).toHaveProperty('errors.body.nome')
// })
// it('Erro ao cadastrar o usuario sem a senha',async()=>{
//   const res1=await testServer
//   .post('cadastrar')
//   .send({
//     nome:'Joao pereira',
//     email:'JoãoPereira@Gmail.com'
//   })
// })
// })
export{}
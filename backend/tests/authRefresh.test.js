import request from 'supertest';
import app from '../app.js'; 
import User from '../Models/User_model.js'; 
import mongoose from 'mongoose';


describe('AuthController - Logout', () => {
  const usuarioTeste = {
    email: 'logout@teste.com',
    password: 'senhaforte123',
    username: 'Teste Logout', //mudado para username, já que não temos fullname no modelo de usuário
  };

  let accessToken = '';
  let refreshToken = '';

  beforeAll(async () => {
    // Clean up test user if it exists
    await User.deleteMany({ email: usuarioTeste.email });

    // Register a new test user
    const registerResponse = await request(app)
      .post('/api/v1/auth/register')
      .send(usuarioTeste);

    // Log
    console.log('Register response:', registerResponse.status, registerResponse.body);

    // Login to obtain tokens
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: usuarioTeste.email, password: usuarioTeste.password });

    // Extract accessToken and refreshToken from cookies
    accessToken = loginResponse.headers['set-cookie']
      ?.find(cookie => cookie.includes('accessToken'))
      ?.split(';')[0]
      .split('=')[1] || '';
    refreshToken = loginResponse.headers['set-cookie']
      ?.find(cookie => cookie.includes('refreshToken'))
      ?.split(';')[0]
      .split('=')[1] || '';
  });

  afterAll(async () => {
    // limpar o ambiente de teste, removendo usuário de teste novamente
    await User.deleteMany({ email: usuarioTeste.email });
    await mongoose.connection.close();
  });

  it('deve limpar accessToken e refreshToken cookies com sucesso no logout', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout') // Substituímos o método GET por POST nesta rota para permitir o envio seguro de dados no corpo da requisição, e por ser o nosso metodo no authroute
      .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout realizado');

    // Verificar se os cookies foram limpos
    const cookies = response.headers['set-cookie'] || [];
    const accessTokenCookie = cookies.find(cookie => cookie.includes('accessToken'));
    const refreshTokenCookie = cookies.find(cookie => cookie.includes('refreshToken'));

    expect(accessTokenCookie).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT'); // mudança para expired date, pois não utilizamos o metode de age = 0, ele retornava um mismatch
    expect(refreshTokenCookie).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT'); 
  });

  it('deve retornar sucesso mesmo sem tokens válidos', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .set('Cookie', ['accessToken=invalid', 'refreshToken=invalid']);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout realizado');

    //Verificar se os cookies foram limpos
    const cookies = response.headers['set-cookie'] || [];
    const accessTokenCookie = cookies.find(cookie => cookie.includes('accessToken'));
    const refreshTokenCookie = cookies.find(cookie => cookie.includes('refreshToken'));

    expect(accessTokenCookie).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT'); // mudança para expired date, pois não utilizamos o metode de age = 0, ele retornava um mismatch
    expect(refreshTokenCookie).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT'); 
  });
});
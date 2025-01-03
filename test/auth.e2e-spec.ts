import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handels a signup system', () => {
    const myEmail = 'myemail@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: myEmail, password: '123123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(myEmail);;
      });
  });

  it('create new user and get currenct user', async () => {

    const email = 'myemail@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123123' })
      .expect(201);
    
    const cookie = res.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .send()
      .expect(200);
    
    expect(body.email).toEqual(email);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication();
    await app.init();
  });

  const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RkNTQ3MWJmNjg3Njg4NTI3MjI0NDkiLCJuYW1lIjoiZHVtbXkgbmFtZSAyIiwiZW1haWwiOiJiY0BjYmRkLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiX192IjowLCJpYXQiOjE2NzU1Njg1MjR9.0okd0e_GziHM1xlEOdZTZoT02UmuFTHmrbulalMTTD0';
  let blogId = '';

  it('/api/blog (POST)  for creating blog by authenticated user', () => {
    return request(app.getHttpServer())
      .post('/api/blog')
      .set({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        title: 'fake title',
        description: 'fake description',
      })
      .expect(201)
      .then((response) => {
        blogId = response.body.blog._id;
        console.log(blogId);
      });
  });

  it('/api/blog (PUT)  for editing blog by authenticated user', () => {
    return request(app.getHttpServer())
      .put(`/api/blog/${blogId}`)
      .set({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      })
      .send({
        title: 'updated title',
        description: 'fake description',
      })
      .expect(200);
  });

  it('/api/blog (DELETE)  for deleting blog by authenticated user', () => {
    return request(app.getHttpServer())
      .delete(`/api/blog/${blogId}`)
      .set({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      })
      .expect(200);
  });
});

const request = require('supertest');
const app = require('../app');

describe('Student Feedback DevOps App', () => {
  test('GET / should return homepage', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Student Feedback DevOps App');
  });

  test('POST /feedback should submit valid feedback', async () => {
    const response = await request(app)
      .post('/feedback')
      .send({
        name: 'Madusha',
        message: 'This is a test feedback message.'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Feedback submitted successfully.');
  });

  test('POST /feedback should reject missing fields', async () => {
    const response = await request(app)
      .post('/feedback')
      .send({
        name: '',
        message: ''
      });

    expect(response.statusCode).toBe(400);
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});
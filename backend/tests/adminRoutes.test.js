const request = require('supertest');
const app = require('../routes/adminRoutes');
const AdminModel = require('../models/AdminModel');


describe('Admin Routes', () => {
    beforeEach(async () => {
      // Clear the Admin collection before each test
      await AdminModel.deleteMany({});
    });

describe('POST  /api/admin/register', () => {
    it('should register a new admin', async () => {
        const response = await request(app)
        .post('/api/admin/register')
        .send({
            name:'Joe',
            surname:'Doe',
            username:'johndoe@gmail.com',
            password: 'doe123'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('adminToken');
    });

    it('should check if username is in use', async () => {
        await AdminModel.create({
            username: 'johndoe@gmail.com',
            password: 'doe123'
        });

        const response = await request(app)
        .post('api/admin/register')
        .send({
            name: 'Joe',
            surname: 'Doe',
            username: 'johndoe@gmail.com',
            password: 'doe123'
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username already in use. Please choose a different username.');

    });
});

describe('POST /api/admin/login', () => {
    it('should login with correct credentials', async () => {
      // Create a sample admin for testing login
      const existingAdmin = await AdminModel.create({
        name: 'John',
        surname: 'Doe',
        username: 'johndoe@gmail.com',
        password: 'doe123'
      });

      const response = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'johndoe@gmail.com',
          password: 'doe123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('username', existingAdmin.username);
      expect(response.body).toHaveProperty('adminId', existingAdmin._id.toString());

      // You can add more assertions based on your application logic
    });

    it('should return 401 if credentials are invalid', async () => {
      const response = await request(app)
        .post('/api/admin/login')
        .send({
          username: 'non_existing_user',
          password: 'invalid_password'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  })});

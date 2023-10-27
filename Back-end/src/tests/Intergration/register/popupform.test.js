const app =  require('../../../index')
const request = require('supertest')
const {User} = require('../../../Models/User')

describe('User Profile API', () => {
    it('should return user profile data', async () => {
      // Create a test user for testing
      const testUser = new User({
        firstName: 'John',
        lastName: 'Doe',
        mobile: '1234567891',
        NIC: '1234567890',
        password: '12345678',
        email: 'johndoe@example.com',
      });
  
      // Save the user to the database
      await testUser.save();
  
      const response = await request(app)
        .post('/popupform') 
        .send({
          userID: testUser._id, 
        });
  
      expect(response.status).toBe(200); // Assuming you return 200 for a successful response
      expect(response.body).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        mobile: '1234567891',
        NIC: '1234567890',
        email: 'johndoe@example.com',
      });
    });
  
    it('should handle a non-existent user', async () => {
      const response = await request(app)
        .post('/popupform') 
        .send({
          userID: 'nonexistentuserid', // Provide a non-existent user ID
        });
  
      expect(response.status).toBe(500); // Assuming you return a success status code even for non-existent users
      expect(response.body).toEqual({}); // Empty response for non-existent user
    });
  });
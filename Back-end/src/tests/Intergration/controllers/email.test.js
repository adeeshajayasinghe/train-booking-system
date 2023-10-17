const {verifyEmail} = require('../../../Controllers/users');
const { User } = require('../../../Models/User');

describe('verifyEmail', () => {
    it('should return 400 if user is not found', async () => {

        jest.mock('../../../Models/User')
        const req = {
            params: {
                id: "1",
                emailToken: "token"
            }
        };

        const res = {
            status: jest.fn(),
            send: jest.fn()
        };
        jest.spyOn(User, 'findById');
        User.findById.mockResolvedValue(null);
        
        await verifyEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it('should return 400 if emailToken is not found', async () => {

        jest.mock('../../../Models/User')
        const req = {
            params: {
                id: "1",
                emailToken: "token"
            }
        };

        const res = {
            status: jest.fn(),
            send: jest.fn()
        };
        jest.spyOn(User, 'findById');
        User.findById.mockResolvedValue(null);
        jest.spyOn(User, 'findOne');
        User.findOne.mockResolvedValue(null);
        
        await verifyEmail(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
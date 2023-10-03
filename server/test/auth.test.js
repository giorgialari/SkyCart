const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const authController = require('../controllers/auth');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('Auth Controller', () => {

  describe('Login', () => {
    let findUserByUsernameStub, compareStub, signStub;

    beforeEach(() => {
      findUserByUsernameStub = sinon.stub(userModel, 'findUserByUsername');
      compareStub = sinon.stub(bcrypt, 'compare');
      signStub = sinon.stub(jwt, 'sign');
    });

    afterEach(() => {
      findUserByUsernameStub.restore();
      compareStub.restore();
      signStub.restore();
    });

    it('should return a token when login is successful', async () => {
      const user = {
        username: 'testUsername',
        password: 'testPassword',
      };

      findUserByUsernameStub.resolves(user);
      compareStub.resolves(true);
      signStub.returns('some-token');

      const req = {
        body: user,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await authController.login(req, res, () => {});

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.json.calledOnceWith({ token: 'some-token', userId: undefined })).to.be.true;
    });

  });

  describe('Create User', () => {
    let findUserByUsernameStub, createUserStub;

    beforeEach(() => {
      findUserByUsernameStub = sinon.stub(userModel, 'findUserByUsername');
      createUserStub = sinon.stub(userModel, 'createUser');
    });

    afterEach(() => {
      findUserByUsernameStub.restore();
      createUserStub.restore();
    });

    it('should create a user successfully', async () => {
      findUserByUsernameStub.resolves(null);
      createUserStub.resolves({ insertId: 1 });

      const req = {
        body: {
          username: 'testUsername',
          password: 'testPassword',
          name: 'testName',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      await authController.createUser(req, res, () => {});

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'User created', userId: 1 })).to.be.true;
    });

  });

});

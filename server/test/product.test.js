const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const productsController = require('../controllers/products');
const productsModel = require('../models/product');

describe('Products Controller', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllProducts', () => {
    it('should get all products', async () => {
      const getAllProductsStub = sinon.stub(productsModel, 'getAllProducts').resolves([{ id: 1 }, { id: 2 }]);
      const res = {
        json: sinon.stub(),
      };

      await productsController.getAllProducts({}, res, () => {});
      expect(res.json.calledWith([{ id: 1 }, { id: 2 }])).to.be.true;
    });
  });

  describe('filterProducts', () => {
    it('should filter products', async () => {
      const filterProductsStub = sinon.stub(productsModel, 'filterProducts').resolves([{ id: 1 }]);
      const res = {
        json: sinon.stub(),
      };

      const req = {
        query: {
          title: "test",
        }
      };

      await productsController.filterProducts(req, res, () => {});
      expect(res.json.calledWith([{ id: 1 }])).to.be.true;
    });
  });

  describe('insertCart', () => {
    it('should insert into cart', async () => {
      const insertCartStub = sinon.stub(productsModel, 'insertCart').resolves({ message: "Inserted" });
      const res = {
        json: sinon.stub(),
      };

      const req = {
        body: {
          user_id: 1,
          product_id: 2,
          quantity: 1
        }
      };

      await productsController.insertCart(req, res, () => {});
      expect(res.json.calledWith({ message: "Inserted" })).to.be.true;
    });
  });

  describe('getCart', () => {
    it('should get cart by user_id', async () => {
      const getCartStub = sinon.stub(productsModel, 'getCart').resolves([{ id: 1 }]);
      const res = {
        json: sinon.stub(),
      };

      const req = {
        params: {
          user_id: 1
        }
      };

      await productsController.getCart(req, res, () => {});
      expect(res.json.calledWith([{ id: 1 }])).to.be.true;
    });
  });

  describe('updateCart', () => {
    it('should update cart quantity', async () => {
      const updateCartStub = sinon.stub(productsModel, 'updateCart').resolves({ message: "Updated" });
      const res = {
        json: sinon.stub(),
      };

      const req = {
        body: {
          user_id: 1,
          product_id: 2,
          quantity: 3
        }
      };

      await productsController.updateCart(req, res, () => {});
      expect(res.json.calledWith({ message: "Updated" })).to.be.true;
    });
  });

  describe('deleteCart', () => {
    it('should delete cart by id', async () => {
      const deleteCartStub = sinon.stub(productsModel, 'deleteCart').resolves({ message: "Deleted" });
      const res = {
        json: sinon.stub(),
      };

      const req = {
        params: {
          id: 1
        }
      };

      await productsController.deleteCart(req, res, () => {});
      expect(res.json.calledWith({ message: "Deleted" })).to.be.true;
    });
  });

});

import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/listingController.js';

const listingRouter = express.Router();

listingRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
listingRouter.get('/list', productList)
listingRouter.get('/id', productById)
listingRouter.post('/stock', authSeller, changeStock)

export default listingRouter;
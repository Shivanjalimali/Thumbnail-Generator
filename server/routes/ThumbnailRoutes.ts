import express from 'express'
import { deleteThumbnail, generateThumbnail } from '../controllers/ThumbnailController.js';
import protect from '../middlewares/auth.js';
const ThumbnailRouter=express.Router();
import upload from '../middlewares/upload.js';
ThumbnailRouter.post('/generate',protect,generateThumbnail);
ThumbnailRouter.delete('/delete/:id',protect,deleteThumbnail);
export default ThumbnailRouter;
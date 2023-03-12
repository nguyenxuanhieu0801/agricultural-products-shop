import { Router } from 'express';
import { AuthRouter } from './auth.route';
import { CartRouter } from './cart.route';
import { CategoryRouter } from './category.route';
import { ProductRouter } from './product.route';
import { OrderRoutes } from './order.route';
import { UsersRoutes } from './users.route';
import { uploadImages } from './upload';
import { imageUpload } from 'middlewares/imageUpload';
import { UnitRoutes } from './unit.route';
import { DeliveryRoutes } from './delivery.route';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/categories', CategoryRouter);
routes.use('/products', ProductRouter);
routes.use('/cart', CartRouter);
routes.use('/orders', OrderRoutes);
routes.post('/upload', imageUpload, uploadImages);
routes.use('/users', UsersRoutes);
routes.use('/unit', UnitRoutes);
routes.use('/delivery', DeliveryRoutes);

export default routes;

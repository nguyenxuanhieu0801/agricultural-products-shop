import { PORT } from 'configs/environments';
import { HttpStatusCode } from 'constants/HttpStatusCode';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from 'routes';
const fileUpload = require('express-fileupload');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: HttpStatusCode.NOT_CONTENT,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(routes);

//Global error
app.use((req, res, next) => {
  const error = new Error('This route does not exist');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

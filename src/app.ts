import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@edoccoding/common';

import { createUserRouter } from './routes/createuser';
import { randomUser } from './routes/randomuser';
import { getUsersRouter } from './routes/getusers';
import { getUsersTwoRouter } from './routes/getuserstwo';
import { updateUserRouter } from './routes/updateuser';
import { deleteUserRouter } from './routes/deleteuser';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(randomUser);
app.use(createUserRouter);
app.use(getUsersRouter);
app.use(getUsersTwoRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

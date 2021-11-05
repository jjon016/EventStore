import express, { Request, Response } from 'express';
import { client as eventStore } from '../eventstore-wrapper';
import { jsonEvent } from '@eventstore/db-client';
import { UserUpdatedEvent } from '../eventtypes/usertypes';

const router = express.Router();

router.post('/api/users/:userId', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, street, city, state, zip } =
    req.body;
  const userId = req.params.userId;
  let user = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    street: street,
    city: city,
    state: state,
    zip: zip,
  };
  const event = jsonEvent<UserUpdatedEvent>({
    type: 'user-updated',
    data: user,
  });
  await eventStore.appendToStream(userId, event);
  console.log('User Updated');
  res.status(200).send({});
});

export { router as updateUserRouter };

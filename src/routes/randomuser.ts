import express, { Request, Response } from 'express';
import faker from 'faker';

const router = express.Router();

router.get('/api/users/random', async (req: Request, res: Response) => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
  };

  res.status(200).send(user);
});

export { router as randomUser };

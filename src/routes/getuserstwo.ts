import express, { Request, Response } from 'express';
import { client as eventStore } from '../eventstore-wrapper';
import { User } from '../eventtypes/usertypes';
import { FORWARDS, START } from '@eventstore/db-client';

const router = express.Router();

router.get('/api/users/', async (req: Request, res: Response) => {
  const events = eventStore.readAll({
    direction: FORWARDS,
    fromPosition: START,
  });
  const users: User[] = [];
  let count: number = 0;

  for await (const { event } of events) {
    if (!event) {
      continue;
    }
    count++;
    const data: any = event.data;
    switch (event.type) {
      case 'user-created': {
        users.push(<User>(<unknown>event.data));
        break;
      }
      case 'user-updated': {
        let ind = users.findIndex((u) => u.userId == event.streamId);
        if (ind >= 0) {
          users[ind] = { ...users[ind], ...data };
        }
        break;
      }
      case 'user-deleted': {
        let ind = users.findIndex((u) => u.userId == event.streamId);
        if (ind >= 0) {
          users.splice(ind, 1);
        }
        break;
      }
    }
  }
  console.log(count.toString() + ' events processed');
  res.status(200).send({ users: users });
});

export { router as getUsersTwoRouter };

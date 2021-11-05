import express, { Request, Response } from 'express';
import { client as eventStore } from '../eventstore-wrapper';
import { User } from '../eventtypes/usertypes';
import { FORWARDS, Position, START } from '@eventstore/db-client';

const router = express.Router();

let memUsers: User[] = [];
let currentPos: Position;

router.get('/api/users/', async (req: Request, res: Response) => {
  const events = eventStore.readAll({
    direction: FORWARDS,
    fromPosition: currentPos ? currentPos : START,
  });
  let count: number = 0;

  for await (const { event } of events) {
    if (!event) {
      continue;
    }
    if (currentPos) {
      if (
        currentPos.commit == event.position.commit &&
        currentPos.prepare == event.position.prepare
      ) {
        console.log('same last event skipping....');
        continue;
      }
    }
    currentPos = event.position;
    console.log(event);
    count++;
    const data: any = event.data;
    switch (event.type) {
      case 'user-created': {
        memUsers.push(<User>(<unknown>event.data));
        break;
      }
      case 'user-updated': {
        let ind = memUsers.findIndex((u) => u.userId == event.streamId);
        if (ind >= 0) {
          memUsers[ind] = { ...memUsers[ind], ...data };
        }
        break;
      }
      case 'user-deleted': {
        let ind = memUsers.findIndex((u) => u.userId == event.streamId);
        if (ind >= 0) {
          memUsers.splice(ind, 1);
        }
        break;
      }
    }
  }
  console.log(count.toString() + ' events processed');
  res.status(200).send({ users: memUsers });
});

export { router as getUsersRouter };

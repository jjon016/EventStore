import { EventStoreDBClient, FORWARDS, START } from '@eventstore/db-client';

const client = new EventStoreDBClient(
  { endpoint: 'localhost:2113' },
  { insecure: true }
);

const connect = async () => {
  await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 1,
  });
};

export { client, connect };

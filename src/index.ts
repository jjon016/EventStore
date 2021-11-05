import { app } from './app';
import { connect as connectToEventStore } from './eventstore-wrapper';

const start = async () => {
  console.log('Starting up..');
  connectToEventStore();
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();

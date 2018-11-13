const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/conduit-test');

const dropCollection = async (collection) =>
 await mongoose.connection.db.dropCollection(collection.collectionName);

mongoose.connection.on('open', async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map(dropCollection));
  process.exit();
});

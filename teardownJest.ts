import { deleteAllTests } from "./src/Controllers/Notes/utils/services/notes.services";

// * This will be called after all tests are completed.

const teardown = async () => {
  console.log("\nClearing test data from db...");

  await deleteAllTests();

  console.log("\nDeleted!\n");
};

module.exports = teardown;

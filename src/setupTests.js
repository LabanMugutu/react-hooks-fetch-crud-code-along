import { server } from "./mocks/server";
import { resetData } from "./mocks/handlers";

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset handlers *and data* after each test
afterEach(() => {
  server.resetHandlers();
  resetData(); // ✅ ensures items array goes back to default
});

// Clean up once tests are done
afterAll(() => server.close());


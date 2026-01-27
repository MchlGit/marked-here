import "@testing-library/jest-dom/vitest";
import {server} from "../mocks/server";
import {resetDb} from "../mocks/db.ts";

beforeAll(() => server.listen({onUnhandledRequest: "error"}));
afterEach(() => {
    server.resetHandlers();
    resetDb();
});
afterAll(() => server.close());
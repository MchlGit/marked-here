import {render, screen} from '@testing-library/react';
import TreeProfilePage from './TreeProfilePage';
import {describe} from "vitest";

/**
 * This test uses MSV to intercept /api/trees
 * and behaves like a real user:
 *
 * - page loads
 * - trees render
 */
describe('TreeProfilePage', () => {
    it("renders existing trees", async () => {
        render(<TreeProfilePage />);

        // Load existing trees from MSW (mock service worker)
        expect(await screen.findByText("Big Cedar")).toBeInTheDocument();
        expect(await screen.findByText("Cool Maple")).toBeInTheDocument();
    })
})
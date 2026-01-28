import {render, screen} from '@testing-library/react';
import SpotProfilePage from './SpotProfilePage';
import {describe} from "vitest";

/**
 * This test uses MSV to intercept /api/spots
 * and behaves like a real user:
 *
 * - page loads
 * - spots render
 */
describe('SpotProfilePage', () => {
    it("renders existing spots", async () => {
        render(<SpotProfilePage />);

        // Load existing spots from MSW (mock service worker)
        expect(await screen.findByText("Big Cedar")).toBeInTheDocument();
        expect(await screen.findByText("Cool Maple")).toBeInTheDocument();
    })
})
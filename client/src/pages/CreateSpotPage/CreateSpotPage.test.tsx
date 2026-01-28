import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import CreateSpotPage from './CreateSpotPage';
import {describe} from "vitest";
import SpotProfilePage from "../SpotProfilePage/SpotProfilePage.tsx";
import {renderWithRouter} from "@test/test-utils.tsx";

/**
 * This test uses MSV to intercept /api/spots
 * and behaves like a real user:
 *
 * - page loads
 * - spots render
 * - form submits
 * - new spot appears
 */
describe('CreateSpotPage', () => {
    it("allows creating a new spot ", async () => {
        const user = userEvent.setup();
        renderWithRouter(<CreateSpotPage />);

        // Create spot via form
        await user.type(screen.getByLabelText(/name/i), "Test Oak");
        await user.type(screen.getByLabelText(/latitude/i), "12.34");
        await user.type(screen.getByLabelText(/longitude/i), "-56.78");
        await user.type(screen.getByLabelText(/rating/i), "5");

        await user.click(screen.getByRole("button", {name: /submit/i}));

        // Check to see if create succeeded
        render(<SpotProfilePage />);
        expect(await screen.findByText("Test Oak")).toBeInTheDocument();
    })
})
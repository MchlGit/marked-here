import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import CreateTreePage from './CreateTreePage';
import {describe} from "vitest";
import TreeProfilePage from "../TreeProfilePage/TreeProfilePage.tsx";

/**
 * This test uses MSV to intercept /api/trees
 * and behaves like a real user:
 *
 * - page loads
 * - trees render
 * - form submits
 * - new tree appears
 */
describe('CreateTreePage', () => {
    it("allows creating a new tree ", async () => {
        const user = userEvent.setup();
        render(<CreateTreePage />);

        // Create tree via form
        await user.type(screen.getByLabelText(/name/i), "Test Oak");
        await user.type(screen.getByLabelText(/latitude/i), "12.34");
        await user.type(screen.getByLabelText(/longitude/i), "-56.78");
        await user.type(screen.getByLabelText(/rating/i), "5");

        await user.click(screen.getByRole("button", {name: "/submit/i"}));

        // Check to see if create succeeded
        render(<TreeProfilePage />);
        expect(await screen.findByText("Test Oak")).toBeInTheDocument();
    })
})
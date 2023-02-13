import { SignInPage } from "../pages/sign-in-page";
import { screen, render } from "@testing-library/react";

test("Github actions works correctly", async() =>{
    render(<SignInPage/>)
    const heading = await screen.findByText(/Sign-In/)
});
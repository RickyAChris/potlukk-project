import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { createUser, getAllUsers, UserCreation } from "../api/sign-in-requests"
import { RegistrationPage } from "../pages/registration-page";



test("Get All Users", async() =>{
    const users = await getAllUsers();
    console.log(users);
    expect(users).toBeTruthy();
});

test("User Creation", async()=>{
    const newUser: UserCreation ={
        username: "Starlord",
        password: "password",
        fname: "Dwight",
        lname: "Schrute",
        allergies: ["MILK", "EGGS"]
    }
    const user = await createUser(newUser);
    expect(user.userId).not.toBe(0);
    console.log(user);
});

const queryClient = new QueryClient();
test("Should create a new user from input fields", async()=>{

    

    render(<QueryClientProvider client = {queryClient}>
            <RegistrationPage/>
        </QueryClientProvider>);
    

    const usernameInput = await screen.findByPlaceholderText("janedoe123");
    const passwordInput = await screen.findByPlaceholderText("abc1234567!");
    const confirmPasswordInput = await screen.findByPlaceholderText("retype");
    const fnameInput =  await screen.findByPlaceholderText("Jane");
    const lnameInput = await screen.findByPlaceholderText("Doe");
    const allergyCheck = await screen.findByLabelText("Milk");
    const addUserButton = await screen.findByText("Submit");


    userEvent.type(usernameInput, "janedoe123");
    userEvent.type(passwordInput, "abc1234567!");
    userEvent.type(confirmPasswordInput, "abc1234567!");
    userEvent.type(fnameInput, "Jane");
    userEvent.type(lnameInput, "Doe"); 
    fireEvent.click(allergyCheck, true);
    userEvent.click(addUserButton);
    
    expect(screen.findByText(/Account Successfully Created!/));

});
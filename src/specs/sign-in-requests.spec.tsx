import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("Should create a new user from input fields", async()=>{

    render(<RegistrationPage/>);

    const usernameInput = await screen.findByPlaceholderText("janedoe123");
    const passwordInput = await screen.findByPlaceholderText("abc1234567!");
    const confirmPasswordInput = await screen.findByPlaceholderText("retype");
    const fnameInput = await screen.getByLabelText('First Name');
    const lnameInput = await screen.getByLabelText('Last Name');
    const allergyCheck = await screen.findByLabelText("Milk");
    const addUserButton = await screen.findByText("Submit")

    userEvent.type(usernameInput, "janedoe123");
    userEvent.type(passwordInput, "abc1234567!");
    userEvent.type(confirmPasswordInput, "abc1234567!");
    userEvent.type(fnameInput, "Jane");
    userEvent.type(lnameInput, " Doe"); 
    fireEvent.click(allergyCheck, true);
    userEvent.click(addUserButton);

    await waitFor(() => {
        expect(createUser).toHaveBeenCalledWith({
          username: 'janedoe123',
          password: 'abc1234567!',
          fname: 'Jane',
          lname: 'Doe',
          allergies: ["MILK"],
        });
    })

    expect(window.alert).toHaveBeenCalledWith('Account Successfully Created!');

    await waitFor(() => {
        expect(window.location.href).toBe("/");
    });
})
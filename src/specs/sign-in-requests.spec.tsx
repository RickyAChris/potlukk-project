import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { createUser, getAllUsers, UserCreation } from "../api/sign-in-requests"
import { RegistrationPage } from "../pages/registration-page";
import nock from "nock";

describe("signInRequests", () => {

  beforeEach(() => {
    nock.cleanAll();
  });

  test("Get All Users", async() =>{
    const scope = nock("http://127.0.0.1:8000")
      .get("/lukkers")
      .reply(200, [{"userId":99264,"username":"janedoe123","fname":"Jane","lname":"Doe","allergies":["MILK"]}]);
    const users = await getAllUsers();
    expect(users.length).toBeGreaterThan(0);
    expect(scope.isDone()).toBe(true);
  });

  test("User Creation", async () => {
    const scope = nock("http://127.0.0.1:8000")
      .post("/lukkers", {
        username: "Starlord",
        password: "password",
        fname: "Dwight",
        lname: "Schrute",
        allergies: ["MILK", "EGGS"]
      })
      .reply(200, { userId: 1 });
    const newUser: UserCreation = {
      username: "Starlord",
      password: "password",
      fname: "Dwight",
      lname: "Schrute",
      allergies: ["MILK", "EGGS"]
    }
    const user = await createUser(newUser);
    expect(user.userId).toBe(1);
    expect(scope.isDone()).toBe(true);
  });

  const queryClient = new QueryClient();
  test("Should create a new user from input fields", async()=>{
    const scope = nock("http://127.0.0.1:8000")
      .post("/lukkers")
      .reply(200, { message: "Account Successfully Created!" });
    render(
      <QueryClientProvider client = {queryClient}>
        <BrowserRouter>
            <RegistrationPage/>
        </BrowserRouter>
      </QueryClientProvider>
    );

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

    await waitFor(() => {
      expect(screen.getByText(/Account Successfully Created!/)).toBeInTheDocument();
      expect(scope.isDone()).toBe(true);
    });
  });

});

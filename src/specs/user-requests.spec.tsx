import { createUser, getAllUsers, UserCreation } from "../api/sign-in-requests"


test("Get All Users", async() =>{
    const users = await getAllUsers();
    console.log(users);
    expect(users).toBeTruthy();
});

test("Create Lukker User", async ()=>{
    const newLukker: UserCreation = {
        username: "mscott123",
        password: "123456",
        fname: "Michael",
        lname: "Scott",
        allergies: ["Milk", "Tree Nuts"]
    }
    const lukker = await createUser(newLukker);
    expect(lukker.userId).not.toBe(0);
    console.log(lukker)
});

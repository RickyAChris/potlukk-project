import { createPotlukk, PotlukkCreation } from "../api/potlukk-requests"


test("Potlukk Creation", async () => {

    const nock = require('nock');
    const scope = nock('http://127.0.0.1:8000/graphql')
        .get('/')
    const newPotlukk: PotlukkCreation = {
            hostId: 75523,
            description: "test description",
            isPublic: false,
            location: "test location",
            time: "test time",
            title: "test title",
            invitations: {
                lukkers: [{
                    userId: 75523,
                    username: "janedoe123",
                    fname: "Jane",
                    lname: "Doe",
                    selected: true,
                }], 
            }}
    const potlukk = await createPotlukk(newPotlukk);
    expect(potlukk.potlukkId).not.toBe(0);
    console.log(potlukk);
})
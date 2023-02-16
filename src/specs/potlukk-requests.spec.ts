import { createPotlukk, PotlukkCreation } from "../api/potlukk-requests"


test("Potlukk Creation", async () => {

    const nock = require('nock');
    const scope = nock('http://127.0.0.1:8000')
    .post('/graphql',{    
        hostId: 75523,
        details: {
            description: "test description",
            isPublic: false,
            location: "test location",
            time: 1996,
            title: "test title",
            tags: [],
            status: "SCHEDULED"
    }})
    .reply(200, {potlukkId: 101})

    const newPotlukk: PotlukkCreation = {    
        hostId: 75523,
        details: {
            description: "test description",
            isPublic: false,
            location: "test location",
            time: 1996,
            title: "test title",
            tags: [],
            status: "SCHEDULED"
    }}
    const potlukk = await createPotlukk(newPotlukk);
    expect(potlukk.potlukkId).not.toBe(0);
    console.log(potlukk);
});
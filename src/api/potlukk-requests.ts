import { User } from "../components/host-page-reducer";

export type PotlukkCreation = {
    hostId: number,
    details: {
        description: string,
        isPublic: boolean,
        location: string,
        time: number,
        title: string,
        tags: [],
        status: string
    }
}

export async function createPotlukk(newPotlukk: PotlukkCreation):Promise<{potlukkId:number}>{
    console.log('Creating potlukk: ', newPotlukk);
    const query = `mutation CreatePotlukk($potlukkInput: PotlukkCreationInput!) {
        createPotlukk(input: $potlukkInput) {
          potlukkId
        }
      }`

      const variables = {
        potlukkInput: {
            hostId: newPotlukk.hostId,
            details: {
                description: newPotlukk.details.description,
                isPublic: newPotlukk.details.isPublic,
                location: newPotlukk.details.location,
                time: newPotlukk.details.time,
                title: newPotlukk.details.title,
                tags: [],
                status: "SCHEDULED"
            }
          }
        };
        
    const requestBody: string = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    console.log(responseBody);
    const potlukkDetails:{potlukkId:number} = responseBody.data.createPotlukk;
    return potlukkDetails;
}

// export type InviteCreation = {

// }

// export async function sendInvite()


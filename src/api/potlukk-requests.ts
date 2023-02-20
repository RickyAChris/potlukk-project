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
    const potlukkDetails:{potlukkId:number} = responseBody.data.createPotlukk;
    return potlukkDetails;
}

export type InviteCreation = {
  potlukkId: number,
  potlukkerId: number,
}

export async function sendInvite(newInvite: InviteCreation):Promise<{potlukkId: number}>{
    const query = `mutation sendInvite($inviteInfo: InvitationSendInput!){
                      sendInvite(input: $inviteInfo){
                        potlukkId
                      }
                    }`

    const variables = {
      inviteInfo: {
        potlukkId: newInvite.potlukkId,
        potlukkerId: newInvite.potlukkerId
      }
    }
    const requestBody: string = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const inviteDetails:{potlukkId:number} = responseBody.data.createPotlukk;
    return inviteDetails;

}

export type DishCreation = {
  potlukkId: number,
  dishes: {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens:string[]
  }
}

export async function CreateDish(newDish: DishCreation): Promise<{potlukkId: number}>{
  const query = `mutation CreateDish($dishInput: DishesSwapInput!){
                  swapPotlukkDishes(input: $dishInput){
                    potlukkId
                  }
                }`
  
                const variables = {
                  dishInput: {
                    potlukkId: newDish.potlukkId,
                    dishes: {
                      name: newDish.dishes.name,
                      description: newDish.dishes.description,
                      broughtBy: newDish.dishes.broughtBy,
                      serves: newDish.dishes.serves,
                      allergens: newDish.dishes.serves
                    }
                  }
                };
  const requestBody: string = JSON.stringify({query, variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
  const responseBody = await httpResponse.json();
  console.log(requestBody);
  const dishCreationDetails:{potlukkId:number} = responseBody.data.createPotlukk;
  console.log(dishCreationDetails);
  return dishCreationDetails;
}

type PotlukksWithId = {
  potlukkId: number,
  host:{
    userId: number
  }
}

export async function GetPotlukkByHostId(hostId: number): Promise<number[]>{
  const query = `query GetPotlukkByHostId {
                  potlukks {
                    potlukkId
                    host{
                    userId
                    }
                  }
                }`;
  const variables = {};
  const requestBody: string = JSON.stringify({query, variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
  const responseBody = await httpResponse.json();
  const potlukks = responseBody.data.potlukks;
  const matchingPotlukks = potlukks.filter((potlukk:PotlukksWithId) => potlukk.host.userId === hostId);
  if(matchingPotlukks.length > 0){
    return matchingPotlukks.map((potlukk: PotlukksWithId) => potlukk.potlukkId);
  } else {
    throw new Error("Potlukk not found for hostId ${hostId}");
  }
}

export type GetDish = {
  potlukkId: number,
    dishes: {
      name: string,
      description: string,
      broughtBy: string,
      serves: number,
      allergens: string[]
    }
}

export async function GetAllDishes(potlukkId: number): Promise<GetDish[]>{
  const query = `query GetAllDishes{
                  potlukks{
                    potlukkId
                    dishes{
                      name
                      description
                      broughtBy
                      serves
                      allergens
                    }
                  }
               }`
  const variables = {};
  const requestBody: string = JSON.stringify({query, variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
  const responseBody = await httpResponse.json();
  const dishes = responseBody.data.dishes;
  const matchingDishes = dishes.filter((dish:GetDish) => dish.potlukkId === potlukkId);
  if(matchingDishes.length > 0){
    return matchingDishes.map((dish: GetDish) => dish.dishes);
  } else {
    throw new Error("Potlukk not found for potlukk ${potlukkId}");
  }
}

import { SourceMap } from "module"
import { useQuery } from "react-query"
import { PotlukkDetailsGuestPage } from "../pages/potlukk-details-guest-page"

type Host = {
    userId: number
}

type Details = {
    title: string
}

type Potlukker = {
  userId: number
}

type Invitations = {
  potlukker: Potlukker
  
}

type HostPotlukks = {
    host: Host
    details: Details
    potlukkId: number
    invitations: Invitations[]
}



export async function getPotlukks(hostId:number):Promise<HostPotlukks[]>{
    
    const query = `query PotlukkData {
        potlukks {
          host {
            userId
          }
          details {
            title
          }
          invitations {
            potlukker {
              userId
            }
          }
          potlukkId
        }
      }`

    const requestBody:string = JSON.stringify({query:query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    let potlukks:HostPotlukks[] = responseBody.data.potlukks;
    potlukks = potlukks.filter(p => hostId === p.host.userId)
    console.log(potlukks);
    return potlukks;
}





// export async function getPotlukkNotifications():Promise<>{
//   const query``

//   const requestBody:string = JSON.stringify({query:query});
//     const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
//     const responseBody = await httpResponse.json();
//     const potlukks:HostPotlukks[] = responseBody.data.potlukks;
//     console.log(potlukks);
//     return potlukks;
// }

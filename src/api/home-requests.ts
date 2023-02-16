type Host = {
    userId: number
}

type Details = {
    title: string
}


type HostPotlukks = {
    host: Host
    details: Details
    potlukkId: number
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



type Invitations = {
  potlukker: {
    userId: number
    username: string
  }
}


type PotlukkInvites = {
  details: Details
  invitations: Invitations
  potlukkId: number

}

export async function getPotlukkInvites():Promise<PotlukkInvites[]>{
  const query = `query InvitedPotlukks {
    potlukks {
      details {
        title
      }
      invitations {
        potlukker {
          userId
          username
        }
      }
      potlukkId
    }
  }`

  const requestBody:string = JSON.stringify({query:query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const potlukkInvite:PotlukkInvites[] = responseBody.data.potlukks;
    console.log(potlukkInvite);
    return potlukkInvite;
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

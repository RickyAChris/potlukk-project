

export function RegistrationPage(){
    return <>
        <h1>Registration Page</h1>

    <label>Create Username</label>
    <input type="text" placeholder="johndoe"></input>

    <label>Create Password</label>
    <input type="text" placeholder="*******"></input>

    <label>Confirm Password</label>
    <input type="text" placeholder="*******"></input>

    <h3>Allergens</h3>
    
    <input type="checkbox" id="milk"/><label htmlFor="milk">Milk</label>
    <input type="checkbox" id="egg"></input><label htmlFor="egg">Egg</label>
    <input type="checkbox" id="soy"></input><label htmlFor="soy">Soy</label>
    <input type="checkbox" id="treenuts"></input><label htmlFor="treenuts">Tree Nuts</label>
    </>
}
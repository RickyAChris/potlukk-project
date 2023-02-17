import { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
import { HostPageReducer, PotlukkDataState } from "../components/host-page-reducer";
import { NavBar } from "../components/navbar";
import { Modal } from "react-bootstrap";
import { getAllUsers } from "../api/sign-in-requests";
import { DishCreationState, DishReducer } from "../components/dishes-reducer";
import { CreateDish, DishCreation, GetAllDishes, GetPotlukkByHostId } from "../api/potlukk-requests";

const initialState: PotlukkDataState = {
    hostId: 10,
    title: '',
    time: 0,
    location: '',
    description: '',
    isPublic: false,
    users:[],
    selectedUsers:[]
}

const dishInitialState: DishCreationState ={
    potlukkId: 10,
    dishes: {
      name: '',
      description: '',
      broughtBy: 0,
      serves: 0,
      allergens: []
    },
    potlukkDishes: []
}

function useHostId() {
    const {data: userId} = useQuery("usercache", () => (Number(localStorage.getItem("userid"))));
    return userId ?? -1; 
}

export function PotlukkDetailsHostPage(){
    const hostId = useHostId();
    const [potlukkState, potlukkDispatch] = useReducer(HostPageReducer, initialState);
    const [dishState, dishDispatch] = useReducer(DishReducer, dishInitialState);
    console.log(dishState);
    const [inviteModal, showInviteModal] = useState(false);
    const [updateModal, showUpdateModal] = useState(false);
    const [bringDishModal, showBringDishModal] = useState(false);

    useEffect(() => {
        (async () => {
          const retrievedUsers = await getAllUsers();
          const formattedUsers = retrievedUsers.map((user) => ({
            ...user,
            selected: false,
          }));
          potlukkDispatch({ type: 'SET_USERS', payload: formattedUsers })

          const potlukkIds = await GetPotlukkByHostId(hostId);
          const potlukkId = potlukkIds[0];
          dishDispatch({type:'SET_ID', payload: potlukkId});

          const retrievedDishes = await GetAllDishes(potlukkId);
          const mappedDishes = retrievedDishes.map((dish) => ({...dish}))
          dishDispatch({type: "SET_DISHES", payload: mappedDishes});

        })();
      }, []);

      function checkBoxHandler(event: React.FormEvent<HTMLInputElement>) {
        const checked = event.currentTarget.checked;
        const id = event.currentTarget.id;
      
        dishDispatch({
          type: 'SET_DISH_ALLERGENS',
          payload: checked
            ? [...dishState.dishes.allergens, id]
            : dishState.dishes.allergens.filter(allergen => allergen !== id),
        });
      };


      const handleCreateDish = async () => {
        const dishCreation: DishCreation = {
            potlukkId: dishState.potlukkId,
            dishes: {
              name: dishState.dishes.name,
              description: dishState.dishes.description,
              broughtBy: hostId,
              serves: dishState.dishes.serves,
              allergens: dishState.dishes.allergens
            }
        }
        CreateDish(dishCreation);
        alert("Dish Successfully Created");
        showBringDishModal(false);
      };

    return <>
        
        <NavBar/>
        <button onClick={() => showUpdateModal(true)}>Update Details</button>
        <Modal show={updateModal} onHide={() => showUpdateModal(false)}>
            <Modal.Header>
                <Modal.Title>Update Potlukk Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="setTitle">Title</label>
                <input type='text' id='setTitle' required
                onChange={e => potlukkDispatch({type:'SET_TITLE', payload:e.target.value})}></input>

                <label htmlFor="setTime">Time </label>
                <input type="datetime-local" id="setTime" required
                onChange={e => potlukkDispatch({type:'SET_DATE_TIME', payload:parseInt(e.target.value)})}/>

                <input type="text" id="setLocation" placeholder="Location" required
                onChange={e => potlukkDispatch({type:'SET_LOCATION', payload:e.target.value})}/>

                <input type="text" id="setDescription" placeholder="Description" required
                onChange={e => potlukkDispatch({type:'SET_DESCRIPTION', payload:e.target.value})}/>

                <label htmlFor="setPublic">Make Public</label>
                <input type="checkbox" id="setPublic"
                onChange={e => potlukkDispatch({type:'SET_PUBLIC', payload:Boolean(e.target.checked)})}/>

                <button>Update</button>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => showUpdateModal(false)}>x</button>
            </Modal.Footer>
        </Modal>

        <fieldset>
            <legend>Dishes</legend>
            <table>
                <tbody>
                    {dishState.potlukkDishes.map((dish) => (
                    <tr key={dish.potlukkId}><td>{dish.dishes.name}</td>
                    <td><button>Edit</button></td></tr>))}
                </tbody>
            </table>
        </fieldset>
        
        <button onClick={() => showBringDishModal(true)}>Bring Dish</button>
        <Modal show={bringDishModal} onHide={() => showBringDishModal(false)}>
            <Modal.Header>
                <Modal.Title>Bring Dish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="setDishName">Name </label>
                <input type='text' id="setDishName" required
                onChange={e => dishDispatch({type: 'SET_DISH_NAME', payload: e.target.value})}/>

                <label htmlFor="setDescription">Description </label>
                <input type='text' id="setDescription" required
                onChange={e => dishDispatch({type: 'SET_DISH_DESCRIPTION', payload:e.target.value})}/>

                <label htmlFor="setServings">Serves </label>
                <input type='number' id='setServings' required
                onChange={e => dishDispatch({type: 'SET_DISH_SERVES', payload: Number(e.target.value)})}/>

                <input type="checkbox" id="MILK" onChange={checkBoxHandler}/><label htmlFor="MILK">Milk</label>
                <input type="checkbox" id="EGG" onChange={checkBoxHandler}/><label htmlFor="EGG">Egg</label>
                <input type="checkbox" id="SOY" onChange={checkBoxHandler}/><label htmlFor="SOY">Soy</label>
                <input type="checkbox" id="TREENUTS" onChange={checkBoxHandler}/><label htmlFor="TREENUTS">Tree Nuts</label>
                <button onClick={handleCreateDish}>complete</button>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => showBringDishModal(false)}>x</button>
            </Modal.Footer>
        </Modal>

        <button>Request Dish</button>

        <fieldset>
            <legend>Attendees</legend>
            <table>
                <tbody>
                    <tr><td>Jack</td> <td>Accepted</td></tr>
                </tbody>
            </table>
        </fieldset>

        <button onClick={() => showInviteModal(true)}>Invite More</button>
        <Modal show={inviteModal} onHide={() => showInviteModal(false)}>
            <Modal.Header>
                <Modal.Title>Invite More Lukkers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <table>
                        <tbody>
                        {potlukkState.users.map((user) => (
                        <tr key={user.userId}><td>{user.username} {user.fname} {user.lname}</td>
                        <td>
                        {user.selected ? (
                            <button disabled>Invited</button>
                        ) : (
                        <button onClick={() => potlukkDispatch({type:'INVITE_USER', payload:user.userId})}>Invite</button>)}</td></tr>))}
                        </tbody>
                    </table>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => showInviteModal(false)}>x</button>
            </Modal.Footer>
        </Modal>
    </>
}
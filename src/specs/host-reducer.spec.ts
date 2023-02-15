import { HostPageReducer, PotlukkDataAction, PotlukkDataState, User } from "../components/host-page-reducer"


test('INVITE_USER', () => {
    const userState: PotlukkDataState = {
        time:'',
        date:'',
        location: '',
        description: '',
        isPublic: false,
        users: [{
                userId: 200,
                username: 'Roko',
                fname:'Mystery',
                lname:'No',
                selected: false
        }],
        selectedUsers: []
    }
    const nextState = HostPageReducer(userState, {type:'INVITE_USER', payload: 200});
    expect(nextState.selectedUsers).toBeNull!;
    console.log(userState);
    console.log(nextState);
});

test('REMOVE_USER', () =>{
    const userState: PotlukkDataState = {
        time:'',
        date:'',
        location: '',
        description: '',
        isPublic: false,
        users: [{
                userId: 200,
                username: 'Roko',
                fname:'Mystery',
                lname:'No',
                selected: false
        }],
        selectedUsers: [{
            userId: 200,
            username: 'Roko',
            fname:'Mystery',
            lname:'No',
            selected: true
        }]
    }

    const nextState = HostPageReducer(userState, {type:'REMOVE_USER', payload: 200});
    expect(nextState.selectedUsers).toBeNull;
    console.log(userState);
    console.log(nextState);
});

export type User = {
    userId: number,
    username: string,
    fname: string,
    lname: string
    selected?: boolean
};

export type PotlukkDataState = {
    hostId: number,
    title: string
    time: number,
    location: string,
    description: string,
    isPublic: boolean,
    users: User[],
    selectedUsers: User[]
};

export type SetUsersAction = {type:'SET_USERS', payload: User[]};
export type InviteUserAction = {type:'INVITE_USER', payload: number};
export type RemoveUserAction = {type:'REMOVE_USER', payload: number};
export type SetTitleAction = {type:'SET_TITLE', payload: string};
export type SetDateTimeAction = {type:'SET_DATE_TIME', payload: number};
export type SetLocationAction = {type:'SET_LOCATION', payload: string};
export type SetDescriptionAction = {type:'SET_DESCRIPTION', payload: string};
export type SetPublicAction = {type:'SET_PUBLIC', payload: boolean};

export type PotlukkDataAction = SetUsersAction | InviteUserAction | RemoveUserAction |
SetDateTimeAction | SetLocationAction | SetDescriptionAction | SetPublicAction | SetTitleAction


export function HostPageReducer(state: PotlukkDataState, action: PotlukkDataAction): PotlukkDataState{
    const newState: PotlukkDataState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case 'SET_USERS':{
            newState.users = action.payload;
            return newState;
        }
        case 'INVITE_USER':{
            const userToInvite = newState.users.find((user) => user.userId === action.payload);
            if (userToInvite) {
                userToInvite.selected = true;
                newState.users = [...newState.users];
                newState.selectedUsers = [...newState.selectedUsers, userToInvite];
                return newState;
            } else {
                return state;
            }
        }
        case 'REMOVE_USER':{
            const userToRemove = newState.users.find((user) => user.userId === action.payload);
            if (userToRemove) {
                userToRemove.selected = false;
                newState.users = [...newState.users];
                newState.selectedUsers = newState.selectedUsers.filter((user) => user.userId !== action.payload);
                return newState;
            } else {
                return state;
            }
        }
        case 'SET_TITLE': {
            newState.title = action.payload;
            return newState;
        }
        case 'SET_DATE_TIME':{
            newState.time = action.payload;
            return newState;
        }

        case 'SET_LOCATION':{
            newState.location = action.payload;
            return newState;
        }
        case 'SET_DESCRIPTION':{
            newState.description = action.payload;
            return newState;
        }
        case 'SET_PUBLIC':{
            newState.isPublic = action.payload;
            return newState;
        }
        default: {
            return state;
        }
    }
}



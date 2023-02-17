export type dishState = {
    potlukkId: number,
    dishes: {
      name: string,
      description: string,
      broughtBy: string,
      serves: number,
      allergens: string[]
    }
}

export type DishCreationState = {
    potlukkId: number,
    dishes: {
      name: string,
      description: string,
      broughtBy: number,
      serves: number,
      allergens:string[]
    }
    potlukkDishes:dishState[];
  }

export type SetPotlukkIdAction = {type:'SET_ID', payload: number} 
export type SetDishesAction = {type:'SET_DISHES', payload: dishState[]}
export type SetDishNameAction = {type:'SET_DISH_NAME', payload: string};
export type SetDishDescriptionAction = {type:'SET_DISH_DESCRIPTION', payload: string};
export type SetDishServesAction = {type:'SET_DISH_SERVES', payload: number};
export type SetDishAllergensAction = {type:'SET_DISH_ALLERGENS', payload: string[]};

export type DishCreationAction = SetDishNameAction | SetDishDescriptionAction |
    SetDishServesAction | SetDishAllergensAction | SetDishesAction | SetPotlukkIdAction

export function DishReducer(state: DishCreationState, action: DishCreationAction): DishCreationState{
    const newState: DishCreationState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case 'SET_ID':{
            newState.potlukkId = action.payload;
            return newState;
        }
        case 'SET_DISHES':{
            newState.potlukkDishes = action.payload;
            return newState;
        }
        case 'SET_DISH_NAME':{
            newState.dishes.name = action.payload;
            return newState;
        }
        case 'SET_DISH_DESCRIPTION':{
            newState.dishes.description = action.payload;
            return newState;
        }
        case 'SET_DISH_SERVES':{
            newState.dishes.serves = action.payload;
            return newState;
        }
        case 'SET_DISH_ALLERGENS':{
            newState.dishes.allergens = action.payload;
            return newState;
        }
    }
}
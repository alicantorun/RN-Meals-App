import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoritedMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoritedMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoritedMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoritedMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return {
          ...state,
          favoritedMeals: state.favoritedMeals.concat(meal)
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }

        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }

        if (appliedFilters.vegatarian && !meal.isVegetarian) {
          return false;
        }

        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }

        return true;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;

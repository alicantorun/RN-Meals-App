import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createAppContainer } from "react-navigation";
import { createTabsNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.os === "android" ? Colors.primaryColor : "white"
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
    }
  }
);

export default createAppContainer(MealsNavigator);

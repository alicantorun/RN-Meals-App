import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import App from "../App";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.os === "android" ? Colors.primaryColor : "white"
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "Screen"
};

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
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans" }}>Meals!</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!", //Override tab nav label
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      }
    },
    tabBarColor: Colors.accentColor,
    tabBarLabel:
      Platform.OS === "android" ? (
        <Text style={{ fontFamily: "open-sans" }}>Meals!</Text>
      ) : (
        "Meals"
      )
  }
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true
        // barStyle: { //if you dont wanna use shifting this set up bg color
        //   backgroundColor: Colors.primary
        // }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold"
          },
          activeTintColor: Colors.accentColor
        }
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    navigationOptions: {
      drawerLabel: "Filters!"
    },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNavigator);

// AppNavigate.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// İCONS
import SvgHome from '../assets/İcons/Home';
import SvgList from '../assets/İcons/List';
import SvgFavori from '../assets/İcons/Favori';

import { useSelector } from 'react-redux';

// BOTTOM BAR SCREEN
import HomeScreen from '../screens/Home';
import FavoritesScreen from '../screens/Favorites';
import CategoriesScreen from '../screens/Categories';

// AUTH SCREEN
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Login/RegisterScreen';
import ForgotPasswordScreen from '../screens/Login/ForgotPasswodScreen';

// HOME STACK SCREEN
import RecipeDetail from '../screens/HomeStackScreen/RecipeDetail'
import SelectedCategoriesList from '../screens/HomeStackScreen/SelectedCategoriesList';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="RecipeDetailScreen"
      component={RecipeDetail}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavoritesScreen"
      component={FavoritesScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const CategoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CategoriesScreen"
      component={CategoriesScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SelectedCategoriesListScreen"
      component={SelectedCategoriesList}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigate = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: () => null,
              headerShown: false,
              tabBarIcon: ({ focused, color }) => {
                const icon = focused ? "#0A9A61" : "#c3c3c3";
                return <SvgHome fill={icon} width={25} height={25} stroke={icon} />;
              },
            }}
          />
          <Tab.Screen
            name="Categories"
            component={CategoriesStack}
            options={{
              headerShown: false,
              tabBarLabel: () => null,
              tabBarIcon: ({ focused, color }) => {
                const icon = focused ? "#0A9A61" : "#c3c3c3";
                return <SvgList fill={icon} width={25} height={25} stroke={icon} />;
              },
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesStack}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused, color }) => {
                const icon = focused ? "#0A9A61" : "#c3c3c3";
                return <SvgFavori fill={icon} width={25} height={25} stroke={icon} />;
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigate;

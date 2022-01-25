import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Text } from "react-native";
import Theme from "./config/Theme"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Components
import startPage from './Pages/Login/StartPage';
import signUp from './Pages/Login/SignUpPage'
import Login from './Pages/Login/LoginPage';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Favourites from './Pages/Favourites/Favourites';
import Search from './Pages/Search/Search';
import MapPage from './Pages/Map/MapPage';
import GuidePage from './Pages/GuidePage/GuidePage';
import EditProfile from './Pages/Profile/EditProfile';
import AddGuide from './Pages/AddGuide/AddGuide';

import Guides from "./assets/data/Guides";
import AddGuideItinerary from './Pages/AddGuide/AddGuideItinerary';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      guides: Guides
    }

    this.handleLike = this.handleLike.bind(this)
  }

  handleLike(guide) {
    let newGuides = this.state.guides.map(g => {
      if (g.id === guide.id) {
        g.liked = !g.liked
      }
      return g
    })
    this.setState({ guides: newGuides })
  }

  render() {
    return (
      <View style={{ flex: 1, ...styles.backgroundStyle }}>
        <StatusBar backgroundColor={Theme.backgroundColor} barStyle="light-content" />

        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: Theme.backgroundColor,
            height: 40,
          },
          headerTitleStyle: {
            fontSize: 15,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarStyle: [
            {
              borderTopColor: "transparent",
              height: 70,
              backgroundColor: Theme.backgroundColor,
            },
            null
          ],
          tabBarIcon: ({ focused, color, size }) => {

            let activeIcon = (iconName) => (
              <View style={{ alignItems: "center" }}>
                <Icon name={iconName} size={size} color={color} style={{ height: 30 }} />
                <View style={{ marginTop: 5, backgroundColor: Theme.primaryColor, width: 7, height: 7, borderRadius: 999 }} />
              </View>
            )

            let inactiveIcon = (iconName) => (
              <View style={{ alignItems: "center" }}>
                <Icon name={iconName} size={size} color={color} style={{ height: 30 }} />
                <View style={{ marginTop: 5, backgroundColor: "rgba(0,0,0,0)", width: 7, height: 7, borderRadius: 999 }} />
              </View>
            )

            let inactiveCenterButton = () => (
              <View>
                <View style={{ backgroundColor: Theme.primaryColor, width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 999, elevation: 20 }}>
                  <Icon name="add" size={30} color={color} />
                </View>
              </View>
            )

            let activeCenterButton = () => (
              <View>
                <View style={{ backgroundColor: "white", width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 999, elevation: 20 }}>
                  <Icon name="add" size={30} color={Theme.primaryColor} />
                </View>
              </View>
            )

            let icon;

            if (route.name === "Home") {
              icon = focused ? activeIcon("home") : inactiveIcon("home")
            }

            if (route.name === "Search") {
              icon = focused ? activeIcon("search") : inactiveIcon("search")
            }

            if (route.name === "Add Guide") {
              icon = focused ? activeCenterButton() : inactiveCenterButton()
            }

            if (route.name === "Favourites") {
              icon = focused ? activeIcon("heart") : inactiveIcon("heart")
            }

            if (route.name === "Profile") {
              icon = focused ? activeIcon("person") : inactiveIcon("person")
            }

            return (icon)
          },
          tabBarActiveTintColor: Theme.primaryColor,
          tabBarInactiveTintColor: Theme.textColor
        })}>

          <Tab.Screen name="Home" children={() => <Home guides={this.state.guides} handleLike={this.handleLike} />} />
          <Tab.Screen name="Search" children={() => <Search handleLike={this.handleLike} />} />
          <Tab.Screen name="Add Guide" component={AddGuide} />
          <Tab.Screen name="Favourites" children={() => <Favourites guides={this.state.guides} handleLike={this.handleLike} />} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>

      </View>
    )
  }
}

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

              <Stack.Screen name="Start Page" component={startPage} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Sign Up" component={signUp} />

              <Stack.Screen name="App" component={AppComponent} options={{ title: "Wander, Wonder", headerStyle: { backgroundColor: Theme.backgroundColor }, headerTintColor: "white" }} />
              <Stack.Screen name="Guide Page" component={GuidePage} options={{ title: "Map", headerStyle: { backgroundColor: Theme.backgroundColor }, headerTintColor: "white" }} />
              <Stack.Screen name="Map" component={MapPage} />
              <Stack.Screen name="Edit Profile" component={EditProfile} />
              <Stack.Screen name="Add Guide Itinerary" component={AddGuideItinerary} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({

  card: {
    width: "49%",
    margin: 2
    // height: "auto",
  },

  headerImage: {
    width: "100%",
  },

  backgroundStyle: {
    backgroundColor: Theme.backgroundColor,
  },

  defaultText: {
    color: "white",
  },

  highlightedText: {
    color: Theme.primaryColor,
    fontSize: 24
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 30,
  },

  innerNavigation: {
    alignItems: "center",
  },

  displayHidden: {
    display: "none",
  },

  navigationCircle: {
    marginTop: 10,
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: Theme.primaryColor
  },

  subtitle: {
    textAlign: "center",
    color: "#D1D1D1",
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },

  normalNavbarIcon: {
    color: "white",
    fontSize: 24
  }
});
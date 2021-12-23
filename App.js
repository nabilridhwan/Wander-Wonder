import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View,StatusBar } from "react-native";
import Theme from "./config/Theme"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Components
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import Profile from './components/Profile';
import Favourites from './components/Favourites';
import Search from './components/Search';
import MapPage from './components/MapPage';

import Data from "./assets/data/Guides"
import GuidePage from './components/GuidePage';

// import Profile from './components/Profile';

// Data files required for rendering

/*
  (IMPORT THIS TO APP.JS)
  ==============================
  Home Page
  ==============================
  Name: Nabil Ridhwanshah 
  Admin Number: P2007421
  Class: DIT/FT/1B/05
*/


class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      appPages: ["home", "search", "heart", "person"],
      currentActivePage: "home"
    }

    this.handleNavbarPageChange = this.handleNavbarPageChange.bind(this)
  }

  handleNavbarPageChange(page) {
    this.setState({ currentActivePage: page })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>
        <StatusBar backgroundColor={Theme.statusBarBackgroundColor} barStyle="light-content" />
        {this.state.currentActivePage == "home" && <Home />}
        {this.state.currentActivePage == "search" && <Search />}
        {this.state.currentActivePage == "heart" && <Favourites />}
        {this.state.currentActivePage == "person" && <Profile />}
        <NavigationBar appPages={this.state.appPages} currentActivePage={this.state.currentActivePage} handleNavbarPageChange={this.handleNavbarPageChange} />

      </SafeAreaView >
    )
  }
}

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="App" component={AppComponent} options={{title: "Wander, Wonder", headerStyle: {backgroundColor: Theme.backgroundColor}, headerTintColor: "white"}} />
          <Stack.Screen name="Guide Page" component={GuidePage} options={{title: "Map", headerStyle: {backgroundColor: Theme.backgroundColor}, headerTintColor: "white"}} />
          <Stack.Screen name="Map" component={MapPage} />
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
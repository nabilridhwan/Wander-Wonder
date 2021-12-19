import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import Theme from "./config/Theme"

// Components
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import Profile from './components/Profile';
import Favourites from './components/Favourites';
import Search from './components/Search';
import MapPage from './components/MapPage';

import Data from "./assets/data/Guides"

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


export default class App extends React.Component {

  constructor({props}){
    super(props);

    this.state = {
      appPages: ["home", "search", "heart", "person"],
      currentActivePage: "home"
    }

    this.handleNavbarPageChange = this.handleNavbarPageChange.bind(this)
  }

  handleNavbarPageChange(page){
    this.setState({currentActivePage: page})
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle}}>

        {/* <ScrollView keyboardShouldPersistTaps='handled'> */}

        {this.state.currentActivePage == "home" && <Home />}
        {this.state.currentActivePage == "search" && <Search />}
        {this.state.currentActivePage == "heart" && <Favourites />}
        {this.state.currentActivePage == "person" && <Profile />}
        {/* {this.state.currentActivePage == "map" && <MapPage place={Data[2]} />} */}
        {/* {this.state.currentActivePage == "person" && <Profile />} */}
        
        {/* <View style={{marginBottom: 20}}>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          {this.state.appPages.map((page, index) => (
            <Icon key={index} name={page} style={page == this.state.currentActivePage ? styles.highlightedText : styles.normalNavbarIcon} onPress={() => this.setState({currentActivePage: page})} />
          ))}
        </View>
        </View> */}

        
        {/* </ScrollView> */}

        <NavigationBar appPages={this.state.appPages} currentActivePage={this.state.currentActivePage} handleNavbarPageChange={this.handleNavbarPageChange} />

      </SafeAreaView >
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
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Theme from "../config/Theme"

import Icon from "react-native-vector-icons/Ionicons"

export default class NavigationBar extends React.Component {

  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <View style={{ paddingBottom: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {this.props.appPages.map((page, index) => (
            <View style={{alignItems: "center"}} key={index}>
              <Icon key={index} name={page} style={page == this.props.currentActivePage ? styles.highlightedText : styles.normalNavbarIcon} onPress={() => this.props.handleNavbarPageChange(page)} />
              <View style={ page == this.props.currentActivePage ? styles.navigationCircle : styles.displayHidden } />
            </View>
          ))}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({

  backgroundStyle: {
    backgroundColor: Theme.backgroundColor,
  },

  highlightedText: {
    color: Theme.primaryColor,
    fontSize: 24
  },

  normalNavbarIcon: {
    color: "white",
    fontSize: 24
  },

  displayHidden: {
    display: "none",
  },

  navigationCircle: {
    marginTop: 5,
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: Theme.primaryColor
  },
});
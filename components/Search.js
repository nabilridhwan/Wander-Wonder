/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// Profile Page
// Nabil Ridhwanshah 
// P2007421
// DIT/FT/1B/05


import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import Theme from '../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Guides from "../assets/data/Guides";

export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery: "",
      displayData: [],
    }
  }

  handleSearch(searchQuery){
    this.setState({
      searchQuery: searchQuery,
      displayData: Guides.filter(guide => guide.title.toLowerCase().includes(searchQuery))
    })
    
  }
  render() {
    return (
      <View style={{ flex: 1, ...styles.backgroundStyle }}>

           <TouchableOpacity style={{flexDirection:"row",backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "space-around", borderRadius: 10, marginBottom: 10}}>
                <TextInput placeholder='Search Guide' placeholderTextColor={"rgba(255,255,255,0.6)"} style={{color: "white", padding: 10}} onChangeText={(inputText) => this.handleSearch(inputText)}></TextInput>
                <Icon onPress={(inputText) => this.handleSearch(inputText)} name="search" color="white" size={26}/>
           </TouchableOpacity>

      </View >
    );
  }
};

const styles = StyleSheet.create({
  backgroundStyle: {
    padding: 20,
    backgroundColor: Theme.backgroundColor,
  },

  defaultText: {
    color: "white",
  },
});
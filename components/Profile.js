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
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Card from './Card';
import Theme from '../config/Theme';

import Guides from "../assets/data/Guides"

export default class Profile extends React.Component {

  constructor({ props }) {

    super(props);
    this.state = {
      searchQuery: "",
      displayData: Guides,
    }
  }

  componentDidMount() {
    const likedGuides = Guides.filter(guide => guide.liked)
    this.setState({
      displayData: likedGuides
    })
  }

  render() {
    return (
      <View style={{ flex: 1, ...styles.backgroundStyle }}>


          {/* Image */}
          <View style={{justifyContent: "center", alignItems: "center"}} >
            <Image source={require("../assets/images/profilepicture.png")} style={{borderRadius: 999}}/>
          </View>
          
           <Text style={{...styles.defaultText, textAlign: "center", fontWeight: "bold", fontSize: 24}}>Nabil Ridhwan</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)"}}>@nabilridhwan</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)"}}>I love travelling!</Text>

           <View style={{alignItems: "center"}}>
           <TouchableOpacity style={{backgroundColor: "#8987FF", height: 35, justifyContent: "center", borderRadius: 10, width: "60%"}}>
             <Text style={{...styles.defaultText, textAlign: "center"}}>Edit Profile</Text>
           </TouchableOpacity>
           </View>

           {/* <Text style={{...styles.defaultText, fontSize: 30, fontWeight: "bold"}}>Favourites</Text>


           <TouchableOpacity style={{backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "center", borderRadius: 10}}>

           <TextInput placeholder='Search your favourites...' placeholderTextColor={"rgba(255,255,255,0.6)"} style={{color: "white", padding: 10}} onChangeText={(inputText) => this.handleSearch(inputText)}></TextInput>
           </TouchableOpacity>

           <FlatList
              data={this.state.displayData}
              renderItem={({item: guide}) => <Card image_url={guide.image_url} title={guide.title} countryEmoji={guide.countryEmoji} author={guide.author} liked={guide.liked} />}
              keyExtractor={(item, index) => index}
              numColumns={2}
           /> */}

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

});
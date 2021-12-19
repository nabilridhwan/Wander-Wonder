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

export default class Favourites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      likedPosts: [],
    }
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    const likedGuides = Guides.filter(guide => guide.liked)
    this.setState({
      searchQuery: "",
      likedPosts: likedGuides
    })
  }

  handleSearch(searchQuery) {
    this.setState({
      searchQuery: searchQuery,
      likedPosts: Guides.filter(guide => {
        console.log(guide)
          if(guide.liked){
            if(guide.title.toLowerCase().includes(searchQuery)){
              return guide
            }
          }
      })
    })

  }

  handleLike(postIndex) {
    const findPostAndToggleLike = this.state.likedPosts.filter((guide, index) => {
      if (index == postIndex) {
        guide.liked = !guide.liked;
      }

      return guide;
    })

    this.setState({ likedPosts: findPostAndToggleLike.filter(guide => guide.liked) })
  }

  renderNoGuide() {
    return (
      <Text style={styles.defaultText}>None</Text>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, ...styles.backgroundStyle }}>

        <Text style={{ ...styles.defaultText, fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>Favourites</Text>
        <Text style={{ color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Check in with your favourited guides!</Text>


        <TouchableOpacity style={{ backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "center", borderRadius: 10, marginBottom: 10 }}>
          <TextInput placeholder='Search your favourites...' placeholderTextColor={"rgba(255,255,255,0.6)"} style={{ color: "white", padding: 10 }} onChangeText={(inputText) => this.handleSearch(inputText)}></TextInput>
        </TouchableOpacity>

        <FlatList data={this.state.likedPosts} numColumns={2} renderItem={
          ({ item, index }) =>
            <Card place={item}
            index={index}
              handleLike={this.handleLike} />
        } keyExtractor={(item, index) => index.toString()} ListEmptyComponent={this.renderNoGuide} />

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
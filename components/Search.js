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


import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, FlatList, Text } from "react-native";
import Theme from '../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Guides from "../assets/data/Guides";
import Card from './Card';

export default () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [displayData, setDisplayData] = useState([]);


  const handleSearch = (searchQuery) => {

    if (searchQuery !== "") {
      setDisplayData(Guides.filter(guide => guide.title.toLowerCase().includes(searchQuery)))
    }
  }

  const handleLike = (postIndex) => {
    console.log(postIndex)
    const findPostAndToggleLike = displayData.filter((guide, index) => {
      if (index == postIndex) {
        guide.liked = !guide.liked;
      }

      return guide;
    })

    setDisplayData(findPostAndToggleLike)
  }

  const renderNoGuide = () => {
    // TODO: Fix error. When flatlist is shown with nothing typed in, it will show no results found instead of being empty
    return (
      <View>
        {/* <Text style={{color: Theme.textColor}}>No results found</Text> */}
      </View>
    )
  }

  return (
    <View style={{ flex: 1, ...styles.backgroundStyle }}>

      <TouchableOpacity style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "space-between", borderRadius: 10, marginBottom: 10 }}>
        <TextInput onEndEditing={() => handleSearch(searchQuery)} placeholder='Search Guide' placeholderTextColor={"rgba(255,255,255,0.6)"} style={{ color: "white", padding: 10 }} onChangeText={(inputText) => setSearchQuery(inputText)}></TextInput>

        <View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
          <Icon onPress={() => handleSearch(searchQuery)} name="search" color="white" size={26} />
        </View>

      </TouchableOpacity>

      {searchQuery === "" ?
        <View>
          <Text style={{color: Theme.textColor}}>Hello!</Text>
        </View>

        :

        <FlatList data={displayData} renderItem={
          ({ item, index }) =>
            <Card place={item}
              index={index}
              handleLike={handleLike} />
        } keyExtractor={(item, index) => index.toString()} ListEmptyComponent={renderNoGuide} />
      }

    </View >
  );
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
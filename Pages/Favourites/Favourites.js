import { NavigationRouteContext } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Card from '../../components/Card';
import Theme from '../../config/Theme';
import { getAllGuides } from '../../utils/storage';

function Favourites({ navigation }) {

  const [likedPosts, setLikedPost] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    navigation.addListener('focus', () => {
      refreshGuides();
    })
  }, [])


  const refreshGuides = () => {
    getAllGuides().then(guides => {
      const likedGuides = guides.filter(guide => guide.liked)
      setLikedPost(likedGuides)
    }).catch(e => { console.log(e) })
  }

  const handleSearch = (searchQuery) => {

    setSearchQuery(searchQuery);

    getAllGuides().then(guides => {
      const likedGuides = guides.filter(guide => guide.liked && guide.title.toLowerCase().includes(searchQuery.toLowerCase()))

      setLikedPost(likedGuides)
    })
  }

  const renderNoGuide = () => {
    return (
      <Text style={styles.defaultText}>None favourites found! Start pressing the heart icon, and they'll appear here!</Text>
    )
  }

  const handleChangeText = (inputText) => {
    handleSearch(inputText);
  }

  const handleLikeButton = (guide) => {
    console.log(guide);
    handleLike(guide);
  }

  return (
    <View style={{ flex: 1, ...styles.backgroundStyle }}>


      {/* Input box for search */}
      <TouchableOpacity style={{ backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "center", borderRadius: 10, marginBottom: 10 }}>
        <TextInput placeholder='Search your favourites...' value={searchQuery} placeholderTextColor={"rgba(255,255,255,0.6)"} style={{ color: "white", padding: 10 }} onChangeText={handleChangeText}></TextInput>
      </TouchableOpacity>

      {/* Display card */}
      <FlatList data={likedPosts} numColumns={2} renderItem={
        ({ item, index }) =>
          <Card place={item}
            index={index}
            refreshGuides={refreshGuides} />
      } keyExtractor={(item) => item.id} ListEmptyComponent={renderNoGuide} />
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

export default Favourites;
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Card from '../../components/Card';
import Theme from '../../config/Theme';

function Favourites({ guides: guideProps, handleLike }) {

  const [likedPosts, setLikedPost] = useState(guideProps);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // TODO: Filter out properly
    setLikedPost(guideProps.filter(post => post.liked));
  }, [guideProps])
  

  const handleSearch = (searchQuery) => {
    const filteredGuides = guideProps.filter(guide => {
      if (guide.liked && guide.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())) {
        return guide;
      }
    })

    setSearchQuery(searchQuery);
    setLikedPost(filteredGuides);
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
    handleLike(guide);
  }

  return (
    <View style={{ flex: 1, ...styles.backgroundStyle }}>


      {/* Input box for search */}
      <TouchableOpacity style={{ backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "center", borderRadius: 10, marginBottom: 10 }}>
        <TextInput placeholder='Search your favourites...' value={searchQuery}  placeholderTextColor={"rgba(255,255,255,0.6)"} style={{ color: "white", padding: 10 }} onChangeText={handleChangeText}></TextInput>
      </TouchableOpacity>

      {/* Display card */}
      <FlatList data={likedPosts} numColumns={2} renderItem={
        ({ item, index }) =>
          <Card place={item}
            index={index}
            handleLike={handleLikeButton} />
      } keyExtractor={(item, index) => index} ListEmptyComponent={renderNoGuide} />
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
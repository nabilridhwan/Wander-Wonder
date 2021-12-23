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
import { StyleSheet, View, TouchableOpacity, TextInput, FlatList, Text, ScrollView} from "react-native";
import Theme from '../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Guides from "../assets/data/Guides";
import Card from './Card';

export default () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [recentSearches, setRecentSearches] = useState(["Universal Studios", "Marina Bay Sands"]);
  const [hotSearches, setHotSearches] = useState(["Opera House", "New Zealand"]);

  useEffect(() => {
    if(searchQuery == ""){
      console.log("empty")
      setDisplayData([]);
    }
  }, [searchQuery])

  const handleSearch = (searchQuery) => {
    if (searchQuery !== "") {
      setDisplayData(Guides.filter(guide => guide.title.toLowerCase().includes(searchQuery.toLowerCase())))

      setRecentSearches([searchQuery, ...recentSearches.filter(search => search != searchQuery)]);
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

  const handleSearchPress = (index) => {
    const recentSearch = recentSearches[index]
    console.log(`Tapped on ${recentSearch}`)
    setSearchQuery(recentSearch);
    handleSearch(recentSearch);
  }

  const handleHotSearchPress = (index) => {
    const hotSearchQuery = hotSearches[index]
    console.log(`Tapped on ${hotSearchQuery}`)
    setSearchQuery(hotSearchQuery);
    handleSearch(hotSearchQuery);
  }


  const handleRecentDelete = (index) => {
    setRecentSearches(recentSearches.filter((search, i) => i != index))
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

    // TODO: Fix not scrolling
    <View style={{ flex: 1, ...styles.backgroundStyle }}>

      <View
        style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "space-between", borderRadius: 10, marginBottom: 10 }}
      >
        <TextInput
          style={{ backgroundColor: "red" }}
          value={searchQuery}
          onEndEditing={() => handleSearch(searchQuery)}
          placeholder='Search Guide'
          placeholderTextColor={"rgba(255,255,255,0.6)"}
          style={{ color: "white", padding: 10 }}
          onChangeText={(inputText) => setSearchQuery(inputText)}

        />

        <View
          style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}
        >
          <Icon
            onPress={() => handleSearch(searchQuery)}
            name="search" color="white" size={26}
          />
        </View>
      </View>

      {displayData.length == 0 ?
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 23 }}>
            <Text style={{ color: Theme.textColor, fontWeight: 'bold', fontSize: 15 }}>Recent</Text>
            <Text style={{ color: Theme.primaryColor, fontWeight: 'bold', fontSize: 15 }} onPress={() => setRecentSearches([])}>Clear All</Text>
          </View>

          {recentSearches.map((search, index) => (
            <TouchableOpacity key={index} style={styles.search} onPress={() => handleSearchPress(index)}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.timeIconContainer} >
                  <Icon name="time" color="#FFA5A5" size={26} />
                </View>
                <View style={styles.searchTitle}>
                  <Text style={{ color: Theme.textColor }}>{search}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.trashIconContainer}>
                <Icon name="trash" onPress={() => handleRecentDelete(index)} color="rgba(255,255,255,0.7)" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>

          ))}


          <View style={{ marginVertical: 50 }}>

            <Text style={{ color: Theme.textColor, fontWeight: 'bold', fontSize: 15 }}>Hot</Text>

            {hotSearches.map((search, index) => (
              <TouchableOpacity key={index} style={styles.search} onPress={() => handleHotSearchPress(index)}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.timeIconContainer} >
                    <Icon name="flame" color="#FF014D" size={26} />
                  </View>
                  <View style={styles.searchTitle}>
                    <Text style={{ color: Theme.textColor }}>{search}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}



          </View>
        </View>

        :

        <FlatList data={displayData} renderItem={
          ({ item, index }) =>
            <Card place={item}
              index={index}
              handleLike={handleLike} />
        } keyExtractor={(item, index) => index.toString()} ListEmptyComponent={renderNoGuide} />
      }

    </View>
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
  search: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "rgba(255,255,255,0.7)",
    borderBottomWidth: 1
  },
  searchTitle: {
    justifyContent: "center",
    marginLeft: 14,
  },
  trashIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: 'center',
  },
  timeIconContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
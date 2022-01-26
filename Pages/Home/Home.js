import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import Theme from '../../config/Theme';
import { addNewCommentByPostId, flushAllData, flushGuides, getAllCommentsByPostId, getAllGuides, initGuide } from '../../utils/storage';

export default ({ navigation }) => {
  const [pages, setPages] = useState(["All", "Singapore", "Oceania", "Asia", "Europe", "America"])
  const [currentPage, setCurrentPage] = useState("All")
  const [guides, setGuides] = useState([])

  useEffect(() => {
    navigation.addListener('focus', () => {
      refreshGuides();

      // Uncomment below to flush all guides
      // flushGuides();

      initGuide();
    })
  }, [])

  const refreshGuides = () => {
    getAllGuides().then(guides => {
      setGuides(guides)
    })
  }

  let handlePageChange = (page) => {
    // Filter out page
    if (page != pages[0]) {
      const newGuides = propGuides.filter(guide => guide.category == page)
      setGuides(newGuides);
    } else {
      setGuides(propGuides);
    }

    setCurrentPage(page)
  }

  const renderNoGuide = () => {
    return (
      <Text style={styles.defaultText}>
        No Guides Found!
      </Text>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>
      <Image source={require("../../assets/images/header.png")} style={styles.headerImage} resizeMode='cover' />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={styles.navigation}>
          {pages.map((page, index) =>

            <View style={styles.innerNavigation} key={index} onTouchEnd={() => handlePageChange(page)}>

              <Text style={currentPage == page ? styles.highlightedText : styles.defaultText}>
                {page}
              </Text>

              <View style={currentPage == page ? styles.navigationCircle : styles.displayHidden}></View>
            </View>

          )}
        </View>

        <FlatList data={guides} numColumns={2} renderItem={
          ({ item, index }) =>
            <Card place={item}
              index={index}
              refreshGuides={refreshGuides} />
        } keyExtractor={(item) => item.id} ListEmptyComponent={renderNoGuide} />

      </View>

    </SafeAreaView >
  );
};

const styles = StyleSheet.create({

  headerImage: {
    width: "100%",
  },

  backgroundStyle: {
    backgroundColor: Theme.backgroundColor,
  },

  defaultText: {
    height: 20,
    color: "white",
  },

  highlightedText: {
    height: 20,
    color: Theme.primaryColor
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 20,
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
  }
})
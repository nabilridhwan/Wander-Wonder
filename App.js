/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, ImageBackground } from "react-native";
import Theme from './config/Theme';

import HomePageData from "./homePageData"

export default function App() {

  const [pages, setPages] = useState(["All", "Singapore", "Oceania", "Asia", "Europe", "America"])
  const [currentPage, setCurrentPage] = useState();
  const [homePageData, setHomePageData] = useState({});

  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  }

  useEffect(() => {
    Object.keys(HomePageData).forEach(region => {
      HomePageData["All"] = [...HomePageData[region]]
    })

    setHomePageData(HomePageData)
    setCurrentPage(pages[1]);
  }, [])

  const renderItem = (guide) => {
    // console.log(`./images/${guide.image_url}`)
    return (
      <View style={styles.card}>
        <View>
          <ImageBackground source={guide.image_url} style={card.image} resizeMode='cover'>


            <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>

              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.defaultText}>Top left</Text>
                <Text style={styles.defaultText}>Top right</Text>

              </View>

              {/* TODO: Fix text wrappings for title and author! */}
              <View>
                <Text style={{...styles.defaultText, flexWrap: "wrap"}}>{guide.title}</Text>
                <Text style={styles.defaultText}>{guide.author}</Text>
              </View>
            </View>

          </ImageBackground>

        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image source={require("./images/header.png")} style={styles.headerImage} resizeMode='cover' />

      <View style={{ flex: 1, ...styles.backgroundStyle }}>

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

        {/* Header part
        <View>
          <Text style={styles.title}>Explore new places</Text>
          <Text style={styles.subtitle}>Travel and explore the world!</Text>
        </View>

        {/* Main cards */}

        <View style={styles.cardWrapper}>
          {/* <FlatList data={homePageData[currentPage]} renderItem={renderItem} keyExtractor={item => item.id} /> */}
          {homePageData[currentPage] &&
            homePageData[currentPage].map(places => renderItem(places))
          }
        </View>

        {/* <View style={{ flexDirection: "row" ,flexWrap: "wrap"}}>

            <View style={{  height: 200,  width: 150, backgroundColor: "red" }}>
              <View>
                <Text>Hi</Text>
                <Text>Hi</Text>
              </View>
            </View>

            <View style={{  height: 200,  width: 150, backgroundColor: "purple" }}>

            </View>

            <View style={{  height: 200,  width: 150, backgroundColor: "blue" }}>

            </View>

          </View> */}

      </View>

    </SafeAreaView>
  );
};

const card = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  }
})

const styles = StyleSheet.create({

  card: {
    width: "45%",
    height: "auto",
    marginBottom: 20,
    borderRadius: 400,
  },

  cardWrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerImage: {
    width: "100%",
  },

  backgroundStyle: {
    padding: 20,
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
  }
});
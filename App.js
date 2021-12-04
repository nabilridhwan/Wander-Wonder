/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Theme from './config/Theme';

const path = require("path");

export default function App() {

  const [pages, setPages] = useState(["All", "Singapore", "Oceania", "Asia", "Europe", "America"])
  const [currentPage, setCurrentPage] = useState();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    setCurrentPage(pages[0]);
  }, [])

  return (
    <SafeAreaView style={styles.backgroundStyle}>

      <Image source={require(__dirname + "/images/Group 68.png")} />
      
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

      <View>
        <Text style={styles.title}>Explore new places</Text>
        <Text style={styles.subtitle}>Travel and explore the world!</Text>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    padding: 20,
    flex: 1,
    backgroundColor: Theme.backgroundColor
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
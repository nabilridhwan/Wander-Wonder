/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import Theme from './config/Theme';

import HomePageData from "./homePageData"

export default class App extends React.Component {

  constructor({ props }) {
    super(props);
    this.state = {
      pages: ["All", "Singapore", "Oceania", "Asia", "Europe", "America"],
      currentPage: "",
      homePageData: {}
    }
  }

  componentDidMount() {
    HomePageData.All = [];
    Object.keys(HomePageData).forEach(region => {
      console.log(region)
      HomePageData.All.push(...HomePageData[region])
    })

    this.setState(
      {
        homePageData: HomePageData,
        currentPage: this.state.pages[1]
      }
    )
  }

  handlePageChange(page) {
    this.setState({currentPage: page})
  }

  renderItem({ item: guide, index }) {
    return (
      <View style={styles.card}>
        <TouchableOpacity>
          <ImageBackground imageStyle={{ borderRadius: 10 }} source={guide.image_url} style={card.image} resizeMode='cover'>


            <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>

              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={card.countryText}>{guide.country}</Text>
                <Text style={styles.defaultText}>Top right</Text>
              </View>

              <View>
                <Text style={card.titleText}>{guide.title}</Text>
                <Text style={card.authorText}>{guide.author}</Text>
              </View>
            </View>

          </ImageBackground>

        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>
        <Image source={require("./images/header.png")} style={styles.headerImage} resizeMode='cover' />

        <View style={{ flex: 1}}>

          <View style={styles.navigation}>
            {this.state.pages.map((page, index) =>

              <View style={styles.innerNavigation} key={index} onTouchEnd={() => this.handlePageChange(page)}>

                <Text style={this.state.currentPage == page ? styles.highlightedText : styles.defaultText}>
                  {page}
                </Text>

                <View style={this.state.currentPage == page ? styles.navigationCircle : styles.displayHidden}></View>
              </View>

            )}
          </View>

          {/* Header part */}
          {
            this.state.currentPage == "All" && 
            <View style={{marginBottom: 40}}>
            <Text style={styles.title}>Explore new places</Text>
            <Text style={styles.subtitle}>Travel and explore the world!</Text>
          </View>
          }
  

          <FlatList data={this.state.homePageData[this.state.currentPage]} numColumns={2} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>

        <View>
          <Text style={styles.defaultText}>Navigation Bar</Text>
        </View>

      </SafeAreaView >
    );
  }
};

const card = StyleSheet.create({
  image: {
    height: 200,
  },

  authorText: {
    color: "rgba(255,255,255,0.5)"
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  countryText:{
    fontSize: 18,
    color: "white",
  }
})

const styles = StyleSheet.create({

  card: {
    width: "49%",
    margin: 2
    // height: "auto",
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
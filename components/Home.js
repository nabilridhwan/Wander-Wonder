import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import Card from './Card';
import Theme from '../config/Theme';

import Guides from "../assets/data/Guides"

/*
  (IMPORT THIS TO APP.JS)
  ==============================
  Home Page
  ==============================
  Name: Nabil Ridhwanshah 
  Admin Number: P2007421
  Class: DIT/FT/1B/05
*/


export default class Home extends React.Component {

  constructor({ props }) {
    super(props);
    this.state = {
      pages: ["All", "Singapore", "Oceania", "Asia", "Europe", "America"],
      currentPage: "",
      guides: {}
    }

    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    this.setState({guides: Guides, currentPage: this.state.pages[0]})
  }

  handlePageChange(page) {
    // Filter out page
    if(page != this.state.pages[0]){
      const newGuides = Guides.filter(guide => guide.category == page)
      this.setState({guides: newGuides})
    }else{
      this.setState({guides: Guides})
    }
    this.setState({currentPage: page})
  }

  renderNoGuide(){
    return(
      <Text style={styles.defaultText}>None</Text>
    )
  }

  handleLike(postIndex){
    console.log(postIndex)
    const findPostAndToggleLike = this.state.guides.filter((guide, index) => {
      if(index == postIndex){
        guide.liked = !guide.liked;
      }

      return guide;
    })

    this.setState({guides: findPostAndToggleLike})
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>
        <Image source={require("../assets/images/header.png")} style={styles.headerImage} resizeMode='cover' />

        <View style={{ flex: 1, padding:20}}>
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
          {/* {
            this.state.currentPage == "All" && 
            <View style={{marginBottom: 40}}>
            <Text style={styles.title}>Explore new places</Text>
            <Text style={styles.subtitle}>Travel and explore the world!</Text>
          </View>
          } */}
  

          <FlatList data={this.state.guides} numColumns={2} renderItem={
            ({item, index}) => 
            <Card image_url={item.image_url}
                index={index}
                title={item.title}
                countryEmoji={item.countryEmoji}
                author={item.author}
                liked={item.liked}
                handleLike={this.handleLike} />
      } keyExtractor={(item, index) => index.toString()} ListEmptyComponent={this.renderNoGuide} />
          
        </View>

      </SafeAreaView >
    );
  }
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
});
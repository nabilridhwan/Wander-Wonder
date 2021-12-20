/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ImageBackground, Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../config/Theme';
export default ({ navigation, route }) => {
  const [animation, setAnimation] = useState("easeInEaseOut");
  const [place, setPlace] = useState(route.params.place);

  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground source={place.image_url} style={styles.image}>
        <View style={styles.smallContainer}>
          <Icon name="arrow-back-circle" size={45} color="silver" onPress={() => navigation.goBack()} style={{ marginLeft: 7, marginTop: 7 }} />
          <Icon name="heart" size={45} color={Theme.heartColor} style={{ marginRight: 7, marginTop: 7 }} />
        </View>

      </ImageBackground>

      <View style={{ flex: 3 }}>
        <ScrollView style={styles.panelContainer}>
          <Text style={styles.instructions}>{place.title}</Text>
          <Text style={styles.author}>By {place.author}</Text>

          <View style={styles.subContainerSection}>
            <View style={styles.activeButton}>
              <Text style={styles.subContainerText}>Overview</Text>
            </View>

            <View style={styles.button}>
              <Text style={styles.subContainerText}>Itinerary</Text>
            </View>

          </View>
          {/* <Text style={styles.singlequote}>“</Text> */}
          <Text style={styles.description}>{place.description}</Text>
          {/* <Text style={styles.singlequote}>”</Text> */}
        </ScrollView>
      </View>

      <TouchableOpacity style={{position: "absolute", bottom: 10, right: 20, backgroundColor: Theme.primaryColor, borderRadius: 999, padding: 15, elevation: 2}}>
        <Icon name="navigate" color={Theme.textColor} size={38} onPress={() => navigation.navigate("Map", {place: place})} />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "900",
  },
  author: {
    textAlign: 'center',
    color: '#BFBFBF',
    marginBottom: 20,
    fontSize: 14,
  },
  subContainerSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 30,
    paddingVertical: 10
  },

  activeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: Theme.primaryColor
  },

  subContainerText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
  },

  singlequote: {
    color: '#FE5252',
    fontSize: 60,
    padding: 0,
    margin: 0
  },
  description: {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 25,
  },
  panelContainer: {
    backgroundColor: Theme.backgroundColor,
    padding: 20
  },
  container: {
    flex: 1,
    borderRadius: 100
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


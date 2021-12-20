/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ImageBackground, Platform, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import SwipeUpDown from 'react-native-swipe-up-down';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../config/Theme';
export default ({ navigation, route }) => {
  const [animation, setAnimation] = useState("easeInEaseOut");
  const [place, setPlace] = useState(route.params.place);

  return (
    <View style={styles.container}>
      <ImageBackground source={place.image_url} style={styles.image}>
        <View style={styles.smallContainer}>
          <Icon name="arrow-back-circle" size={45} color="silver" onPress={() => navigation.goBack()} style={{ marginLeft: 7, marginTop: 7 }} />
          <Icon name="heart" size={45} color={Theme.heartColor} style={{ marginRight: 7, marginTop: 7 }} />
        </View>

      </ImageBackground>
      <SwipeUpDown
        // hasRef={ref => (this.swipeUpDownRef = ref)}
        itemMini={
          <View style={{ alignItems: 'center' }}>
            <Text>This is the mini view, swipe up!</Text>
          </View>
        }
        itemFull={
          <View style={styles.panelContainer}>
            <Text style={styles.instructions}>{place.title}</Text>
            <Text style={styles.author}>By {place.author}</Text>
            <View style={styles.subcontainer}>
              <View style={styles.button}>
                <Text style={styles.overview}>Overview</Text>
              </View>
              <Text style={styles.itinerary}>Itinerary</Text>
            </View>
            <Text style={styles.singlequote}>“</Text>
            <Text style={styles.description}>{place.description}</Text>
            <Text style={styles.singlequote}>”</Text>
          </View>
        }
        onShowMini={() => console.log('mini')}
        onShowFull={() => console.log('full')}
        disablePressToShow={true}
        style={{ backgroundColor: 'black', borderTopRightRadius: 30, borderTopLeftRadius: 30, borderTopEndRadius: 30 }}
        animation={animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginTop: 30,
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 26
  },
  author: {
    textAlign: 'center',
    color: '#BFBFBF',
    marginBottom: 20,
    fontSize: 14,
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  overview: {
    color: 'white',
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8987FF',
    borderWidth: 1,
    borderRadius: 32,
    margin: 5,
    padding: 15,
    paddingBottom: 4
  },
  itinerary: {
    color: 'white',
    marginBottom: 20,
    marginLeft: 15,
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 20
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
    margin: 8,
    justifyContent: 'space-evenly'
  },
  panelContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
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


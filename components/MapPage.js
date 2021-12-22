import React, { useState, useEffect } from "react";
import MapView, {Marker } from 'react-native-maps';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Theme from "../config/Theme";
import Icon from "react-native-vector-icons/Ionicons"


export default ({navigation, route}) => {
  const props = route.params;
  const [region, setRegion] = useState({
    longitude: props.place.longitude,
    latitude: props.place.latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


  return (
    <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: Theme.backgroundColor, position: "absolute", zIndex: 1, borderRadius: 999, top: 10, left: 10, padding: 5 }}>
        <Icon name="arrow-back" color={"white"} size={25} />
      </TouchableOpacity>
      <MapView style={{ flex: 1 }}
        customMapStyle={Theme.MapStyle}
        initialRegion={region}>

        <Marker
          key={0}
          coordinate={{latitude: region.latitude, longitude: region.longitude}} title={props.place.title} />
      </MapView>

      <View style={{ alignItems: "center" }}>
        <View style={{ position: "absolute", ...styles.backgroundStyle, bottom: 20, padding: 20, width: "90%", borderRadius: 20 }}  >
          <Text style={{ ...styles.title, fontWeight: "bold", fontSize: 24 }}>
            {props.place.title}
          </Text>

          <Text style={{ ...styles.subtitle, marginBottom: 30 }}>
            By {props.place.author}
          </Text>

          <Text style={{ ...styles.defaultText }}>
            {props.place.description}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  headerImage: {
    width: "100%",
  },

  backgroundStyle: {
    backgroundColor: Theme.backgroundColor,
  },

  defaultText: {
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
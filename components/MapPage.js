import React, { useState, useEffect } from "react";
import MapView, { LocalTile, Marker } from 'react-native-maps';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Theme from "../config/Theme";
import Icon from "react-native-vector-icons/Ionicons"


export default ({navigation, route}) => {
  const props = route.params;
  console.log(props)
  const [viewHeight, setViewHeight] = useState(100)
  const [region, setRegion] = useState({
    longitude: props.place.longitude,
    latitude: props.place.latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    console.log(region)
  }, [])



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

        {props.place.nearbyPlaces.map((p, index) => {
          console.log(p)
          return (
            <Marker
              key={index + 1}
              pinColor="indigo"
              coordinate={{ latitude: p.longitude, longitude: p.latitude }} title={p.name} />
          )
        })}
      </MapView>

      {/* <View style={{ position: "absolute", bottom: 15, flex: 1, alignItems: "center", width: "100%" }}>
        <View style={{ ...styles.backgroundStyle, padding: 30, borderRadius: 20, width: "90%" }}>

        </View>
      </View> */}

      <View style={{ alignItems: "center" }}>
        <View style={{ position: "absolute", ...styles.backgroundStyle, bottom: 20, padding: 20, width: "90%", borderRadius: 20 }}  >
          <Text style={{ ...styles.title, fontWeight: "bold", fontSize: 24 }}>
            {props.place.title}
          </Text>

          <Text style={{ ...styles.subtitle, marginBottom: 30 }}>
            By {props.place.author}
          </Text>

          {/* {this.state.viewHeight == "auto" && <Text style={{ ...styles.defaultText }}>
            {this.props.place.description}
          </Text>} */}


          <Text style={{ ...styles.defaultText }}>
            {props.place.description}
          </Text>
        </View>
      </View>



      {/* <SwipeUpDown
        itemMini={<ItemMini />} // Pass props component when collapsed
        itemFull={<ItemMini />} // Pass props component when show full
        // onShowMini={() => console.log('mini')}
        // onShowFull={() => console.log('full')}
        // onMoveDown={() => console.log('down')}
        // onMoveUp={() => console.log('up')}
        disablePressToShow={false} // Press item mini to show full
        swipeHeight={170}
        style={{ backgroundColor: Theme.backgroundColor, padding: 25, zIndex: 2}} // style for swipe
      /> */}

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
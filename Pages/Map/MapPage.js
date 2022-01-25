import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import Theme from "../../config/Theme";
import Icon from "react-native-vector-icons/Ionicons"
import Carousel, { Pagination } from 'react-native-snap-carousel';


const { width, height } = Dimensions.get('window');

export default ({ navigation, route: { params: { place } } }) => {
  const [region, setRegion] = useState({
    longitude: place.longitude,
    latitude: place.latitude,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  })

  const [entries, setEntries] = useState([])
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {

    console.log("Map page")

    if (place.nearbyPlaces) {
      setEntries([place, ...place.nearbyPlaces]);
    } else {
      setEntries([place]);
    }
  }, [])

  const _renderItem = ({ item, index }) => {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Image source={item.image_url} style={{ width: "100%", height: 120 }} />

        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={{ ...styles.defaultText, textAlign: "center" }}>{item.description}</Text>
        </View>
      </ScrollView>
    );
  }

  const pagination = () => {
    return <Pagination
      carouselRef={carouselRef}
      dotsLength={entries.length}
      activeDotIndex={activeSlide}
      containerStyle={{ backgroundColor: 'transparent' }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: Theme.primaryColor
      }}
      inactiveDotStyle={{
        // Define styles for inactive dots here
      }}
      tappableDots={true}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  }

  const handleSnap = (index) => {
    setRegion({ ...region, latitude: entries[index].latitude, longitude: entries[index].longitude })
    carouselRef.current.snapToItem(index);
    setActiveSlide(index);
  }

  return (
    <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle, backgroundColor: Theme.backgroundColor }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: Theme.backgroundColor, position: "absolute", zIndex: 1, borderRadius: 999, top: 10, left: 10, padding: 5 }}>
        <Icon name="arrow-back" color={"white"} size={25} />
      </TouchableOpacity>
      <MapView style={{ flex: 1 }}
        customMapStyle={Theme.MapStyle}
        region={region}
        initialRegion={region}>
        <Marker
          key={0}
          onPress={() => handleSnap(0)}
          coordinate={{ latitude: region.latitude, longitude: region.longitude }} title={place.title} />
        {entries.map((p, i) => {
          return <Marker
            key={i + 1}
            onPress={() => handleSnap(i)}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.title} />
        })}


      </MapView>

<View style={{flex: 1}}>
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          containerCustomStyle={{ flex: 1}}
          slideStyle={{ flex: 1 }}
          tappableDots={true}
          onSnapToItem={(index) => handleSnap(index)}
        />
        </View>


      {entries.length > 1 && pagination()}
      {/* <View style={{ alignItems: "center" }}>
        <View style={{ position: "absolute", ...styles.backgroundStyle, bottom: 20, padding: 20, width: "90%", borderRadius: 20 }}  >
          <Text style={{ ...styles.title, fontWeight: "bold", fontSize: 24 }}>
            {place.title}
          </Text>

          <Text style={{ ...styles.subtitle, marginBottom: 30 }}>
            By {place.author}
          </Text>

          <Text style={styles.descriptionText}>
            {place.description}
          </Text>
        </View>
      </View> */}
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

  descriptionText: {
    color: "white",
    lineHeight: 20,
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
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  }
});
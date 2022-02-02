import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import Theme from "../config/Theme"
import { useNavigation } from '@react-navigation/native';
import { toggleLikeOnGuide } from "../utils/storage";


export default (props) => {
  const [place, setPlace] = useState(props.place);
  const index = props.index;
  const navigation = useNavigation();

  const navigateToGuidesPage = () => {
    navigation.navigate("Guide Page", { place: { ...props.place, index }})
  }

  useEffect(() => {
    setPlace(props.place);
  }, [props.place])

  const handleClickOnLikeButton = () => {
    toggleLikeOnGuide({id: place.id}).then(() => {
      console.log(place.id)
      props.refreshGuides();
    })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={navigateToGuidesPage}>

        <ImageBackground imageStyle={{ borderRadius: 10 }} style={card.image} source={{uri: place.image_url[0]}} resizeMode='cover'>

          <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "rgba(0,0,0,0.3)", padding: 10 }}>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={card.countryText}>{place.countryEmoji}</Text>

              {place.liked ?
                <Icon name="heart" color={Theme.heartColor} size={28} onPress={handleClickOnLikeButton} />
                :
                <Icon name="heart-outline" color={Theme.heartColorOutline} size={28} onPress={handleClickOnLikeButton} />
              }
            </View>

            <View>
              <Text style={card.titleText}>{place.title}</Text>
              <Text style={card.authorText}>{place.author}</Text>
            </View>
          </View>

        </ImageBackground>

    </TouchableOpacity>
  )
}

// Styles for the card elements
const card = StyleSheet.create({
  image: {
    width: "100%", height: "100%"
  },

  authorText: {
    color: "rgba(255,255,255,0.5)"
  },

  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  countryText: {
    fontSize: 18,
    color: "white",
  }
})

// Styles specific to the page
const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "47%",
    margin: 5
  },
});
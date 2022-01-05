import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import Theme from "../config/Theme"
import { useNavigation } from '@react-navigation/native';


export default (props) => {
  const [place, setPlace] = useState(props.place);
  const index = props.index;
  const handleLike = props.handleLike;
  const navigation = useNavigation();

  const navigateToGuidesPage = () => {
    navigation.navigate("Guide Page", { place: { ...props.place, index }, handleLike: handleLike })
  }

  const handleClickOnLikeButton = () => {
    handleLike(place);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={navigateToGuidesPage}>
      <View>

        <ImageBackground imageStyle={{ borderRadius: 10 }} style={card.image} source={place.image_url} resizeMode='cover'>

          <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>

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
      </View>

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
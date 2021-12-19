import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import Theme from "../config/Theme"


export default class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity>
          <ImageBackground imageStyle={{ borderRadius: 10 }} source={this.props.image_url} style={card.image} resizeMode='cover'>


            <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>

              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={card.countryText}>{this.props.countryEmoji}</Text>

                {this.props.liked ?
                  <Icon name="heart" color={Theme.heartColor} size={28} onPress={()=>this.props.handleLike(this.props.index)} />
                  :
                  <Icon name="heart-outline" color={Theme.heartColorOutline} size={28} onPress={()=>this.props.handleLike(this.props.index)} />
                }
              </View>

              <View>
                <Text style={card.titleText}>{this.props.title}</Text>
                <Text style={card.authorText}>{this.props.author}</Text>
              </View>
            </View>

          </ImageBackground>

        </TouchableOpacity>
      </View>
    )
  }
}

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

  countryText: {
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
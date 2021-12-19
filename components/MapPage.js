import React, { Component } from "react";
import MapView, { LocalTile, Marker } from 'react-native-maps';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Theme from "../config/Theme";
import Icon from "react-native-vector-icons/Ionicons"


export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewHeight: 100,
      region: {
        latitude: 1.2491509180953102,
        longitude: 103.82258531262073,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }

    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    console.log(this.props.place.location)
    this.setState({
      region: {
        latitude: this.props.place.location.latitude,
        longitude: this.props.place.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
  }

  handleExpand() {
    if (this.state.viewHeight != "auto") {
      this.setState({
        viewHeight: "auto"
      })

    } else {
      this.setState({
        viewHeight: 100
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, ...styles.backgroundStyle }}>

        <TouchableOpacity style={{ backgroundColor: Theme.backgroundColor, position: "absolute", zIndex: 1, borderRadius: 999, top: 10, left: 10, padding: 5 }}>
          <Icon name="arrow-back" color={"white"} size={25} />
        </TouchableOpacity>
        <MapView style={{ flex: 1 }}
          customMapStyle={Theme.MapStyle}
          region={this.state.region}>

          <Marker
            key={0}
            coordinate={{ latitude: this.props.place.location.latitude, longitude: this.props.place.location.longitude }} title={this.props.place.title} />

          {this.props.place.nearbyPlaces.map((p, index) => {
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
          <View style={{ position: "absolute", ...styles.backgroundStyle, bottom: 20, padding: 20, width: "90%", borderRadius: 20 }} onTouchEnd={this.handleExpand}   >
            <Text style={{ ...styles.title, fontWeight: "bold", fontSize: 24 }}>
              {this.props.place.title}
            </Text>

            <Text style={{ ...styles.subtitle, marginBottom: 30 }}>
              By {this.props.place.author}
            </Text>

            {/* {this.state.viewHeight == "auto" && <Text style={{ ...styles.defaultText }}>
              {this.props.place.description}
            </Text>} */}


            <Text style={{ ...styles.defaultText }}>
              {this.props.place.description}
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
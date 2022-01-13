import React, { useEffect, useState, useRef } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button, ImageBackground, TextInput, Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import ItineraryContent from './ItineraryContent';
import OverviewContent from './OverviewContent';
import Review from './Review';

// Deconstruct the props
// get the place, and handleLike from route.params
export default ({ navigation, route: { params: { place, handleLike: handleLikePropFunc } } }) => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [activePage, setActivePage] = useState("Overview")
  const [liked, setLiked] = useState(place.liked)
  const [image, setImage] = useState([{
    image: require(`../../assets/images/singapore/USS.png`),
  },
  {
    image: require(`../../assets/images/singapore/USS1.jpg`),
  },
  {
    image: require(`../../assets/images/singapore/USS2.jpg`),
  },
  {
    image: require(`../../assets/images/singapore/USS3.jpg`),
  },
  {
    image: require(`../../assets/images/singapore/USS4.jpg`),
  }])
  const handleLike = () => {
    setLiked(!liked)
  }
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: 'red',
        borderRadius: 5,
        flex: 1
      }}>
        <ImageBackground source={item.image} style={styles.image} />
      </View>
    )
  }
  // const _renderItem = ({ item, index }) => {
  //   return (

  // <ImageBackground source={item} style={styles.image}>
  //   <View style={styles.smallContainer}>
  //     <TouchableHighlight style={{ backgroundColor: Theme.backgroundColor, borderRadius: 999, alignItems: "center", justifyContent: "center", margin: 10 }}>
  //       <Icon name="arrow-back" size={25} color="silver" onPress={() => navigation.goBack()} style={{ padding: 5 }} />
  //     </TouchableHighlight>


  //     {liked ?
  //       <Icon name="heart" size={45} color={Theme.heartColor} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike} />
  //       :
  //       <Icon name="heart-outline" size={45} color={Theme.heartColorOutline} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike} />}
  //   </View>

  // </ImageBackground>
  //   );
  // }
  const changeActivePage = (page) => {
    console.log(page)
    setActivePage(page)
  };

  useEffect(() => {

    return () => {
      console.log("Unmounting Guides Page");
      console.log(`Original ${place.liked}`)
      console.log(`New ${liked}`)
      if (liked !== place.liked) {

        console.log("Like value is not the same! Calling the handleLike function!")
        handleLikePropFunc(place);
      }
    }

  }, [liked])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.smallContainer}>
          <TouchableHighlight style={{ backgroundColor: Theme.backgroundColor, borderRadius: 999, alignItems: "center", justifyContent: "center", margin: 10 }}>
            <Icon name="arrow-back" size={25} color="silver" onPress={() => navigation.goBack()} style={{ padding: 5 }} />
          </TouchableHighlight>


          {liked ?
            <Icon name="heart" size={45} color={Theme.heartColor} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike} />
            :
            <Icon name="heart-outline" size={45} color={Theme.heartColorOutline} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike} />}
        </View>
      <View style={{ flex: 4 }}>
        
        <Carousel
          ref={carouselRef}
          onSnapToItem={(index) => setIndex(index)}
          data={image}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          lockScrollWhileSnapping={true}
          autoplay={true}
          loop={true}
        />
        <Pagination
          carouselRef={carouselRef}
          tappabeDots={true}
          dotsLength={image.length}
          activeDotIndex={index}
          containerStyle={{ backgroundColor: Theme.backgroundColor, paddingBottom: 10 }}
          dotStyle={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Theme.primaryColor }}
          inactiveDotStyle={{ backgroundColor: 'rgb(255,230,230)' }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          image={image}
          index={index} />
      </View>
      {/* <ImageBackground source={place.image_url} style={styles.image}>
        <View style={styles.smallContainer}>
          <TouchableHighlight style={{ backgroundColor: Theme.backgroundColor, borderRadius: 999, alignItems: "center", justifyContent: "center", margin: 10 }}>
            <Icon name="arrow-back" size={25} color="silver" onPress={() => navigation.goBack()} style={{ padding: 5 }} />
          </TouchableHighlight>


          {liked ?
            <Icon name="heart" size={45} color={Theme.heartColor} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike}/>
            :
            <Icon name="heart-outline" size={45} color={Theme.heartColorOutline} style={{ marginRight: 7, marginTop: 7 }} onPress={handleLike}/>}
        </View>

      </ImageBackground> */}

      <View style={{ flex: 7 }}>
        <ScrollView style={styles.panelContainer}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.author}>By {place.author}</Text>

          <View style={styles.subContainerSection}>

            <View style={activePage == "Overview" ? { ...styles.activeButton, ...styles.button } : styles.button} onTouchEnd={() => changeActivePage("Overview")}>
              <Text style={styles.subContainerText}>Overview</Text>
            </View>

            <View style={activePage == "Itinerary" ? { ...styles.activeButton, ...styles.button } : styles.button} onTouchEnd={() => changeActivePage("Itinerary")}>
              <Text style={styles.subContainerText}>Itinerary</Text>
            </View>

            <View style={activePage == "Review" ? { ...styles.activeButton, ...styles.button } : styles.button} onTouchEnd={() => changeActivePage("Review")}>
              <Text style={styles.subContainerText}>Review</Text>
            </View>
          </View>
          {activePage == "Overview" && <OverviewContent place={place} />}
          {activePage == "Itinerary" && <ItineraryContent place={place} />}
          {activePage == "Review" && <Review place={place} />}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Map", { place: place })} style={activePage=="Review"?{...styles.floatingButtonStyles,bottom:83}:styles.floatingButtonStyles}>
        <Icon name="navigate" color={Theme.textColor} size={24} />
      </TouchableOpacity>
      <View style={activePage == "Review" ? { backgroundColor: Theme.backgroundColor, width: "100%", height: 50 } : { display: "none" }}>
        <TouchableOpacity style={activePage == "Review" ? { ...styles.floatingReviewStyles } : styles.hiddenFloatingButton}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 6 }}>
              <Image source={require("../../assets/images/profilepicture.png")} style={{ borderRadius: 999, width: 50, height: 50 }} />
            </View>
            <TextInput
              style={{ backgroundColor: "red" }}
              placeholder='Leave a comment as @wif_cuteXR'
              placeholderTextColor={"rgba(255,255,255,0.6)"}
              style={{ color: Theme.textColor, padding: 10 }}
            />
            <View style={{ justifyContent: 'center', marginHorizontal: 4 }}>
              <Icon name="send" color={Theme.primaryColor} size={24} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    marginVertical: 10,
    fontWeight: "700",
  },
  author: {
    textAlign: 'center',
    color: '#BFBFBF',
    marginBottom: 13,
    fontSize: 14,
  },
  subContainerSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  activeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    padding: 18,
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
    fontSize: 50,
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
    padding: 10,
    paddingTop: 10
  },
  container: {
    flex: 1,
    borderRadius: 100
  },
  image: {
    width: "100%",
    height: "100%"
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: "absolute",
    top: 0,
    zIndex:1,
    width:"100%"
  },
  floatingButtonStyles: {
    position: "absolute",
    bottom: 10,
    right: 20,
    backgroundColor: Theme.primaryColor,
    borderRadius: 999,
    padding: 20,
    elevation: 4
  },

  floatingReviewStyles: {
    position: "absolute",
    right: 20,
    bottom: 10,
    backgroundColor: "#404040",
    borderRadius: 21,
    padding: 8,
    elevation: 4
  },

  hiddenFloatingButton: {
    display: "none"
  },
  dotContainer: {
    backgroundColor: 'rgb(230,0,0)',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDotStyle: {
    backgroundColor: 'rgb(255,230,230)',
  }
});


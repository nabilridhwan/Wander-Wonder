import React, { useEffect, useState, useRef, useCallback } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ProgressBar from 'react-native-progress/Bar'
import moment from 'moment';
import { Button, ImageBackground, TextInput, Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, TouchableOpacityBase } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import { visitType } from '../GuidePage/Review';
import ItineraryContent from './ItineraryContent';
import OverviewContent from './OverviewContent';
import Review from './Review';
import Modal from "react-native-modal";
import { AirbnbRating } from 'react-native-ratings';
import MonthPicker from 'react-native-month-year-picker';


// Deconstruct the props
// get the place, and handleLike from route.params
export default ({ navigation, route: { params: { place, handleLike: handleLikePropFunc } } }) => {
  const carouselRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNextVisible, setNextVisible] = useState(false);
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
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );
  const handleLike = () => {
    setLiked(!liked)
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleNext = () => {
    setNextVisible(!isNextVisible);
  };
  const toggleBoth = () => {
    toggleModal();
    toggleNext();
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

      <TouchableOpacity onPress={() => navigation.navigate("Map", { place: place })} style={activePage == "Review" ? { ...styles.floatingButtonStyles, bottom: 83 } : styles.floatingButtonStyles}>
        <Icon name="navigate" color={Theme.textColor} size={24} />
      </TouchableOpacity>
      <View style={activePage == "Review" ? { backgroundColor: Theme.backgroundColor, width: "100%", height: 50 } : { display: "none" }}>
        <TouchableOpacity style={activePage == "Review" ? { ...styles.floatingReviewStyles } : styles.hiddenFloatingButton}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 6 }}>
              <Image source={require("../../assets/images/profilepicture.png")} style={{ borderRadius: 999, width: 50, height: 50 }} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}
              style={{ justifyContent: "center", color: Theme.textColor, padding: 10 }}>
              <Text style={{ color: "rgba(255,255,255,0.6)" }}>Leave a comment as @wif_cuteXR</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', marginHorizontal: 4 }}>
              <Icon name="send" color={Theme.primaryColor} size={24} />
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onRequestClose={toggleModal}
          onBackdropPress={toggleModal}
        >
          <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
            <View style={{ backgroundColor: Theme.textColor, borderRadius: 20, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
              <TouchableHighlight style={{ alignItems: "flex-start", justifyContent: "center" }}>
                <Icon name="close" size={30} color="silver" onPress={() => toggleModal()} />
              </TouchableHighlight>
              <View style={{ padding: 25 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: Theme.backgroundColor }}>Rate Your Experience</Text>
                <AirbnbRating
                  count={5}
                  reviews={["Terrible", "Poor", "Average", "Very Good", "Excellent"]}
                  defaultRating={5}
                  selectedColor={"#FFC909"}
                  size={30}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18, color: Theme.backgroundColor, marginTop: 18 }}>Kind Of Visit</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {
                    visitType.map((type) => {
                      return (
                        // <TouchableOpacity onPress={() => filterByRating(rating)}>
                        <TouchableOpacity>
                          <View style={{ flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, borderColor: "#979797", borderWidth: 2 }}>
                            <Text style={{ color: "rgba(0,0,9,0.5)", fontWeight: "bold" }}>{type}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: Theme.backgroundColor, marginTop: 18 }}>Visit Date</Text>
                <TouchableOpacity onPress={() => showPicker(true)} style={{ alignItems: "flex-start", justifyContent: "center", marginBottom: 15, borderWidth: 2, borderColor: Theme.backgroundColor, borderRadius: 10 }}>
                  <Text>{moment(date).format("MM-YYYY")}</Text>
                </TouchableOpacity>
                {show && (
                  <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    mode="short"
                    autoTheme={false}
                    maximumDate={new Date()}
                  />
                )}
                <ProgressBar progress={0.5} width={280} height={17} color={Theme.primaryColor} />
                <TouchableOpacity onPress={() => toggleBoth()} style={{ padding: 9, backgroundColor: Theme.backgroundColor, marginTop: 10 }}>
                  <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isNextVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackdropPress={toggleNext}
        >
          <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
            <View style={{ backgroundColor: Theme.textColor, borderRadius: 20, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
            <TouchableHighlight style={{ alignItems: "flex-start", justifyContent: "center" }}>
                <Icon name="close" size={30} color="silver" onPress={() => toggleModal()} />
              </TouchableHighlight>
              <View style={{ padding: 25 }}>
                <Text style={{fontWeight:"bold"}}>Write Your Review</Text>
                <TextInput
                        style={{ backgroundColor: "red" }}
                        value={searchQuery}
                        onEndEditing={() => handleSearch(searchQuery)}
                        placeholder='Tell us more about your ratings.'
                        placeholderTextColor={"rgba(0,0,0,0.6)"}
                        onChangeText={(inputText) => setSearchQuery(inputText)}
                    />
                <Text style={{fontWeight:"bold"}}>Title This Review</Text>
                <TextInput
                        value={searchQuery}
                        onEndEditing={() => handleSearch(searchQuery)}
                        placeholder='Summarize your visit in a few words.'
                        placeholderTextColor={"rgba(0,0,0,0.6)"}
                      onChangeText={(inputText) => setSearchQuery(inputText)}
                    />
              <ProgressBar progress={0.5} width={280} height={17} color={Theme.primaryColor} />
                <TouchableOpacity onPress={() => toggleBoth()} style={{ padding: 9, backgroundColor: Theme.backgroundColor, marginTop: 10 }}>
                  <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Next</Text>
                </TouchableOpacity>
                </View>
            </View>
          </View>
        </Modal>
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
    zIndex: 1,
    width: "100%"
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
  },
});


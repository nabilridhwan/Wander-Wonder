import React, {
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react';
import Carousel, {
  Pagination
} from 'react-native-snap-carousel';
import ProgressBar from 'react-native-progress/Bar';
import moment from 'moment';
import {
  Button,
  ImageBackground,
  TextInput,
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TouchableOpacityBase
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import ItineraryContent from './ItineraryContent';
import OverviewContent from './OverviewContent';
import Review from './Review';
import Modal from "react-native-modal";
import {
  AirbnbRating
} from 'react-native-ratings';
import MonthPicker from 'react-native-month-year-picker';
import { toggleLikeOnGuide, addNewCommentByPostId, getCurrentUser, getGuide } from '../../utils/storage';


// Deconstruct the props
// get the place, and handleLike from route.params
export default ({
  navigation,
  route: {
    params: {
      place,
    }
  }
}) => {

  const [id, setId] = useState(place.id);

  const carouselRef = useRef(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNextVisible, setNextVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [activePage, setActivePage] = useState("Overview")
  const [liked, setLiked] = useState(place.liked)

  const [profileImgSrc, setProfileImgSrc] = useState(null);
  const [username, setUsername] = useState(null)

  const [forceUpdate, setForceUpdate] = useState(0);

  const image= place.image_url;


  // componentDidMount
  useEffect(() => {

    console.log(place.id)

    getCurrentUser().then(user => {
      if (user.profile_pic_uri) {
        setProfileImgSrc({ uri: user.profile_pic_uri })
      }

      setUsername(user.username)
    })

    // This empty array is the dependency array
    // What is does is that it will only run the useEffect function when the array is changed
    // E.g. if the array is empty, it will only run the useEffect function when the array is changed
    // If the array is not empty, it will only run the useEffect function when the array is changed
  }, [])


  const doForceUpdate = () => {
    setForceUpdate(forceUpdate + 1);
  }


  const onSubmit = () => {
    if (review != "" && title != "") {

      setReview("");
      setTitle("")
      toggleNext();

      addNewCommentByPostId(id, title, review, new Date().toISOString(), rating).then(() => {
        doForceUpdate();
      })
    }
    else {
      alert("Title and review must be filled!")
    }
  }
  const handleLike = () => {
    toggleLikeOnGuide({ id: id }).then(() => {
      setLiked(!liked)
    })
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleNext = () => {
    setNextVisible(!isNextVisible);
  };
  const toggleBoth = () => {
    toggleModal()
    toggleNext()
  }
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{
        borderRadius: 5,
        flex: 1
      }}>
        <ImageBackground source={{uri: item }} style={styles.image} />
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
        <ScrollView style={styles.panelContainer} nestedScrollEnabled={true}>
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
          {activePage == "Review" && <Review place={place} forceUpdate={forceUpdate} />}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Map", { place: place })} style={activePage == "Review" ? { ...styles.floatingButtonStyles, bottom: 83 } : styles.floatingButtonStyles}>
        <Icon name="navigate" color={Theme.textColor} size={24} />
      </TouchableOpacity>


      <TouchableOpacity onPress={() => setModalVisible(true)} style={activePage == "Review" ? { ...styles.floatingReviewStyles, alignItems: "center" } : styles.hiddenFloatingButton}>

        <View style={{ backgroundColor: "#404040", width: "90%", padding: 10, borderRadius: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 6 }}>
              <Image source={profileImgSrc} style={{ borderRadius: 999, width: 50, height: 50 }} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
              <View style={{ justifyContent: "center", color: Theme.textColor, padding: 10 }}>
                <Text style={{ color: "rgba(255,255,255,0.6)" }}>Leave a comment as @{username}</Text>
              </View>


              <View style={{ justifyContent: "center", }}>
                <Icon name="send" color={Theme.primaryColor} size={24} />
              </View>
            </View>

          </View>

        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isModalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
          <View style={{ backgroundColor: Theme.textColor, borderRadius: 20, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>

            <TouchableHighlight style={{ alignItems: "flex-start", justifyContent: "center" }}>
              <Icon name="close" size={30} color="silver" onPress={() => setModalVisible(false)} />
            </TouchableHighlight>

            <View style={{ padding: 25 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: Theme.backgroundColor }}>Rate Your Experience</Text>
              <AirbnbRating
                count={5}
                reviews={["Terrible", "Poor", "Average", "Very Good", "Excellent"]}
                defaultRating={5}
                selectedColor={"#FFC909"}
                onFinishRating={(rating) => setRating(rating)}
                size={30}
              />
              {/* <ProgressBar progress={0.5} width={280} height={17} color={Theme.primaryColor} /> */}
              <TouchableOpacity onPress={() => { setModalVisible(false); setNextVisible(true) }} style={{ width: 100, borderRadius: 12, padding: 10, backgroundColor: Theme.primaryColor, marginTop: 18, alignItems: "center", alignSelf: "flex-end" }}>
                <Text style={{ color: Theme.textColor, fontWeight: "bold", fontSize: 21 }}>Next</Text>
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
      >
        <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
          <View style={{ backgroundColor: Theme.textColor, borderRadius: 20, padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>

            {/* Close button */}
            <TouchableHighlight style={{ alignItems: "flex-start", justifyContent: "center" }}>
              <Icon name="close" size={30} color="silver" onPress={() => setNextVisible(false)} />
            </TouchableHighlight>

            <View style={{ padding: 25 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: Theme.backgroundColor }}>Write Your Review</Text>
              <TextInput
                placeholder='Tell us more about your ratings.'
                placeholderTextColor={"rgba(0,0,0,0.6)"}
                onChangeText={(text) => setReview(text)}
                // onSubmitEditing={onSubmit}
                style={{ marginBottom: 50 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: Theme.backgroundColor }}>Title This Review</Text>
              <TextInput
                placeholder='Summarize your visit in a few words.'
                placeholderTextColor={"rgba(0,0,0,0.6)"}
                onChangeText={(inputText) => setTitle(inputText)}
                // onSubmitEditing={onSubmit}
                style={{ marginBottom: 35 }}
              />
              {/* <ProgressBar progress={0.5} width={280} height={17} color={Theme.primaryColor} /> */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => toggleBoth()} style={{ width: 100, borderRadius: 12, padding: 11, backgroundColor: Theme.primaryColor, alignItems: "center" }}>
                  <Text style={{ color: Theme.textColor, fontWeight: "bold", fontSize: 19 }}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSubmit()} style={{ width: 100, borderRadius: 12, padding: 11, backgroundColor: Theme.primaryColor, alignItems: "center" }}>
                  <Text style={{ color: Theme.textColor, fontWeight: "bold", fontSize: 19 }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: Theme.backgroundColor
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


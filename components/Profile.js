/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// Profile Page
// Nabil Ridhwanshah 
// P2007421
// DIT/FT/1B/05


import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Theme from '../config/Theme';
import { useNavigation } from '@react-navigation/native';
import UserProfile from "../assets/data/Profile";


function Profile(props){

  const navigation = useNavigation();
  const [User, setUser] = useState(UserProfile)

  useEffect(() => {
    const likedGuides = Guides.filter(guide => guide.liked);
    setDisplayData(likedGuides);
  }, [])

  const updateProfile = (user) => {
    setUser(user);
  }

  let navigateToProfilePage = () => {
    navigation.navigate("Edit Profile", {user: User, updateProfile: updateProfile});
  }

    return (
      <View style={{ flex: 1, ...styles.backgroundStyle }}>


          {/* Image */}
          <View style={{justifyContent: "center", alignItems: "center"}} >
            <Image source={require("../assets/images/profilepicture.png")} style={{borderRadius: 999}}/>
          </View>
          
           <Text style={{...styles.defaultText, textAlign: "center", fontWeight: "bold", fontSize: 24}}>{User.name}</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)"}}>@{User.username}</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)"}}>{User.biography}</Text>

           <View style={{alignItems: "center"}}>
           <TouchableOpacity onPress={navigateToProfilePage} style={{backgroundColor: "#8987FF", height: 35, justifyContent: "center", borderRadius: 10, width: "60%"}}>
             <Text style={{...styles.defaultText, textAlign: "center"}}>Edit Profile</Text>
           </TouchableOpacity>
           </View>

      </View >
    );
};

const styles = StyleSheet.create({

  backgroundStyle: {
    padding: 20,
    backgroundColor: Theme.backgroundColor,
  },

  defaultText: {
    color: "white",
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

});

export default Profile;
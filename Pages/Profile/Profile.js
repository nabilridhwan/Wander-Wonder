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
import Theme from '../../config/Theme';
import { useNavigation } from '@react-navigation/native';
import UserProfile from "../../assets/data/Profile";
import CustomButton from '../../components/CustomButton';


function Profile(props){

  const navigation = useNavigation();
  const [User, setUser] = useState(UserProfile)

  // TODO: Fix user profile doesn't show up after updating profile
  const updateProfile = (user) => {
    setUser({User, ...user});
  }

  let navigateToProfilePage = () => {
    navigation.navigate("Edit Profile", {user: User, updateProfile: updateProfile});
  }

    return (
      <View style={{ flex: 1, ...styles.backgroundStyle, justifyContent: "center", alignItems: "center"}}>


          <View>

          {/* Image */}
          <View style={{justifyContent: "center", alignItems: "center"}} >
            <Image source={User.profile_picture} style={{borderRadius: 999}}/>
          </View>
          
           <Text style={{...styles.defaultText, textAlign: "center", fontWeight: "bold", fontSize: 24, marginVertical: 5}}>{User.name}</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)", marginVertical: 5}}>@{User.username}</Text>
           <Text style={{...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)", marginVertical: 5}}>{User.biography}</Text>

            <View style={{alignItems: "center"}}>
              <CustomButton buttonText="Edit Profile" onPress={navigateToProfilePage}/>
            </View>
             
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
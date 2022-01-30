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


import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Theme from '../../config/Theme';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { launchImageLibrary } from 'react-native-image-picker';

import User from "../../assets/data/Profile"
import { getCurrentUser } from '../../utils/storage';


function Profile(props) {

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => {
      getUser();
    })
  }, [])

  const getUser = () => {
    getCurrentUser().then(user => {
      setName(user.name)
      setUsername(user.username)
      const source = { uri: user.profile_pic_uri };
      if (user.profile_pic_uri != "") {
        setImgSrc(source)
      }
    })
  }

  let navigateToProfilePage = () => {
    navigation.navigate("Edit Profile");
  }

  const logout = async () => {
    await AsyncStorage.removeItem("currentUser");
    navigation.navigate("Start Page");
  }

  return (
    <View style={{ flex: 1, ...styles.backgroundStyle, justifyContent: "center", alignItems: "center" }}>


      <View style={{width: "100%"}}>

        {/* Image */}
        <View style={{ justifyContent: "center", alignItems: "center" }} >
          <Image source={imgSrc} style={{ borderRadius: 999 }} width={72} height={72} />
        </View>

        <Text style={{ ...styles.defaultText, textAlign: "center", fontWeight: "bold", fontSize: 24, marginVertical: 5 }}>{name}</Text>
        <Text style={{ ...styles.defaultText, textAlign: "center", fontSize: 18, color: "rgba(255,255,255,0.7)", marginVertical: 5,marginBottom: 20 }}>@{username}</Text>

        <View style={{ alignItems: "center"}}>
          <CustomButton buttonText="Edit Profile" onPress={navigateToProfilePage} style={{width: 200, marginBottom: 10}} />
          <CustomButton buttonText="Logout" onPress={logout} style={{width: 200}} />
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
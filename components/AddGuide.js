import React from "react";
import {View, Text, ScrollView, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Theme from "../config/Theme";

function AddGuide(props){
    return(
        <ScrollView style={{backgroundColor: Theme.backgroundColor}}>
            <Text>Hello!</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
 backgroundStyle: {
    backgroundColor: Theme.backgroundColor,
  },
});

export default AddGuide;
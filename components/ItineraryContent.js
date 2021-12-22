/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { ImageBackground, Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../config/Theme';
export default ({ place }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:"column",justifyContent:"flex-start"}}>
                <Text style={styles.time}>10:30 AM</Text>
            </View>
            <View style={{flexDirection:"column",justifyContent:"flex-start"}}>
                <View style={styles.itinerary}>
                <Icon name="train" color="black" size={40}/> 
                </View>
                <View style={styles.lines}/>
                {/* <View style={styles.itinerary}>
                <Icon name="pin" color="black" size={40}/> 
                </View> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itinerary:{
        alignItems:'center',
        backgroundColor:'#70FFF6',
        borderRadius:999,
        marginHorizontal:29,
        padding:9,
        width:64,
        height:64
    },
    lines:{
        backgroundColor:'#70FFF6',
        position:'absolute',
        width:18,
        height:50,
        top:54,
        left:54
    },
    time:{
        fontStyle:'italic',
        fontWeight:'900',
        color:Theme.textColor
    }
});


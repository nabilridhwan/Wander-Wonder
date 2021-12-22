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

            <ScrollView style={styles.container}>

            <View style={{flexDirection: "row", height: 250}}>
                <View style={{flex:1}}>
                    <Text style={{...styles.time}}>10:30 AM</Text>
                </View>

                {/* The icon and line */}
                <View style={{flex:1, alignItems: "center"}}>
                    <View style={{...styles.icon}}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{...styles.pictureBackground, flex:2}}>
                        {/* <Icon name="pin" color="black" size={40} /> */}
                </View>
            </View>

            <View style={{flexDirection: "row", height: 250}}>
                <View style={{flex:1}}>
                    <Text style={{...styles.time}}>10:30 AM</Text>
                </View>
                {/* The icon and line */}
                <View style={{flex:1, alignItems: "center"}}>
                    <View style={{...styles.icon}}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{...styles.pictureBackground, flex:2}}>
                        {/* <Icon name="pin" color="black" size={40} /> */}
                </View>
            </View>

            <View style={{flexDirection: "row", height: 25}}>
                <View style={{flex:1}}>
                    <Text style={{...styles.time}}>10:30 AM</Text>
                </View>

                {/* The icon and line */}
                <View style={{flex:1, alignItems: "center"}}>
                    <View style={{...styles.icon}}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{...styles.pictureBackground, flex:2}}>
                        {/* <Icon name="pin" color="black" size={40} /> */}
                </View>
            </View>
                    

            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        alignItems: 'center',
        backgroundColor: '#70FFF6',
        borderRadius: 20,
        marginHorizontal: 29,
        padding: 9,
        width: 64,
        height: 64,
    },

    pictureBackground: {
        width: "100%",
        height: "100%" ,
        backgroundColor: "#F8B0AB",
        padding: 10,
        marginVertical: 5,
        borderRadius: 20
    },
    
    lines: {
        zIndex: -1,
        position: 'absolute',
        backgroundColor: '#70FFF6',
        width: 18,
        height: "100%",
        top: 0,
    },
    time: {
        fontStyle: 'italic',
        fontWeight: '900',
        color: Theme.textColor,
        fontSize: 17
    }
});


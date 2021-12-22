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

        <View style={styles.container}>

            <View style={{ flexDirection: "row", height: 250 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...styles.time }}>10:30 AM</Text>
                </View>

                {/* The icon and line */}
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ ...styles.icon }}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{ ...styles.pictureBackground }}>
                    <Text style={styles.pictureTextStyle} >Sentosa Express</Text>
                    <Image style={styles.imageStyle} source={require("../assets/images/singapore/sentosaexpress.jpg")} />
                </View>
            </View>

            <View style={{ flexDirection: "row", height: 250 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...styles.time }}>10:30 AM</Text>
                </View>
                {/* The icon and line */}
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ ...styles.icon }}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{ ...styles.pictureBackground }}>
                <Text style={styles.pictureTextStyle} >Sentosa Express</Text>
                    <Image style={styles.imageStyle} source={require("../assets/images/singapore/sentosaexpress.jpg")} />
                </View>
            </View>

            <View style={{ flexDirection: "row", height: 250 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...styles.time }}>10:30 AM</Text>
                </View>


                {/* The icon and line */}
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ ...styles.icon }}>
                        <Icon name="train" color="black" size={40} />
                    </View>
                    <View style={styles.lines} />
                </View>

                <View style={{ ...styles.pictureBackground }}>
                <Text style={styles.pictureTextStyle} >Sentosa Express</Text>
                    <Image style={styles.imageStyle} source={require("../assets/images/singapore/sentosaexpress.jpg")} />
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        alignItems: 'center',
        backgroundColor: '#70FFF6',
        borderRadius: 999,
        marginHorizontal: 29,
        padding: 9,
        width: 64,
        height: 64,
    },

    pictureBackground: {
        width: "100%",
        height: "90%",
        backgroundColor: "#F8B0AB",
        padding: 10,
        borderRadius: 10,
        flex: 2.5
    },

    pictureTextStyle: {
        textAlign: "center",
        fontSize: 20,
        color: "black",
        fontWeight: "700"
    },

    imageStyle: {
        marginTop: 10,
        borderRadius: 10,
        width: "100%",
        height: "80%"
    },

    lines: {
        zIndex: -1,
        position: 'absolute',
        backgroundColor: '#70FFF6',
        width: 10,
        height: "100%",
        top: 1,
    },
    time: {
        fontStyle: 'italic',
        fontWeight: '900',
        color: Theme.textColor,
        fontSize: 17
    }
});


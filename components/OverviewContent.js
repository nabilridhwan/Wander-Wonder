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
            <Text style={styles.singlequote}>“</Text>
            <ScrollView style={styles.panelContainer}>
                <Text style={styles.description}>{place.description}</Text>
                <Text style={styles.singlequote}>”</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

                    <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
                            <Icon name="time-outline" color="#FC71FF" size={24} />
                            <Text style={{ color: Theme.textColor, marginLeft: 5, fontWeight: "bold", fontSize: 18 }}>{place.duration}</Text>
                        </View>
                        <Text style={{ color: "#DEDEDE", marginTop: 4, fontWeight: "bold", textTransform: "uppercase" }}>Duration</Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
                            <Icon name="sunny-outline" color="#FFA800" size={24} />
                            <Text style={{ color: Theme.textColor, fontWeight: "bold", marginLeft: 5, fontSize: 17 }}>{place.weather}°C</Text>
                        </View>
                        <Text style={{ color: "#DEDEDE", marginTop: 4, fontWeight: "bold", textTransform: "uppercase" }}>Weather</Text>
                    </View>

                </View>

            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: 'white',
        fontSize: 32,
        marginBottom: 20,
        fontWeight: "900",
    },
    author: {
        textAlign: 'center',
        color: '#BFBFBF',
        marginBottom: 20,
        fontSize: 14,
    },
    subContainerSection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 20,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        paddingHorizontal: 30,
        paddingVertical: 10
    },

    activeButton: {
        backgroundColor: Theme.primaryColor
    },

    subContainerText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        textAlign: 'center',
    },

    singlequote: {
        color: Theme.singleQuoteColor,
        fontSize: 60,
        height: 35,
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
        padding: 20
    },
    container: {
        flex: 1,
        borderRadius: 100
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    smallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


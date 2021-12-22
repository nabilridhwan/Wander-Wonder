/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { ImageBackground, Linking, Platform, Alert, Image, StyleSheet, Button, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../config/Theme';

export default ({ place }) => {

    const button = () => {
        Alert.alert(
            "Buy Tickets",
            "The application will redirect you to an external website to buy tickets",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Buy", onPress: () => {

                        Linking.openURL(place.website)
                            .catch(err => {
                                Alert.alert(
                                    "An error occurred",
                                    `An error occurred while trying to open the web page. Here is the error: ${err}`,
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => console.log("An error occured - Cancel Pressed"),
                                            style: "cancel"
                                        },
                                    ]
                                );
                            })

                    }
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.singlequote}>“</Text>
            <ScrollView style={styles.panelContainer}>
                <Text style={styles.description}>{place.description}</Text>
                <Text style={styles.singlequote}>”</Text>

                {/* Duration and Weather */}
                <View style={{ marginTop: 4, flexDirection: "row", justifyContent: "space-evenly", marginBottom: 4 }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
                            <Icon name="time" color="#FC71FF" size={26} />
                            <Text style={{ color: Theme.textColor, marginLeft: 5, fontWeight: "bold", fontSize: 18 }}>{place.duration}</Text>
                        </View>
                        <Text style={{ color: "#DEDEDE", marginTop: 4, paddingLeft: 4, fontWeight: "bold", textTransform: "uppercase", fontSize: 18 }}>Duration</Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
                            <Icon name="sunny" color="#FFA800" size={26} />
                            <Text style={{ color: Theme.textColor, fontWeight: "bold", marginLeft: 5, fontSize: 17 }}>{place.weather}°C</Text>
                        </View>
                        <Text style={{ color: "#DEDEDE", marginTop: 4, paddingLeft: 4, fontWeight: "bold", textTransform: "uppercase", fontSize: 18 }}>Weather</Text>
                    </View>
                </View>

                {/* Items I have brought */}
                <View style={{ alignItems: "center", margin: 35 }}>
                    <View>
                        <Text style={{ color: Theme.textColor, fontSize: 20, textTransform: "uppercase", fontWeight: "900", textDecorationLine: "underline" }}>What I Have Brought</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: "row", marginVertical: 15 }}>
                            <View style={styles.broughtButtonContainer}>
                                <View style={{ backgroundColor: "#B2E3FE", ...styles.broughtButton }}>
                                    <Icon name="camera" color="black" size={31}></Icon>
                                </View>
                                <Text style={styles.broughtText}>Camera</Text>
                            </View>

                            <View style={styles.broughtButtonContainer}>
                                <View style={{ backgroundColor: "#A3CDFF", ...styles.broughtButton }}>
                                    <Icon name="umbrella" color="black" size={33}></Icon>
                                </View>
                                <Text style={styles.broughtText}>Umbrella</Text>
                            </View>

                            <View style={styles.broughtButtonContainer}>
                                <View style={{ backgroundColor: "#FEB2B2", ...styles.broughtButton }}>
                                    <Image source={require(`../assets/images/ticket.png`)} style={{ width: 38, height: 36 }} />
                                </View>
                                <Text style={styles.broughtText}>Ticket</Text>
                            </View>

                            <View style={styles.broughtButtonContainer}>
                                <View style={{ backgroundColor: "#FEB2B2", ...styles.broughtButton }}>
                                    <Image source={require(`../assets/images/fan.png`)} style={{ width: 30, height: 36 }} />
                                </View>
                                <Text style={styles.broughtText}>Fan</Text>
                            </View>

                            <View style={styles.broughtButtonContainer}>
                                <View style={{ backgroundColor: "#FFD698", ...styles.broughtButton }}>
                                    <Icon name="shirt" color="black" size={32}></Icon>
                                </View>
                                <Text style={styles.broughtText}>Extra Shirt</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ borderBottomColor: '#C9D1FF', borderBottomWidth: 6, borderStyle: 'dashed' }} />
                <View style={{ flexDirection: 'row', marginTop: 32, marginBottom: 32, justifyContent: 'space-around' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Theme.textColor }}>Admission Ticket</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: '400', fontStyle: 'italic', color: Theme.textColor }}>All you need to step foot</Text>
                            <Text style={{ fontWeight: '400', fontStyle: 'italic', color: Theme.textColor }}>in the Door.</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#8E4040', borderRadius: 100, justifyContent: 'center', paddingLeft: 13, paddingRight: 13, marginLeft: 15 }}>
                        <Text style={{ color: Theme.textColor, fontWeight: 'bold' }}>From $128</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={button} >
                    <View style={{ backgroundColor: color = '#FFD231', borderRadius: 70, marginBottom: 32, padding: 15, alignItems: 'center' }} >
                        <Text style={{ color: Theme.textColor, fontWeight: 'bold', textTransform: "uppercase" }}>See Tickets</Text>
                    </View>
                </TouchableOpacity>
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
    },

    broughtButton: {
        padding: 12,
        borderRadius: 999,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },

    broughtText: {
        textAlign: "center",
        color: Theme.textColor
    },

    broughtButtonContainer: {
        alignItems: "center",
        marginRight: 10
    }

});


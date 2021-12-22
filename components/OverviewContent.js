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
const button = () => {
    Alert.alert(
        "Press 'OK' to redirect to buying ticket website",
        [
            {
                text: "Ask me later",
                onPress: () => console.log("Ask me later pressed")
                
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => Linking.openURL("https://www.rwsentosa.com/en/attractions/universal-studios-singapore/promotions-and-events/universal-christmas/promotions?gclid=Cj0KCQiAk4aOBhCTARIsAFWFP9Fhh_KJ51hBlpEzso07Aq1lmfd6eFKXGZGdPESs8MrcWO-T2jdA9KoaAou5EALw_wcB&gclsrc=aw.ds").catch(err => console.error("An error occurred", err)) }
        ],
        {cancelable: true}
    );
}
export default ({ place }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.singlequote}>“</Text>
            <ScrollView style={styles.panelContainer}>
                <Text style={styles.description}>{place.description}</Text>
                <Text style={styles.singlequote}>”</Text>

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
                <View style={{ alignItems: "center", margin: 35 }}>
                    <View>
                        <Text style={{ color: Theme.textColor, fontSize: 20, textTransform: "uppercase", fontWeight: "900", textDecorationLine: "underline" }}>What I Have Brought</Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: "row", margin: 15 }}>
                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <View style={{ backgroundColor: "#B2E3FE", borderRadius: 100, padding: 12, margin: 4 }}>
                                        <Icon name="camera" color="black" size={31}></Icon>
                                    </View>
                                </View>
                                <Text style={{ color: Theme.textColor }}>Camera</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <View style={{ backgroundColor: "#A3CDFF", borderRadius: 100, padding: 12, margin: 4 }}>
                                        <Icon name="umbrella" color="black" size={33}></Icon>
                                    </View>
                                </View>
                                <Text style={{ color: Theme.textColor }}>Umbrella</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <View style={{ backgroundColor: "#FEB2B2", borderRadius: 100, padding: 12, margin: 4 }}>
                                        <Image source={require(`../assets/images/ticket.png`)} style={{ width: 38, height: 36 }} />
                                    </View>
                                </View>
                                <Text style={{ color: Theme.textColor }}>Ticket</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <View style={{ backgroundColor: "#FEB2B2", borderRadius: 100, padding: 12, margin: 4 }}>
                                        <Image source={require(`../assets/images/fan.png`)} style={{ width: 30, height: 36 }} />
                                    </View>
                                </View>
                                <Text style={{ color: Theme.textColor }}>Fan</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <View>
                                    <View style={{ backgroundColor: "#FFD698", borderRadius: 100, padding: 12, margin: 4 }}>
                                        <Icon name="shirt" color="black" size={32}></Icon>
                                    </View>
                                </View>
                                <Text style={{ color: Theme.textColor }}>Extra Shirt</Text>
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
    }
});


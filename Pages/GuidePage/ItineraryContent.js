/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, Image, StyleSheet, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import moment from 'moment';

export default ({ place }) => {

    const [itinerary, setItinerary] = useState(place.itinerary);

    return (

        <View style={styles.container}>

            {itinerary && itinerary.length > 0
                ? itinerary.map((item, index) => {

                    return (
                        <View style={{ flexDirection: "row", height: 250, marginBottom: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ ...styles.time }}>{moment(item.time).format("HH:MM a")}</Text>
                            </View>

                            {/* The icon and line */}
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <View style={{ ...styles.icon }}>
                                    <Icon name="navigate-circle" color="black" size={40} />
                                </View>
                                <View style={styles.lines} />
                            </View>

                            {/* The place */}
                            <View style={{ backgroundColor: "#F8B0AB", ...styles.pictureBackground }}>
                                <Text style={styles.pictureTextStyle} >{item.place}</Text>
                                <Image style={styles.imageStyle} source={{ uri: item.img_url }} />
                            </View>
                        </View>
                    )
                })

                :

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>No itinerary</Text>
                </View>

            }


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
        marginHorizontal: 10,
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
        height: "110%",
        top: 1,
    },
    time: {
        fontStyle: 'italic',
        fontWeight: '900',
        color: Theme.textColor,
        fontSize: 17,
        marginTop: 16
    }
});


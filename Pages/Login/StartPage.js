import * as React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Button, TextInput, TouchableOpacity, Touchable } from 'react-native';
import Theme from '../../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

    useEffect(() => {
        (async () => {
            const currentUser = await AsyncStorage.getItem("currentUser");
            console.log("From App.js")
            console.log(currentUser)
            if (currentUser != null) {
                navigation.navigate("App")
            } 
        })();


    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/images/startpage.jpg')} resizeMode="cover" style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: "space-between", paddingVertical: 60, alignItems: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{
                            textAlign: "center", paddingTop: 50, lineHeight: 60, height: "auto", textShadowColor: 'white', textShadowRadius: 3, textShadowOffset: {
                                width: 2,
                                height: 2
                            }, fontSize: 80, color: Theme.textColor, fontFamily: "WaitingfortheSunrise-Regular", marginVertical: 0
                        }}>Wander,
                            Wonder.</Text>
                        <Text style={{ color: "rgba(255,255,255,0.5)" }}>We follow you, wherever you travel to.</Text>
                    </View>
                    <View style={{ marginTop: 70, width: "80%", height: 50 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ padding: 8, backgroundColor: Theme.primaryColor, height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 9 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Next </Text>
                                <View style={{ justifyContent: 'center' }}>
                                    <Icon name="arrow-forward" color={Theme.textColor} size={15} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>

    )
}
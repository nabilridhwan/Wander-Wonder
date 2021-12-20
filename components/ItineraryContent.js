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
            <Text style={{color: Theme.textColor}} >Itinerary Page</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


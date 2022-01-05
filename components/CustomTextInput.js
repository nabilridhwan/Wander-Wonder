import React from "react";
import {View, Text, TouchableHighlight, TextInput } from "react-native";
import Theme from "../config/Theme";

function CustomTextInput({placeholder, onChangeText, value, ...otherProps}) {
    return (
    <View {...otherProps}>
            <Text style={{ color: Theme.textColor, marginBottom: 10}}>
                {placeholder}
            </Text>

            <TouchableHighlight style={{ backgroundColor: "white", borderRadius: 10 }}>
                <TextInput placeholder={placeholder} placeholderTextColor={"white"} style={{ color: "black" }} value={value} onChangeText={onChangeText} />
            </TouchableHighlight>
        </View>
    )
}

export default CustomTextInput;
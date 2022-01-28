import React from "react";
import {TouchableOpacity, Text,View} from "react-native"
import Theme from "../config/Theme";
import PropTypes from "prop-types";

function CustomButton({buttonText, onPress, style, ...otherProps}) {
    return (
        <View>
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: Theme.primaryColor,height: 50, justifyContent: "center", borderRadius: 10, width: "100%", ...style}} {...otherProps}>
            <Text style={{ color: Theme.textColor, textAlign: "center" }}>{buttonText}</Text>
        </TouchableOpacity>
        </View>
    )
}

CustomButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object
}

export default CustomButton;
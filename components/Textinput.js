import React from "react";
import {TouchableOpacity, Text} from "react-native"
import Theme from "../config/Theme";
import PropTypes from "prop-types";

function TextInput({buttonText, onPress, style, ...otherProps}) {
    return (
        <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
                <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8,color:Theme.textColor}} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.4)" value={email} onChangeText={(text) => setEmail(text)} onSubmitEditing={onSubmit} />
                </View>
    )
}

Text.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object
}

export default CustomButton;
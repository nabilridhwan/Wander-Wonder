import React from "react";
import {TouchableOpacity, TextInput,View} from "react-native";
import Theme from "../config/Theme";
import PropTypes from "prop-types";

function BlackTextInput({placeholder, value, onChangeText,onSubmit,otherProps}) {
    return (
        <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
                <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8,color:Theme.textColor}} placeholder={placeholder} placeholderTextColor="rgba(255,255,255,0.4)" value={value} onChangeText={onChangeText} onSubmitEditing={onSubmit} {...otherProps}/>
                </View>
    )
}

BlackTextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default BlackTextInput;
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from "react-native";
import Theme from "../../config/Theme";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

function EditProfile({ route, navigation }) {
    const { user, updateProfile} = route.params;
    const { name, username, biography, email } = user;

    const [nameInput, setNameInput] = useState(name);
    const [usernameInput, setUsernameInput] = useState(username);
    const [biographyInput, setBiographyInput] = useState(biography);
    const [emailInput, setEmailInput] = useState(email);

    useEffect(() => {
        return () => {
            let user = {
                name: nameInput,
                username: usernameInput,
                biography: biographyInput,
                email: emailInput
            }
            updateProfile(user);
        }
    })

    const navigateBack = () => {
        navigation.navigate("App", {user: user})
    }

    return (
        <View style={{ flex: 1, backgroundColor: Theme.backgroundColor, padding: 20 }}>


            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Username" onChangeText={(text) => setUsernameInput(text)} value={usernameInput} />

            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Name" onChangeText={(text) => setNameInput(text)} value={nameInput} />


            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Email" onChangeText={(text) => setEmailInput(text)} value={emailInput} />

            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Biography" onChangeText={(text) => setBiographyInput(text)} value={biographyInput} />

            <CustomButton buttonText="Save" onPress={navigateBack} />

        </View>
    )
}

export default EditProfile;
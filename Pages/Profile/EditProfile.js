import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from "react-native";
import Theme from "../../config/Theme";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

function EditProfile({ route, navigation }) {

    const [nameInput, setNameInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [pfpUri, setPfpUri] = useState("");

    useEffect(() => {

        (async () => {
            try {
                const currentUser = await AsyncStorage.getItem("currentUser");
                const parseCurrentUser = JSON.parse(currentUser);

                setNameInput(parseCurrentUser.name);
                setUsernameInput(parseCurrentUser.username);
                setEmailInput(parseCurrentUser.email);
                setPasswordInput(parseCurrentUser.password);
                setPfpUri(parseCurrentUser.profile_pic_uri);

            } catch (e) {
                // error reading value
                alert(e);
            }
        })();

    }, [])

    const handleSave = () => {
        saveUserDetails();
        navigateBack();
    }

    const navigateBack = () => {
        navigation.goBack();
    }

    const openImagePicker = async () => {
        const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
        if (!result.didCancel) {
            const { assets: [{ fileName, uri, base64 }] } = result;
            setPfpUri(uri);
        }
    }

    const saveUserDetails = async () => {
        try {
            const users = await AsyncStorage.getItem("users");
            const parsedUsers = JSON.parse(users);

            const currentUser = await AsyncStorage.getItem("currentUser");
            const parsedCurrentUser = JSON.parse(currentUser);

            console.log("From EditProfile")
            console.log(parsedUsers);
            console.log(parsedCurrentUser);

            const userIndex = parsedUsers.findIndex(user => user.email === parsedCurrentUser.email);
            parsedCurrentUser.profile_pic_uri = pfpUri;
            parsedCurrentUser.name = nameInput;
            parsedCurrentUser.username = usernameInput;
            parsedCurrentUser.email = emailInput;
            parsedCurrentUser.password = passwordInput;
            parsedUsers[userIndex] = parsedCurrentUser;

            console.log(parsedCurrentUser)

            // Write back to db
            await AsyncStorage.setItem("users", JSON.stringify(parsedUsers));
            await AsyncStorage.setItem("currentUser", JSON.stringify(parsedCurrentUser));
        } catch (e) {
            alert(e);
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: Theme.backgroundColor, padding: 20 }}>

            <CustomButton buttonText={"Change Profile Picture"} onPress={openImagePicker} />


            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Username" onChangeText={(text) => setUsernameInput(text)} value={usernameInput} />

            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Name" onChangeText={(text) => setNameInput(text)} value={nameInput} />


            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Email" onChangeText={(text) => setEmailInput(text)} value={emailInput} />


            <CustomTextInput style={{ marginBottom: 15 }} placeholder="Password" onChangeText={(text) => setPasswordInput(text)} value={passwordInput} />

            <CustomButton buttonText="Save" onPress={handleSave} />

        </View>
    )
}

export default EditProfile;
import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from "react-native";
import Theme from "../../config/Theme";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import { getCurrentUser, saveUser, updateUser } from "../../utils/storage";

function EditProfile({ route, navigation }) {

    const [id, setId] = useState(null)
    const [nameInput, setNameInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [pfpUri, setPfpUri] = useState("");

    useEffect(() => {
        (async () => {
            try {
                getCurrentUser().then(async (user) => {
                    if (user) {
                        setId(user.id)
                        setNameInput(user.name);
                        setUsernameInput(user.username);
                        setEmailInput(user.email);
                        setPasswordInput(user.password);
                        setPfpUri(user.profile_pic_uri);
                    }
                });
            } catch (e) {
                // error reading value
                alert(e);
            }
        })();

        // componentDidUnmount
        return () => {
            route.params.getUser()
        }

    }, [])

    const handleSave = () => {
        updateUser({
            id: id,
            name: nameInput,
            username: usernameInput,
            email: emailInput,
            password: passwordInput,
            profile_pic_uri: pfpUri
        }).then(_ => {

            navigateBack();
        }).catch(e => {
            alert(e);
        })
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
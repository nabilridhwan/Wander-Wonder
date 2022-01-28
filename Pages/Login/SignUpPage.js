import * as React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Button, TextInput, TouchableOpacity, Touchable, TextPropTypes } from 'react-native';
import Theme from '../../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import BlackTextInput from '../../components/BlackTextInput';

const STORAGE_KEY_NAME = "@save_name";
const STORAGE_KEY_EMAIL = "@save_email";
const STORAGE_KEY_PASSWORD = "@save_password";
export default function HomeScreen({ navigation }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [profile_pic_uri, setProfile_pic_uri] = useState("");

    const onSubmit = async () => {

        // Check if password and confirm password are same
        try {
            const users = await AsyncStorage.getItem("users");
            const parsedUsers = JSON.parse(users);

            if (password !== confirmPassword) {
                alert("Your password and confirm password is not match!")
                setPassword("");
                setConfirmPassword("");
            } else {

                if (name == "" || username == "" || email == "" || password == "" || confirmPassword == "") {
                    alert("Please fill all the fields!")
                } else {



                    // Check if the user is part of the table
                    const user = parsedUsers.filter(user => user.email == email && user.username == username);

                    if (user.length > 0) {
                        alert("User already exists!")
                    } else {
                        const userObj = {
                            name: name,
                            username: username,
                            email: email,
                            password: password,
                            profile_pic_uri: profile_pic_uri
                        }

                        // Push user to the table
                        parsedUsers.push(userObj)
                        await AsyncStorage.setItem("users", JSON.stringify(parsedUsers));
                        await AsyncStorage.setItem("currentUser", JSON.stringify(userObj));

                        setName("");
                        setEmail("");
                        setUsername("");
                        setConfirmPassword("");
                        setPassword("")

                        // Navigate to the home page
                        navigation.navigate("App");
                    }
                }
            }

        } catch (e) {
            alert(e);
        }
    }


    // const loadData=async()=>{
    //     try{
    //         const savedName=await AsyncStorage.getItem(STORAGE_KEY_NAME);
    //         const savedPassword=await AsyncStorage.getItem(STORAGE_KEY_PASSWORD);
    //         setUsername(savedName);
    //         setPassword(savedPassword);
    //     }catch(e){
    //         alert("Data could not be loaded")
    //     }
    // }
    // useEffect(()=>{
    //     loadData();
    // },[])

    const handleUploadProfilePicture = async () => {
        try {

            const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
            if (!result.didCancel) {
                const { assets: [{ fileName, uri, base64 }] } = result;
                setProfile_pic_uri(uri);
            }
        } catch (e) {
            alert(e)
        }
    }


    return (
        <View style={{ flex: 1 }}>


            <ImageBackground source={require('../../assets/images/signup.jpg')} resizeMode="cover" style={{ flex: 1 }}>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ marginVertical: 9, fontSize: 40, fontWeight: "bold", color: Theme.primaryColor }}>Sign Up</Text>
                        <Text style={{ fontSize: 20, color: Theme.textColor, marginVertical: 9 }}>Sign up for a new account.</Text>

                        <CustomButton title="Sign Up" buttonText={"Upload Profile Picture"} onPress={handleUploadProfilePicture}/>

                        {/* Name */}
                        <BlackTextInput placeholder={"Name"} value={name} onChangeText={(text) => setName(text)} onSubmit={onSubmit}/>
                        
                        {/* Username */}
                        <BlackTextInput placeholder={"Username"} value={username} onChangeText={(text) => setUsername(text)} onSubmit={onSubmit}/>

                        {/* Email */}
                        <BlackTextInput placeholder={"Email"} value={email} onChangeText={(text) => setEmail(text)} onSubmit={onSubmit}/>

                        {/* Password */}
                        <BlackTextInput placeholder={"Password"} value={password} onChangeText={(text) => setPassword(text)} onSubmit={onSubmit} secureTextEntry={true}/>

                        {/* Confirm Password */}
                        <BlackTextInput placeholder={"Confirm Password"} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} onSubmit={onSubmit} secureTextEntry={true}/>

                        {/* Button */}
                        <View style={{ marginTop: 40, width: "80%", height: 50 }}>
                            <TouchableOpacity onPress={() => onSubmit()} style={{ padding: 8, backgroundColor: Theme.primaryColor, height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 9 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Sign Up </Text>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Icon name="arrow-forward" color={Theme.textColor} size={15} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
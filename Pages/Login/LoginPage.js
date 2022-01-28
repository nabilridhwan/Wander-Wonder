import * as React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Button, TextInput, TouchableOpacity, Touchable } from 'react-native';
import Theme from '../../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlackTextInput from '../../components/BlackTextInput';

const STORAGE_KEY_NAME = "@save_name";
const STORAGE_KEY_PASSWORD = "@save_password";

export default function HomeScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([])


    useEffect(() => {

        (async () => {

            // Get the user table
            try {
                const users = await AsyncStorage.getItem("users");

                if (users == null) {

                    await AsyncStorage.setItem("users", JSON.stringify([]));

                    // Store an empty array in users
                    setUsers([]);
                } else {
                    setUsers(JSON.parse(users))
                }


            } catch (e) {
                alert(e);
            }

        })()

    }, [])

    const onSubmit = async () => {

        try {
            if (email != "" && password != "") {
                // Check if the user is already in the database
                const users = await AsyncStorage.getItem("users");
                console.log(users)
                const parsedUsers = JSON.parse(users);

                const user = parsedUsers.filter(user => user.email == email && user.password == password);
                if (user.length > 0) {


                    try {
                        // Set the loggedInUser 
                        await AsyncStorage.setItem("currentUser", JSON.stringify(user[0]));
                        navigation.navigate('App')
                    } catch (e) {
                        alert(e);
                    }


                } else {
                    alert("Email or Password is incorrect");
                }

                setEmail("");
                setPassword("")
            } else {
                alert("Please enter email and password")
            }
        } catch (e) {
            alert(e);
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/images/login.png')} resizeMode="cover" style={{
                flex: 1,
                opacity: 0.8
            }}>

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: "center" }}>


                    <View style={{ alignItems: "center" }}>
                        <Text style={{ marginVertical: 9, fontSize: 40, fontWeight: "bold", color: Theme.primaryColor }}>Login</Text>
                        <Text style={{ fontSize: 20, color: Theme.textColor, marginVertical: 9 }}>Please sign in to continue.</Text>

                            <BlackTextInput placeholder={"Email"} value={email} onChangeText={(text) => setEmail(text)} onSubmit={onSubmit}/>
                            
                            <BlackTextInput placeholder={"Password"} value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={onSubmit} secureTextEntry={true}/>
                        
                        <View style={{ marginTop: 40, width: "80%", height: 50 }}>
                            <TouchableOpacity onPress={onSubmit} style={{ padding: 8, backgroundColor: Theme.primaryColor, height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 9 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Login </Text>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Icon name="arrow-forward" color={Theme.textColor} size={15} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ color: "#C3C3C3", marginVertical: 20 }}>OR</Text>
                        <View style={{ width: "80%", height: 50 }}>

                            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} style={{ padding: 8, backgroundColor: Theme.textColor, height: "100%", alignItems: "center", justifyContent: "center", borderRadius: 9 }}>
                                <Text style={{ fontWeight: "bold", color: Theme.backgroundColor }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>

    )
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground,View, Text, Button, TextInput,TouchableOpacity, Touchable } from 'react-native';
import Theme from '../../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_NAME = "@save_name";
const STORAGE_KEY_PASSWORD = "@save_password";
export default function HomeScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_NAME, email);
            await AsyncStorage.setItem(STORAGE_KEY_PASSWORD, password);
            alert("Data saved");
        } catch (e) {
            alert("Data could not be saved!");
            console.log(e)
        }
    }
    const onSubmit = () => {
        if (email!= "" && password != "") {
            saveData();
            setName("");
            setPassword("")
        }
    }
    return (
        <View style={{ flex: 1}}>
            <ImageBackground source={require('../../assets/images/login.png')} resizeMode="cover" style={{flex: 1,
    opacity:0.8}}>
        <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.9)',justifyContent:"center"}}>
        <View style={{alignItems:"center"}}>
                <Text style={{ marginVertical:9,fontSize: 40, fontWeight: "bold",color:Theme.primaryColor}}>Login</Text>
                <Text style={{fontSize:20,color:Theme.textColor,marginVertical:9}}>Please sign in to continue.</Text>
                <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
                <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.4)" value={email} onChangeText={(text) => setName(text)} onSubmitEditing={onSubmit} />
                </View>
                <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
                <TextInput style={{ height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.4)" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={onSubmit} />
                </View>
                <View style={{marginTop:40,width:"80%",height:50}}>
                <TouchableOpacity onPress={()=>navigation.navigate('App')} style={{padding:8,backgroundColor:Theme.primaryColor,height:"100%",alignItems:"center",justifyContent:"center",borderRadius:9}}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{color:Theme.textColor,fontWeight:"bold"}}>Login </Text>
                    <View style={{justifyContent:'center'}}>
                    <Icon name="arrow-forward" color={Theme.textColor} size={15} />
                    </View>
                    </View>
                </TouchableOpacity>
                </View>
                <Text style={{color:"#C3C3C3",marginVertical:20}}>OR</Text>
                <View style={{width:"80%",height:50}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Sign Up')} style={{padding:8,backgroundColor:Theme.textColor,height:"100%",alignItems:"center",justifyContent:"center",borderRadius:9}}>
                    <Text style={{fontWeight:"bold",color:Theme.backgroundColor}}>Sign Up</Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
            </ImageBackground>
        </View>

    )
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground,View, Text, Button, TextInput,TouchableOpacity, Touchable } from 'react-native';
import Theme from '../../config/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_NAME="@save_name";
const STORAGE_KEY_EMAIL="@save_email";
const STORAGE_KEY_PASSWORD="@save_password";
export default function HomeScreen({navigation}){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[password,setPassword]=useState("");
    const onSubmit = () => {
        if (email!= "" && password != "") {
            saveData();
            setName("");
            setPassword("")
        }
    }
    // const loadData=async()=>{
    //     try{
    //         const savedName=await AsyncStorage.getItem(STORAGE_KEY_NAME);
    //         const savedPassword=await AsyncStorage.getItem(STORAGE_KEY_PASSWORD);
    //         setName(savedName);
    //         setPassword(savedPassword);
    //     }catch(e){
    //         alert("Data could not be loaded")
    //     }
    // }
    // useEffect(()=>{
    //     loadData();
    // },[])
    return(
        <View style={{ flex: 1}}>
        <ImageBackground source={require('../../assets/images/signup.jpg')} resizeMode="cover" style={{flex: 1,
opacity:0.7}}>
    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.9)',justifyContent:"center"}}>
    <View style={{alignItems:"center"}}>
            <Text style={{ marginVertical:9,fontSize: 40, fontWeight: "bold",color:Theme.primaryColor}}>Sign Up</Text>
            <Text style={{fontSize:20,color:Theme.textColor,marginVertical:9}}>Sign up for a new account.</Text>
            <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
            <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.4)" value={name} onChangeText={(text) => setName(text)} onSubmitEditing={onSubmit} />
            </View>
            <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
            <TextInput style={{ height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.4)" secureTextEntry={true} value={email} onChangeText={(text) => setEmail(text)} onSubmitEditing={onSubmit} />
            </View>
            <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
            <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.4)" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={onSubmit} />
            </View>
            <View style={{width:"80%",height:55,marginVertical:15,elevation:3}}>
            <TextInput style={{height:"100%",backgroundColor: "#1A1329",borderRadius:10,paddingHorizontal:8}} placeholder="Confirm Password" placeholderTextColor="rgba(255,255,255,0.4)" value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} onSubmitEditing={onSubmit} />
            </View>
            <View style={{marginTop:40,width:"80%",height:50}}>
            <TouchableOpacity onPress={()=>navigation.navigate('App')} style={{padding:8,backgroundColor:Theme.primaryColor,height:"100%",alignItems:"center",justifyContent:"center",borderRadius:9}}>
                <View style={{flexDirection:"row"}}>
                <Text style={{color:Theme.textColor,fontWeight:"bold"}}>Sign Up </Text>
                <View style={{justifyContent:'center'}}>
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
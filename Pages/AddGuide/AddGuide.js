import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Theme from "../../config/Theme";
import {Picker} from "@react-native-picker/picker"

function AddGuide(props) {

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [location, setLocation] = useState("");
    let [temperature, setTemperature] = useState("");
    let [condition, setCondition] = useState();
    let [duration, setDuration] = useState("");
    let [distance, setDistance] = useState("");
    let [price, setPrice] = useState("");
    let [website, setWebsite] = useState("");
    let [items, setItems] = useState([]);
    
    return (
        <ScrollView style={{ backgroundColor: Theme.backgroundColor, paddingHorizontal: 10 }}>

            <Text style={{ fontWeight: "bold", color: "white", fontSize: 28, textAlign: "center" }}>Write a travel guide</Text>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>Share tips and recommendations for your favourite destination</Text>

            <ScrollView horizontal={true}>

                {/* Image */}
                <View style={{ height: "auto", width: 220, justifyContent: "flex-end", alignItems: "flex-start" }}>
                    <View>

                        {/* Button */}
                        <TouchableOpacity style={{ backgroundColor: "#F14747", width: 30, height: 30, borderRadius: 999, transform: [{ rotate: "45deg" }], position: "absolute", top: -10, right: -10, zIndex: 9, justifyContent: "center", alignItems: "center", elevation: 2 }}>
                            <Icon name="add" color="white" size={25} />
                        </TouchableOpacity>

                        {/* Image */}
                        <Image style={{ width: 200, height: 200, borderRadius: 20 }} source={require("../../assets/images/singapore/1.png")} />
                    </View>
                </View>

                {/* Add button */}
                <View style={{ height: 220, width: 220, justifyContent: "flex-end", alignItems: "center" }}>

                    <View style={{ width: 200, height: 200, backgroundColor: "#757272", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="add" color="white" size={100} />
                    </View>
                </View>
            </ScrollView>


            <View style={{ backgroundColor: "#FFD7D7", width: "100%", height: 200, borderRadius: 10, marginVertical: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1, alignItems: "center" }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Guide Title</Text>
                    <TextInput placeholder="e.g Singapore" ></TextInput>
                </View>

                <TextInput
                style={{padding: 20, textAlign: "center"}}
                multiline={true}
                    numberOfLines={4}
                    placeholder="Description"
                />

            </View>

            {/* Purple */}
            <View style={{ backgroundColor: "#C0C7FF", width: "100%", borderRadius: 10, marginVertical: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Location</Text>
                    <Text>Singapore</Text>
                </View>

                <View style={{ paddingTop: 20, paddingBottom: 0, paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "black" }}>Weather</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, alignItems: "center"}}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Temperature</Text>
                    <TextInput placeholder="e.g 30°C" keyboardType="number-pad" style={{textAlign: "right"}} ></TextInput>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1, alignItems: "center"}}>

                    <Text style={{ flex: 1, fontWeight: "bold", color: "black" }}>Condition</Text>
                    <Picker
                    style={{flex: 1}}
                        selectedValue={condition}
                        onValueChange={(itemValue, itemIndex) => setCondition(itemValue)}
                    >
                        <Picker.Item label="Cloudy" value="cloudy" />
                        <Picker.Item label="Sunny" value="sunny" />
                        <Picker.Item label="Windy" value="windy" />
                        <Picker.Item label="Rainy" value="rainy" />
                        <Picker.Item label="Snowy" value="snowy" />
                    </Picker>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Duration</Text>
                    <Text>6 Hours</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Distance</Text>
                    <Text>Not Set</Text>
                </View>
            </View>

            {/* Pink */}
            <View style={{ backgroundColor: "#FFC8F0", width: "100%", borderRadius: 10, marginVertical: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Estimated Price</Text>
                    <Text>$100</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 20, borderBottomColor: "black", borderBottomWidth: 1 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Website Buying Ticket</Text>
                    <Text>https://restortworld...</Text>
                </View>
            </View>

            {/* Blue */}

            <View style={{ backgroundColor: "#D7FAFF", height: 300, width: "100%", borderRadius: 10, marginTop: 20, marginBottom: 40 }}>

                {/* Add Button */}
                <TouchableOpacity style={{ width: "100%", alignItems: "center", position: "absolute", bottom: -30, zIndex: 999 }}>
                    <View style={{ backgroundColor: "#005FCE", width: 50, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10, elevation: 2 }}>
                        <Icon name="add" color="white" size={25} />
                    </View>

                </TouchableOpacity>

                <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold", color: "black", paddingVertical: 20 }}>What did you bring?</Text>

                <Text style={{ fontSize: 18, textAlign: "center", paddingVertical: 10 }}>Get your readers ready!</Text>

                <View style={{ backgroundColor: "white", margin: 20, padding: 20, borderRadius: 10, elevation: 4 }}>

                    {/* Delete button */}
                    <View style={{ backgroundColor: "red", width: 30, height: 30, alignItems: "center", justifyContent: "center", transform: [{ rotate: "45deg" }], borderRadius: 999, position: "absolute", right: -10, top: -10, elevation: 2 }}>
                        <Icon name="add" color="white" size={25} />
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 17 }}>Camera</Text>

                        <Icon name="camera" color="black" size={25} />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={{ backgroundColor: "#8987FF", height: 50, justifyContent: "center", borderRadius: 10, width: "100%" }}>
                <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: Theme.backgroundColor,
    },
});

export default AddGuide;
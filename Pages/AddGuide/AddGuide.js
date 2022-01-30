import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Modal, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Theme from "../../config/Theme";
import { launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker"

function AddGuide({ navigation, route }) {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [temperature, setTemperature] = useState("");
    let [condition, setCondition] = useState("cloudy");
    let [duration, setDuration] = useState("");
    let [distance, setDistance] = useState("");
    let [price, setPrice] = useState("");
    let [website, setWebsite] = useState("");
    let [items, setItems] = useState([]);

    let [itemInput, setItemInput] = useState("");
    const [region, setRegion] = useState("Singapore");

    let [modalVisible, setModalVisible] = useState(false);
    const [travelPictures, setTravelPictures] = useState([]);
    const submitItem = () => {
        // Capitalize the first letter of itemInput
        setItems([...items, itemInput]);
        setModalVisible(false);
    }

    const openImagePicker = async () => {

        try {

            const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 5 });
            if (!result.didCancel) {

                const uris = result.assets.map(asset => asset.uri);
                if (travelPictures.length == 0) {
                    setTravelPictures(uris);
                } else {
                    setTravelPictures([...travelPictures, ...uris]);
                }
            }

        } catch (e) {
            alert(e);
        }
    }

    const removeImage = (index) => {
        console.log("Removing")
        setTravelPictures(travelPictures.filter((_, i) => i !== index));
    }

    const navigateToNextPage = () => {
        const props = {
            travelPictures,
            title,
            description,
            temperature,
            condition,
            duration,
            distance,
            price,
            website,
            items,
            category: region
        }

        navigation.navigate("Add Guide Itinerary", {props})
    }

    return (
        <ScrollView style={{ backgroundColor: Theme.backgroundColor, paddingHorizontal: 20, }}>

            <Text style={{ fontWeight: "bold", color: "white", fontSize: 21, textAlign: "center", marginVertical: 18 }}>Write A Travel Guide</Text>
            <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>Share tips and recommendations</Text>
            <Text style={{ color: "white", fontSize: 14, textAlign: "center", marginBottom: 7 }}>for your favourite destination</Text>

            <ScrollView horizontal={true}>

                {travelPictures.map((uri, index) => {

                    // Image
                    return (<View key={index} style={{ height: 220, width: 220, justifyContent: "flex-end", alignItems: "flex-start" }}>
                        <View>

                            {/* Button */}
                            <TouchableOpacity onPress={() => removeImage(index)} style={{ backgroundColor: "#F14747", width: 30, height: 30, borderRadius: 999, transform: [{ rotate: "45deg" }], position: "absolute", top: -10, right: -10, zIndex: 9, justifyContent: "center", alignItems: "center", elevation: 2 }}>
                                <Icon name="add" color="white" size={25} />
                            </TouchableOpacity>

                            {/* Image */}
                            <Image style={{ width: 180, height: 180, borderRadius: 20 }} source={{ uri: uri }} />
                        </View>
                    </View>)

                })}
                {/* Add button */}
                <TouchableOpacity style={{ height: 220, width: 220, justifyContent: "flex-end", alignItems: "center" }} onPress={openImagePicker}>

                    <View style={{ width: 180, height: 180, backgroundColor: "#757272", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="add" color="white" size={70} />
                    </View>
                </TouchableOpacity>
            </ScrollView>


            <View style={{ backgroundColor: "#F6E5F5", height: 200, borderRadius: 10, marginVertical: 20 }}>

                <View style={{ justifyContent: "space-between", paddingTop: 25, paddingLeft: 25, paddingBottom: 25 }}>

                    <Text style={styles.header}>Guide Title</Text>
                    <TextInput placeholder="e.g Singapore" onChangeText={(text) => setTitle(text)}></TextInput>

                    <Text style={styles.header}>Guide Description</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Description"
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
            </View>

            {/* Purple */}
            <View style={{ backgroundColor: "#FBF4F9", width: "100%", borderRadius: 10, marginVertical: 20 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>

                    <Text style={{ flex: 1, fontWeight: "bold", color: "black" }}>Region</Text>
                    <Picker
                        style={{ flex: 1 }}
                        selectedValue={region}
                        onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
                    >
                        <Picker.Item label="Singapore" value="Singapore" />
                        <Picker.Item label="Asia" value="Asia" />
                        <Picker.Item label="Oceania" value="Oceania" />
                        <Picker.Item label="Europe" value="Europe" />
                        <Picker.Item label="America" value="America" />
                    </Picker>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center" }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Temperature</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <TextInput placeholder="e.g 30 " keyboardType="number-pad" style={{ textAlign: "right" }} onChangeText={(text) => setTemperature(text)}></TextInput>
                        <Text style={{ color: "black" }}>°C</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center" }}>

                    <Text style={{ flex: 1, fontWeight: "bold", color: "black" }}>Condition</Text>
                    <Picker
                        style={{ flex: 1 }}
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

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Duration</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <TextInput placeholder="e.g 6 " keyboardType="number-pad" style={{ textAlign: "right" }} onChangeText={(text) => setDuration(text)}></TextInput>
                        <Text style={{ color: "black" }}>hours</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>

                    <Text style={{ fontWeight: "bold", color: "black" }}>Distance</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <TextInput placeholder="e.g 6 " keyboardType="number-pad" style={{ textAlign: "right" }} onChangeText={(text) => setDistance(text)} ></TextInput>
                        <Text style={{ color: "black" }}>km</Text>
                    </View>
                </View>
            </View>

            {/* Pink */}
            <View style={{ backgroundColor: "#F6E7E6", width: "100%", borderRadius: 10, marginVertical: 20, padding: 10 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: "black" }}>Estimated Price</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", }}>
                        <Text style={{ color: "black" }}>$ </Text>
                        <TextInput placeholder="e.g 6 " keyboardType="number-pad" style={{ textAlign: "right" }} onChangeText={(text) => setPrice(text)}></TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", addingHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold", color: "black" }} >Purchase Ticket Website</Text>
                    <TextInput placeholder="https://..." style={{ textAlign: "right" }} onChangeText={(text) => setWebsite(text)}></TextInput>
                </View>
            </View>

            {/* Blue */}

            <View style={{ backgroundColor: "#C5D4ED", height: "auto", width: "100%", borderRadius: 10, marginTop: 0, marginBottom: 30 }}>

                <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold", color: "black", paddingTop: 20}}>What did you bring?</Text>

                <Text style={{ fontSize: 18, textAlign: "center", paddingVertical: 1 }}>Get your readers ready!</Text>




                {items.map((item, index) => {


                    return (<View key={index} style={{ backgroundColor: "white", margin: 20, marginVertical: 10, padding: 20, borderRadius: 10, elevation: 4 }}>

                        {/* Delete button  */}
                        <TouchableOpacity style={{ backgroundColor: "red", width: 30, height: 30, alignItems: "center", justifyContent: "center", transform: [{ rotate: "45deg" }], borderRadius: 999, position: "absolute", right: -10, top: -10, elevation: 2 }} onPress={() => setItems(items.filter((_, i) => i != index))}>
                            <Icon name="add" color="white" size={25} />
                        </TouchableOpacity>

                            <Text style={{ fontWeight: "bold", color: "black", fontSize: 17 }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>

                    </View>)

                })}

                {/* Add Button */}
                <TouchableOpacity style={{ width: "100%", alignItems: "center", marginBottom: 16 }} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{ backgroundColor: "#005FCE", width: 50, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10, elevation: 2 }}>
                        <Icon name="add" color="white" size={25} />
                    </View>

                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => navigateToNextPage()} style={{
                backgroundColor: "#8987FF", height: 50, justifyContent: "center", borderRadius: 10, width: "100%", marginBottom: 30
            }}>
                <Text style={{ color: "white", textAlign: "center" }}>Next</Text>
            </TouchableOpacity>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text style={styles.modalText}></Text> */}
                        <TextInput placeholder="What did you bring?" onChangeText={(text) => setItemInput(text)} />

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => submitItem()}
                        >
                            <Text style={styles.textStyle}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: Theme.backgroundColor,
    },

    header: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%"
    },
    button: {
        borderRadius: 10,
        width: 50,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default AddGuide;
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Modal, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Theme from "../../config/Theme";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import { addNewGuide } from "../../utils/storage";

function AddGuideItinerary({ navigation, route: { params: { props } } }) {

  let [itinerary, setItinerary] = useState([]);
  let [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  let [showTimePicker, setShowTimePicker] = useState(false);
  const [nameOfPlace, setNameOfPlace] = useState("");

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowTimePicker(false);
  }

  const showImagePicker = async () => {
    try {

      const result = await launchImageLibrary({ mediaType: "photo" });
      if (!result.didCancel) {
        const uri = result.assets[0].uri
        setImage(uri);
      }
    } catch (e) {
      alert(e);
    }
  }

  const submitItinerary = () => {

    let newItinerary = {
      time: date.toISOString(),
      place: nameOfPlace,
      img_url: image
    };

    setDate(new Date());
    setImage(null);
    setNameOfPlace("");

    setItinerary([...itinerary, newItinerary]);
    setModalVisible(false)
  }

  const handleSave = () => {
    const newGuide = {...props, itinerary}

    addNewGuide(newGuide)
    .then(_ => {
      navigation.navigate("Home");
    })
    .catch(e => {
      alert(e);
    })
  }

  return (
    <ScrollView style={{ backgroundColor: Theme.backgroundColor, paddingHorizontal: 10 }}>

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

            <Text style={styles.modalText}>Name of Place</Text>
            <TextInput placeholder="Marina Bay Sands" onChangeText={(text) => setNameOfPlace(text)} textAlign="center" />

            <Text style={styles.modalText}>Select Image</Text>

            <TouchableOpacity style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10, marginVertical: 5 }} onPress={() => showImagePicker(true)}>
              <Text>Select Image</Text>
            </TouchableOpacity>


            <Text style={styles.modalText}>Select Time</Text>

            <TouchableOpacity style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 10, marginVertical: 5 }} onPress={() => setShowTimePicker(true)}>
              <Text>{moment(date).format("hh:MM A")}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={onDateChange}
              />
            )}


            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitItinerary()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      <Text style={{ fontWeight: "bold", color: "white", fontSize: 28, textAlign: "center" }}>Write a travel guide</Text>
      <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>Share tips and recommendations for your favourite destination</Text>

      {/* Blue */}
      <View style={{ backgroundColor: "#FFE8CD", width: "100%", borderRadius: 10, marginTop: 20, marginBottom: 40 }}>



        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold", color: "black", paddingVertical: 20 }}>Itinerary</Text>

        {itinerary.map((item, index) => {

          return(<View key={index} style={{ backgroundColor: "white", margin: 20, padding: 20, borderRadius: 10, elevation: 4 }}>

            {/* Delete button */}
            <TouchableOpacity onPress={() => setItinerary(itinerary.filter((_, i) => i != index))} style={{ backgroundColor: "red", width: 30, height: 30, alignItems: "center", justifyContent: "center", transform: [{ rotate: "45deg" }], borderRadius: 999, position: "absolute", right: -10, top: -10, elevation: 2 }}>
              <Icon name="add" color="white" size={25} />
            </TouchableOpacity>


            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

              <View>
                <Text style={{ fontWeight: "bold", color: "black", fontSize: 17 }}>{item.place}</Text>
                <Text>{moment(item.time).format("hh:MM A")}</Text>
              </View>

              {item.img_url && <Image source={{uri: item.img_url}} style={{ width: 128, height: 128, borderRadius: 10 }} />}

            </View>

          </View>)
        })}


        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Add Button */}
          <TouchableOpacity style={{ backgroundColor: "#005FCE", alignItems: "center", height: 40, marginVertical: 20, width: "90%", justifyContent: "center", borderRadius: 10, elevation: 2 }} onPress={() => setModalVisible(true)}>
            <Icon name="add" color="white" size={25} />
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity onPress={handleSave} style={{ backgroundColor: "#8987FF", height: 50, justifyContent: "center", borderRadius: 10, width: "100%" }}>
        <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
      </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    elevation: 5
  },
  button: {
    borderRadius: 20,
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
    textAlign: "center",
    fontWeight: "bold",
    color: "black"
  }
});

export default AddGuideItinerary;
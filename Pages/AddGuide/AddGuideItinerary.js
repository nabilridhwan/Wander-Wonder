import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Modal, Pressable} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Theme from "../../config/Theme";

function AddGuideItinerary(props) {

    let [itinerary, setItinerary] = useState([]);
    let [modalVisible, setModalVisible] = useState(false);
    
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

            <Text style={{ fontWeight: "bold", color: "white", fontSize: 28, textAlign: "center" }}>Write a travel guide</Text>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>Share tips and recommendations for your favourite destination</Text>

            {/* Blue */}
            <View style={{ backgroundColor: "#FFE8CD", height: 300, width: "100%", borderRadius: 10, marginTop: 20, marginBottom: 40 }}>

                {/* Add Button */}
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%", alignItems: "center", position: "absolute", bottom: -30, zIndex: 999 }}>
                    <View style={{ backgroundColor: "#005FCE", width: 50, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 10, elevation: 2 }}>
                        <Icon name="add" color="white" size={25} />
                    </View>

                </TouchableOpacity>

                <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold", color: "black", paddingVertical: 20 }}>Itinerary</Text>

                <View style={{ backgroundColor: "white", margin: 20, padding: 20, borderRadius: 10, elevation: 4 }}>

                    {/* Delete button */}
                    <View style={{ backgroundColor: "red", width: 30, height: 30, alignItems: "center", justifyContent: "center", transform: [{ rotate: "45deg" }], borderRadius: 999, position: "absolute", right: -10, top: -10, elevation: 2 }}>
                        <Icon name="add" color="white" size={25} />
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <View>
                            <View style={{justifyContent: "center", alignItems: "center", padding: 5, width: 64, height: 64, backgroundColor: "#DA3570", borderRadius: 999}}>
                                <Icon name="bus" color={"white"} size={30} />
                            </View>
                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 17 }}>Sentosa Railway</Text>
                        <Text>10:30 AM</Text>
                        </View>

                        <Image source={require("../../assets/images/singapore/sentosaexpress.jpg")} style={{width: 128, height: 128, borderRadius: 10}}/>

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
    textAlign: "center"
  }
});

export default AddGuideItinerary;
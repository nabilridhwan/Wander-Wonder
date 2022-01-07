import React, { useState, useEffect } from 'react';
import { ImageBackground, Linking, Platform, Alert, Image, StyleSheet, Button, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';

export default ({ place }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayData, setDisplayData] = useState([]);

    const [done, setDone] = useState(false);


    useEffect(() => {
        if (searchQuery.length == 0) {
            setDone(false);
        }
    }, [searchQuery]);

    const handleSearch = (searchQuery) => {
        setDone(false);
        if (searchQuery !== "") {
            setDisplayData(Guides.filter(guide => guide.title.toLowerCase().includes(searchQuery.toLowerCase())))
            setRecentSearches([searchQuery, ...recentSearches.filter(search => search != searchQuery)]);
            setDone(true);
        }
    }
    const handleItemClick = (index, array) => {
        const item = array[index];
        // Set the search query to the item tapped
        setSearchQuery(item);
        // Perform a search
        handleSearch(item);
    }
    const renderNoGuide = () => {
        return (
            <View>
                <Text style={{ color: Theme.textColor }}>No results found</Text>
            </View>
        )
    }
    const filterByRating = (rating) => {
        console.log(rating);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <ScrollView style={styles.panelContainer}>
                    <View
                        style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "space-between", borderRadius: 10, marginBottom: 20 }}>
                        <TextInput
                            style={{ backgroundColor: "red" }}
                            value={searchQuery}
                            onEndEditing={() => handleSearch(searchQuery)}
                            placeholder='Search Reviews'
                            placeholderTextColor={"rgba(255,255,255,0.6)"}
                            style={{ color: Theme.textColor, padding: 10 }}
                            onChangeText={(inputText) => setSearchQuery(inputText)}

                        />

                        <View
                            style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}
                        >
                            <Icon
                                onPress={() => handleSearch(searchQuery)}
                                name="search" color={Theme.textColor} size={26}
                            />
                        </View>
                    </View>
                    <TouchableHighlight>
                        <View style={{ width: "35%" }}>
                            <View style={{ borderRadius: 32, borderWidth: 3, borderColor: Theme.primaryColor, flexDirection: "row", margin: 10, padding: 10, justifyContent: 'center' }}>
                                <Icon name="filter" color={Theme.primaryColor} size={26} />
                                <Text style={{ margin: 7, color: Theme.primaryColor, justifyContent: "center" }}>Filter</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{ flexDirection: "row", width: "85%", margin: 9 }}>
                        <View style={{ flex: 3, flexDirection: "row", justifyContent: "space-around", marginLeft: 10 }}>
                            <Icon name="star" color="#FFC909" size={26} />
                            <Icon name="star" color="#FFC909" size={26} />
                            <Icon name="star" color="#FFC909" size={26} />
                            <Icon name="star" color="#FFC909" size={26} />
                            <Icon name="star" color="#FFC909" size={26} />
                        </View>
                        <View style={{ flex: 3, justifyContent: "center" }}>
                            <Text style={{ color: Theme.textColor, marginLeft: 5 }}>12 reviews</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <View>
                            <View style={{ flexDirection: "row", marginHorizontal: 12, marginLeft: 10, height: 30 }}>
                                <View style={{ flex: 3, justifyContent: "center" }}>
                                    <Text style={{ color: Theme.textColor }}>Excellent</Text>
                                </View>
                                <View style={{ flex: 6, height: "100%", justifyContent: "center" }}>
                                    <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                </View>
                                <View style={{ flex: 2, justifyContent: "center", marginLeft: 8 }}>
                                    <Text style={{ color: Theme.textColor }}>5</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                            <View style={{ flex: 3, justifyContent: "center" }}>
                                <Text style={{ color: Theme.textColor }}>Very Good</Text>
                            </View>
                            <View style={{ flex: 4, height: "100%", justifyContent: "center" }}>
                                <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", marginLeft: 8 }}>
                                <Text style={{ color: Theme.textColor }}>3</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                            <View style={{ flex: 3, justifyContent: "center" }}>
                                <Text style={{ color: Theme.textColor }}>Average</Text>
                            </View>
                            <View style={{ flex: 4, height: "100%", justifyContent: "center" }}>
                                <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                            </View>
                            <View style={{ flex: 4, justifyContent: "center", marginLeft: 8 }}>
                                <Text style={{ color: Theme.textColor }}>3</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                            <View style={{ flex: 3, justifyContent: "center" }}>
                                <Text style={{ color: Theme.textColor }}>Poor</Text>
                            </View>
                            <View style={{ flex: 1.5, height: "100%", justifyContent: "center" }}>
                                <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                            </View>
                            <View style={{ flex: 6.5, justifyContent: "center", marginLeft: 8 }}>
                                <Text style={{ color: Theme.textColor }}>1</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                            <View style={{ flex: 3, justifyContent: "center" }}>
                                <Text style={{ color: Theme.textColor }}>Terrible</Text>
                            </View>
                            <View style={{ flex: 8, justifyContent: "center", marginLeft: 8 }}>
                                <Text style={{ color: Theme.textColor }}>0</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: "rgba(255,255,255,0.3)", borderBottomWidth: 2, marginVertical: 17 }} />
                    <View style={{ marginLeft: 10, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require("../../assets/images/profilepic/user1.jpg")} style={{ width: 60, height: 60, borderRadius: 999 }} />
                        </View>
                        <View style={{ flex: 4, marginLeft: 12 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                                    <Text style={{ fontWeight: '900', fontSize: 17, color: Theme.textColor }}>Xuanrong</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                    <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>16 Hours Ago</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>@wif_cuteXR</Text>
                            <View style={{ flexDirection: "row", width: "65%", justifyContent: "space-between", marginVertical: 8 }}>
                                <Icon name="star" color="#FFC909" size={26} />
                                <Icon name="star" color="#FFC909" size={26} />
                                <Icon name="star" color="#FFC909" size={26} />
                                <Icon name="star" color="#FFC909" size={26} />
                                <Icon name="star" color="#FFC909" size={26} />
                            </View>
                            <Text style={{ fontWeight: '900', fontSize: 15, color: Theme.textColor, marginBottom: 7 }}>Nice Attraction</Text>
                            <Text style={{ fontSize: 15, color: Theme.textColor }}>I think that Universal Studios Singapore is a very nice place! The rides there are super awesome! Especially the transformers ride. I rode it for 7 times in a span of 1 hour!</Text>
                            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                <Text style={{ textDecorationLine: "underline" }}>
                                    <Text style={{ color: Theme.textColor }}>Read More</Text>
                                    <Icon name="caret-down" color={Theme.textColor} size={15} />
                                </Text>
                            </View>
                            <Text style={{ color: Theme.textColor }}>Written  on July 5, 2021 12:32 PM</Text>
                            <View style={{ flexDirection: "row", marginVertical: 10 }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start' }}>
                                    <Icon name="heart" color={Theme.heartColor} size={23} />
                                    <Text style={{ color: Theme.textColor, marginLeft: 9 }}>14</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start' }}>
                                    <Icon name="chatbox-ellipses" color="#3591FE" size={23} />
                                    <Text style={{ color: "white", marginLeft: 9 }}>20</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>


                
                <View style={{backgroundColor:Theme.backgroundColor,width:"100%",height:50}}>
      {/* <TouchableOpacity style={styles.floatingReviewStyles}>
        <View style={{flexDirection:"row"}}>
          <View>
          <Image source={require("../assets/images/profilepicture.png")} style={{borderRadius: 999,width:50,height:50}}/>
          </View>
          <TextInput
                            style={{ backgroundColor: "red" }}
                            placeholder='Leave a comment as @wif_cuteXR'
                            placeholderTextColor={"rgba(255,255,255,0.6)"}
                            style={{ color: Theme.textColor, padding: 10 }}
                        />
        </View>
      </TouchableOpacity> */}
      </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: 'white',
        fontSize: 32,
        marginBottom: 20,
        fontWeight: "900",
    },
    author: {
        textAlign: 'center',
        color: '#BFBFBF',
        marginBottom: 20,
        fontSize: 14,
    },
    subContainerSection: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 20,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        paddingHorizontal: 30,
        paddingVertical: 10
    },

    activeButton: {
        backgroundColor: Theme.primaryColor
    },

    subContainerText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        textAlign: 'center',
    },

    singlequote: {
        color: Theme.singleQuoteColor,
        fontSize: 60,
        height: 35,
        padding: 0,
        margin: 0
    },
    description: {
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 25,
    },
    panelContainer: {
        backgroundColor: Theme.backgroundColor,
        padding: 20
    },
    container: {
        flex: 1,
        borderRadius: 100
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    smallContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    broughtButton: {
        padding: 12,
        borderRadius: 999,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },

    broughtText: {
        textAlign: "center",
        color: Theme.textColor
    },

    broughtButtonContainer: {
        alignItems: "center",
        marginRight: 10
    },
    floatingReviewStyles: { 
        position: "absolute",  
        right: 20, 
        bottom:10,
        backgroundColor:"rgba(255,255,255,0.25)", 
        borderRadius: 999, 
        padding: 8, 
        elevation: 4 }
});


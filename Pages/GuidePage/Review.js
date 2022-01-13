/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://github.com/react-native-modal/react-native-modal
import React, { useState, useEffect } from 'react';
import { ImageBackground, Linking, Platform, Alert, FlatList,Image, StyleSheet, Button, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ImageEditor } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import HighlightText from '@sanar/react-native-highlight-text';
import Modal from "react-native-modal";

export default ({ place }) => {
    const visitType=["Solo","Couple","Business","Family","Friends","School"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    // let monthName = months[d.getMonth()];
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [displayData, setDisplayData] = useState(place.comment);
    const [done, setDone] = useState(false);
    const [rating, setRating] = useState([1, 2, 3, 4, 5]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    useEffect(() => {
        if (searchQuery.length == 0) {
            setDone(false);
        }
    }, [searchQuery]);
    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 6 }}>
                <View style={{ flex: 1 }}>
                    <Image source={item.profile_pic} style={{ width: 60, height: 60, borderRadius: 999 }} />
                </View>
                <View style={{ flex: 4, marginLeft: 12 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                            <Text style={{ fontWeight: '900', fontSize: 17, color: Theme.textColor }}>{item.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>{item.date_created}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{item.username}</Text>
                    <View style={{ flexDirection: "row", width: "65%", justifyContent: "space-between", marginVertical: 8 }}>
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                    </View>
                    <Text style={{ fontWeight: '900', fontSize: 15, color: Theme.textColor, marginBottom: 7 }}>{item.guide_title}</Text>
                    {/* <Text style={{ fontSize: 15, color: Theme.textColor }}>{item.guide_description}</Text> */}
                    <HighlightText
                        highlightStyle={{ backgroundColor: '#823935' }}
                        searchWords={[searchQuery]}
                        textToHighlight={item.guide_description}
                        style={{ fontSize: 15, color: Theme.textColor }}
                    />

                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Text style={{ textDecorationLine: "underline" }}>
                            <Text style={{ color: Theme.textColor }}>Read More</Text>
                            <Icon name="caret-down" color={Theme.textColor} size={15} />
                        </Text>
                    </View>
                    <View style={{backgroundColor:item.tag_color,width:"30%",padding:5,borderRadius:9,marginBottom:5}}>
                        <Text style={{ fontSize: 13, color: Theme.textColor,alignSelf:"center",fontWeight:"bold"}}>• {item.guide_tag}</Text>
                    </View>
                    <Text style={{ color: Theme.textColor }}>Written on {item.created_at}</Text>
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
        )
    }
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
    return (
        <View style={styles.container}>
            <ScrollView style={styles.panelContainer}>
                <View
                    style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.3)", height: 45, justifyContent: "space-between", borderRadius: 10, marginBottom: 20 }}
                >
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    isVisible={isModalVisible}
                    onRequestClose={toggleModal}
                    onBackdropPress={toggleModal}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
                        <View style={{ margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                            <Text style={{ marginBottom: 15, textAlign: "center", fontWeight: '900' }}>Filter</Text>
                            <Text style={{ fontWeight: 'bold', alignSelf: "flex-start" }}>Traveller rating</Text>
                            <View style={{ flexDirection: "row",flexWrap:"wrap" }}>
                                {
                                    rating.map((rating) => {
                                        return (
                                            // <TouchableOpacity onPress={() => filterByRating(rating)}>
                                            <TouchableOpacity>
                                                <View style={{ borderColor: "#757272", borderWidth: 2, flexDirection: "row", padding: 6, borderRadius: 12,margin:4}}>
                                                    {
                                                        [...new Array(5)].map((_,index)=> {
                                                            if(index+1<=rating){
                                                            return <Icon name="star" color="#FFC909" size={15}/>
                                                            }
                                                            else {
                                                                return <Icon name="star-outline" color="#FFC909" size={15}/>
                                                            }
                                                            
                                                        })
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <Text style={{ fontWeight: 'bold', alignSelf: "flex-start",marginTop:5}}>Time Of Year</Text>
                            <View style={{ flexDirection: "row",flexWrap:"wrap" }}>
                                {
                                    months.map((months) => {
                                        return (
                                            // <TouchableOpacity onPress={() => filterByRating(rating)}>
                                            <TouchableOpacity>
                                                <View style={{ borderColor: "#757272", borderWidth: 2, flexDirection: "row", padding: 6, borderRadius: 12,margin:4}}>
                                                        <Text>{months}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <Text style={{ fontWeight: 'bold', alignSelf: "flex-start",marginTop:5}}>Type Of Visit</Text>
                            <View style={{ flexDirection: "row",flexWrap:"wrap" }}>
                                {
                                    visitType.map((type) => {
                                        return (
                                            // <TouchableOpacity onPress={() => filterByRating(rating)}>
                                            <TouchableOpacity>
                                                <View style={{ borderColor: "#757272", borderWidth: 2, flexDirection: "row", padding: 6, borderRadius: 12,margin:4}}>
                                                        <Text>{type}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View style={{flexDirection:"row",marginVertical:9 }}>
                                <View style={{flex:1}}>
                            <TouchableOpacity
                                style={{justifyContent:"flex-start",borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#CA166C",}}
                                onPress={toggleModal}
                            >
                                <Text style={styles.textStyle}>Clear Filter</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{flex:1}}>
                            <TouchableOpacity
                                style={{ justifyContent:"flex-end",borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3"}}
                                onPress={toggleModal}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight onPress={toggleModal}>
                    <View style={{ width: "35%" }}>
                        <View style={{ borderRadius: 32, borderWidth: 3, borderColor: Theme.primaryColor, flexDirection: "row", marginHorizontal: 10, marginVertical: 4, padding: 10, justifyContent: 'center' }}>
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
                <SafeAreaView style={{ marginLeft: 10 }}>
                    <FlatList
                        data={displayData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={renderNoGuide}
                    />
                </SafeAreaView>
            </ScrollView>
        </View>
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


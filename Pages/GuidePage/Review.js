/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://github.com/react-native-modal/react-native-modal
import React, { useState, useEffect } from 'react';
import { ImageBackground, Linking, Platform, Alert, FlatList, Image, StyleSheet, Button, Text, View, TouchableHighlight, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ImageEditor } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../../config/Theme';
import HighlightText from '@sanar/react-native-highlight-text';
import Modal from "react-native-modal";
import { getAllCommentsByPostId } from '../../utils/storage';
import FilterRatingButton from '../../components/FilterRatingButton';
import FilterMonthButton from '../../components/FilterMonthButton';
const relativeDate = require("relative-date")

import moment from 'moment';

export default ({ place, forceUpdate }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const rating = [1, 2, 3, 4, 5];
    const [numComment, setNumComment] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [excellent, setExcellent] = useState(0);
    const [good, setGood] = useState(0);
    const [average, setAverage] = useState(0);
    const [poor, setPoor] = useState(0);
    const [terrible, setTerrible] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");



    const [isModalVisible, setModalVisible] = useState(false);
    const [displayData, setDisplayData] = useState([]);

    const [filterRating, setFilterRating] = useState(null);
    const [monthRating, setMonthRating] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const filterItems = () => {
        if (filterRating != null && monthRating == null) {
            setDisplayData(place.comment.filter(guide => guide.rating == filterRating))
        }
        else if (filterRating == null && monthRating != null) {
            setDisplayData(place.comment.filter(guide => moment(guide.created_at.toLowerCase()).format('MMMM') == monthRating.toLowerCase()))
        }
        else if (filterRating != null && monthRating != null) {
            setDisplayData(place.comment.filter(guide => guide.rating == filterRating && moment(guide.created_at.toLowerCase()).format('MMMM') == monthRating.toLowerCase()))
        }
        else {
            getLatestComments()
        }
        toggleModal();
    }


    const getTotalRating = () => {
        getAllCommentsByPostId(place.id).then(comments => {
            let sum = 0;
            setNumComment(comments.length)
            for (let i = 0; i < comments.length; i++) {
                sum += comments[i].rating;
                if (comments[i].rating == 1) {
                    setTerrible(terrible + 1);
                } else if (comments[i].rating == 2) {
                    setPoor(poor + 1);
                } else if (comments[i].rating == 3) {
                    setAverage(average + 1);
                } else if (comments[i].rating == 4) {
                    setGood(good + 1);
                } else {
                    setExcellent(excellent + 1);
                }
            }
            setTotalRating(parseInt(sum / comments.length))
        })
    }
    useEffect(() => {
        getLatestComments();
        getTotalRating();
    }, [])

    const getLatestComments = () => {
        getAllCommentsByPostId(place.id).then(comments => {
            setDisplayData(comments.reverse())
        }).catch(e => {
            alert(e);
        })
    }

    const clearFilter = () => {
        setMonthRating(null);
        setFilterRating(null);
    }

    useEffect(() => {
        getLatestComments();
        getTotalRating()
    }, [forceUpdate])

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", marginVertical: 6 }}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: item.profile_pic }} style={{ width: 60, height: 60, borderRadius: 999 }} />
                </View>
                <View style={{ flex: 4, marginLeft: 12 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                            <Text style={{ fontWeight: '900', fontSize: 17, color: Theme.textColor }}>{item.name}</Text>
                        </View>

                        {/* How long ago  */}
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>
                                {relativeDate(new Date(item.created_at))}
                            </Text>
                        </View>

                    </View>
                    <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{item.username}</Text>
                    <View style={{ flexDirection: "row", marginVertical: 8 }}>

                        {/* Rating */}
                        {new Array(item.rating).fill(0).map((_, index) => {
                            return (
                                <Icon key={index} name="ios-star" size={20} color="#FFC909" style={{ marginRight: 5 }} />
                            )
                        })}
                        {new Array(5 - item.rating).fill(0).map((_, index) => {
                            return (
                                <Icon key={index} name="ios-star" size={20} color="white" style={{ marginRight: 5 }} />
                            )
                        }
                        )}
                    </View>
                    <Text style={{ fontWeight: '900', fontSize: 15, color: Theme.textColor, marginBottom: 7 }}>{item.guide_title}</Text>
                    {/* <Text style={{ fontSize: 15, color: Theme.textColor }}>{item.guide_description}</Text> */}
                    <HighlightText
                        highlightStyle={{ backgroundColor: '#823935' }}
                        searchWords={[searchQuery]}
                        textToHighlight={item.guide_description}
                        style={{ fontSize: 15, color: Theme.textColor }}
                    />

                    {/* <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <Text style={{ textDecorationLine: "underline" }}>
                            <Text style={{ color: Theme.textColor }}>Read More</Text>
                            <Icon name="caret-down" color={Theme.textColor} size={15} />
                        </Text>
                    </View> */}

                    <Text style={{ color: Theme.textColor }}>Written on {moment(item.created_at).format('LLL')}</Text>

                    {/* <View style={{ flexDirection: "row", marginVertical: 10 }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start' }}>
                            <Icon name="heart" color={Theme.heartColor} size={23} />
                            <Text style={{ color: Theme.textColor, marginLeft: 9 }}>14</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start' }}>
                            <Icon name="chatbox-ellipses" color="#3591FE" size={23} />
                            <Text style={{ color: "white", marginLeft: 9 }}>20</Text>
                        </View>
                    </View> */}

                </View>
            </View>
        )
    }

    const handleSearch = (searchQuery) => {
        if (searchQuery !== "") {
            setDisplayData(place.comment.filter(guide => guide.guide_title.toLowerCase().includes(searchQuery.toLowerCase()) || guide.guide_description.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else {
            getLatestComments();
        }
    }

    const renderNoGuide = () => {
        return (
            <View>
                <Text style={{ color: Theme.textColor }}>No reviews found</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.panelContainer}>

                {totalRating > 0 && (

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
                )}

                {/* Filter modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    isVisible={isModalVisible}
                    onRequestClose={toggleModal}
                    onBackdropPress={toggleModal}
                >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
                        <View style={{ margin: 20, backgroundColor: Theme.textColor, borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                            <Text style={{ marginBottom: 15, textAlign: "center", fontWeight: 'bold', fontSize: 21, color: Theme.backgroundColor }}>Filter</Text>

                            {/* Rating */}
                            <Text style={{ color: "rgba(0,0,9,0.5)", fontWeight: "bold", fontSize: 14, alignSelf: "flex-start" }}>Traveller rating</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {
                                    rating.map((rating, i) => {
                                        return (
                                            <FilterRatingButton onPress={() => setFilterRating(rating)} style={(filterRating == rating) ? { elevation: 3, flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, backgroundColor: "#8987FF" } : { flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, borderColor: "#979797", borderWidth: 2 }} ratingText={rating} filterRating={filterRating} />
                                        )
                                    })
                                }
                            </View>


                            {/* Time of year */}
                            <Text style={{ color: "rgba(0,0,9,0.5)", fontWeight: "bold", fontSize: 14, alignSelf: "flex-start", marginTop: 10 }}>Time Of Year</Text>

                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                {
                                    months.map((m) => {
                                        return (
                                            // <TouchableOpacity onPress={() => filterByRating(rating)}>
                                            <FilterMonthButton onPress={() => setMonthRating(m)} style={(monthRating == m) ? { elevation: 3, flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, backgroundColor: "#8987FF" } : { flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, borderColor: "#979797", borderWidth: 2 }} month={m} filterMonth={monthRating} />
                                            // <TouchableOpacity>
                                            //     <View style={{ flexDirection: "row", padding: 6, borderRadius: 8, margin: 4, borderColor: "#979797", borderWidth: 2 }}>
                                            //         <Text style={{ color: "rgba(0,0,9,0.5)", fontWeight: "bold" }}>{months}</Text>
                                            //     </View>
                                            // </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>

                            {/* Buttons */}
                            <View style={{ flexDirection: "row", marginVertical: 15, justifyContent: "space-between" }}>
                                <TouchableOpacity
                                    style={{ borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#CA166C", justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}
                                    onPress={clearFilter}
                                >
                                    <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Clear Filter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "#2196F3", justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}
                                    onPress={filterItems}
                                >
                                    <Text style={{ color: Theme.textColor, fontWeight: "bold" }}>Apply Filter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {totalRating > 0 && (
                    <>
                        {/* Filter button */}
                        <TouchableHighlight onPress={toggleModal}>
                            <View style={{ width: 100, borderRadius: 32, borderWidth: 3, borderColor: Theme.primaryColor, flexDirection: "row", marginHorizontal: 10, marginVertical: 4, padding: 6, justifyContent: 'center', alignItems: "center" }}>
                                <Icon name="funnel" color={Theme.primaryColor} size={26} />
                                <Text style={{ marginLeft: 5, color: Theme.primaryColor, justifyContent: "center" }}>Filter</Text>
                            </View>
                        </TouchableHighlight>


                        <View style={{ flexDirection: "row", width: "85%", margin: 9 }}>
                            <View style={{ flex: 3, flexDirection: "row", justifyContent: "space-around", marginLeft: 10 }}>
                                {
                                    new Array(totalRating).fill(0).map((_, index) => {
                                        return (
                                            <Icon key={index} name="ios-star" size={20} color="#FFC909" style={{ marginRight: 5 }} />
                                        )
                                    })}
                                {new Array(5 - totalRating).fill(0).map((_, index) => {
                                    return (
                                        <Icon key={index} name="ios-star" size={20} color="white" style={{ marginRight: 5 }} />
                                    )
                                }
                                )}
                                {/* <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} />
                        <Icon name="star" color="#FFC909" size={26} /> */}
                            </View>
                            <View style={{ flex: 3, justifyContent: "center" }}>
                                <Text style={{ color: Theme.textColor, marginLeft: 5 }}>{numComment}</Text>
                            </View>
                        </View>


                        <View style={{ marginLeft: 10 }}>
                            <View>
                                <View style={{ flexDirection: "row", marginHorizontal: 12, marginLeft: 10, height: 30 }}>
                                    <View style={{ width: 100, justifyContent: "center" }}>
                                        <Text style={{ color: Theme.textColor }}>Excellent</Text>
                                    </View>
                                    <View style={{ width: (excellent / totalRating) * 100 + "%", height: "100%", justifyContent: "center" }}>
                                        <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                    </View>
                                    <View style={{ justifyContent: "center", marginLeft: 8 }}>
                                        <Text style={{ color: Theme.textColor }}>{excellent}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                                <View style={{ width: 100, justifyContent: "center" }}>
                                    <Text style={{ color: Theme.textColor }}>Very Good</Text>
                                </View>
                                <View style={{ width: (good / totalRating) * 100 + "%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 8 }}>
                                    <Text style={{ color: Theme.textColor }}>{good}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                                <View style={{ width: 100, justifyContent: "center" }}>
                                    <Text style={{ color: Theme.textColor }}>Average</Text>

                                </View>
                                <View style={{ width: (average / totalRating) * 100 + "%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 8 }}>
                                    <Text style={{ color: Theme.textColor }}>{average}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                                <View style={{ width: 100, justifyContent: "center" }}>
                                    <Text style={{ color: Theme.textColor }}>Poor</Text>
                                </View>
                                <View style={{ width: (poor / totalRating) * 100 + "%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 8 }}>
                                    <Text style={{ color: Theme.textColor }}>{poor}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginHorizontal: 12, height: 30 }}>
                                <View style={{ width: 100, justifyContent: "center" }}>
                                    <Text style={{ color: Theme.textColor }}>Terrible</Text>
                                </View>
                                <View style={{ width: (terrible / totalRating) * 100 + "%", height: "100%", justifyContent: "center" }}>
                                    <View style={{ width: "100%", height: 16, backgroundColor: Theme.primaryColor, borderRadius: 23 }}></View>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 8 }}>
                                    <Text style={{ color: Theme.textColor }}>{terrible}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}


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
        bottom: 10,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 999,
        padding: 8,
        elevation: 4
    }
});



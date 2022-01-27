import React from "react";
import {TouchableOpacity, Text,View} from "react-native"
import Theme from "../config/Theme";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from "prop-types";

function FilterRatingButton({onPress, style,ratingText,filterRating}) {
    return (
        <TouchableOpacity onPress={onPress}>
                                                        <View style={{...style}}>
                                                        {
                                                            [...new Array(5)].map((_, index) => {
                                                                if (index + 1 <= ratingText) {
                                                                    return <Icon name="star" color={filterRating==ratingText?"#FFC909":"#C4C4C4"} size={15} />
                                                                }
                                                                else {
                                                                    return <Icon name="star-outline" color={filterRating==ratingText?"#FFC909":"rgba(0,0,0,0.25)"} size={15} />
                                                                }

                                                            })
                                                        }
                                                    </View>
                                                </TouchableOpacity>
    )
}

FilterRatingButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
    ratingText:PropTypes.string.isRequired,
    filterRating:PropTypes.number.isRequired
}

export default FilterRatingButton;
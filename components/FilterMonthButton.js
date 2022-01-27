// import React from "react";
// import {TouchableOpacity, Text,View} from "react-native"
// import Theme from "../config/Theme";
// import Icon from 'react-native-vector-icons/Ionicons';
// import PropTypes from "prop-types";

// function FilterMonthButton({onPress, style,month,filterMonth}) {
//     return (
//         <TouchableOpacity onPress={onPress}>
//                                                         <View style={{...style}}>
//                                                         {
//                                                             [...new Array(5)].map((_, index) => {
//                                                                 <Text style={{ color: filterMonth==month?Theme.textColor:"rgba(0,0,9,0.5)", fontWeight: "bold" }}>{month}</Text>

//                                                             })
//                                                         }
//                                                     </View>
//                                                 </TouchableOpacity>
//     )
// }

// FilterMonthButton.propTypes = {
//     onPress: PropTypes.func.isRequired,
//     style: PropTypes.object.isRequired,
//     month:PropTypes.string.isRequired,
//     filterMonth:PropTypes.string.isRequired
// }

// export default FilterMonthButton;
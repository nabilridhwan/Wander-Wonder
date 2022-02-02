import AsyncStorage from "@react-native-async-storage/async-storage";
import Guides from "../assets/data/Guides";

export function getCurrentUser() {
    return new Promise((resolve, reject) => {

        AsyncStorage.getItem("currentUser").then(value => {
            resolve(JSON.parse(value));
        }).catch(e => {
            reject(e);
        })
    })
}

export function getUserByUserObj({
    email
}) {
    return new Promise((resolve, reject) => {

        AsyncStorage.getItem("users").then(users => {
                const parsedUsers = JSON.parse(users);
                const user = parsedUsers.find(user => user.email === email);
                resolve(user);
            })
            .catch(e => {
                reject(e)
            })
    })
}

export function updateUser({
    id,
    profile_pic_uri,
    name,
    username,
    email,
    password
}) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("users").then(users => {

            const parsedUsers = JSON.parse(users);
            const user = parsedUsers.find(user => user.id === id);

            user.profile_pic_uri = profile_pic_uri;
            user.name = name;
            user.email = email;
            user.username = username;
            user.password = password;

            AsyncStorage.setItem("users", JSON.stringify(parsedUsers)).then(() => {

                AsyncStorage.setItem("currentUser", JSON.stringify(user)).then(() => {
                    resolve(user);
                })
            }).catch(e => {
                reject(e);
            })
        })
    })
}

export function initGuide() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("guides").then(guide => {
            if (guide === null) {
                AsyncStorage.setItem("guides", JSON.stringify(Guides)).then(() => {
                    resolve(Guides);
                })
            } else {
                resolve(JSON.parse(guide));
            }
        }).catch(e => {
            reject(e)
        })
    })
}

export function getAllGuides() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("guides").then(guide => {
            resolve(JSON.parse(guide));
        })
    })
}

export function getGuide({
    id
}) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("guides").then(guide => {
            const parsedGuide = JSON.parse(guide);
            const guideToReturn = parsedGuide.find(guide => guide.id === id);
            resolve(guideToReturn);
        })
    })
}

export function toggleLikeOnGuide({
    id
}) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("guides").then(guide => {
            const parsedGuide = JSON.parse(guide);
            const guideToReturn = parsedGuide.find(guide => guide.id === id);
            guideToReturn.liked = !guideToReturn.liked;
            AsyncStorage.setItem("guides", JSON.stringify(parsedGuide)).then(() => {
                resolve(guideToReturn);
            })

        })
    })
}

export function getAllCommentsByPostId(id) {
    return new Promise((resolve, reject) => {
        getGuide({
            id
        }).then(guide => {
            if (guide.comment.length = 0) {
                reject("No comments");
            } else {
                resolve(guide.comment);
            }
        }).catch(e => {
            reject(e);
        })
    })
}

export function addNewCommentByPostId(id, guide_title, guide_description, created_at, rating) {
    return new Promise((resolve, reject) => {

        getAllGuides().then(guides => {

            getCurrentUser().then(({
                username,
                name,
                profile_pic_uri
            }) => {

                const guideToReturn = guides.find(guide => guide.id === id);
                guideToReturn.comment.push({
                    id: guideToReturn.comment.length + 1,
                    username,
                    name,
                    profile_pic: profile_pic_uri,
                    guide_title,
                    guide_description,
                    created_at,
                    rating
                });

                AsyncStorage.setItem("guides", JSON.stringify(guides)).then(() => {
                    resolve(guideToReturn);
                })

            }).catch(e => {
                reject(e);
            })
        })
    })
}

export const flushAllData = () => {
    AsyncStorage.clear();
}

export const flushGuides = () => {
    AsyncStorage.removeItem("guides");
}

export function addNewGuide({
    condition,
    description,
    distance,
    duration,
    items,
    category,
    price,
    temperature,
    title,
    travelPictures: image_url,
    website,
    itinerary,
}) {
    return new Promise((resolve, reject) => {

        // Get all guides
        // Form the object to push
        // Push it
        getAllGuides().then(guides => {
            getCurrentUser().then(({
                username,
            }) => {

                const newGuide = {
                    id: guides.length + 1,
                    title,
                    description,
                    author: username,
                    image_url,
                    countryEmoji: "🚩",
                    category,
                    liked: false,
                    duration: duration + " Hours",
                    weather: temperature,
                    website,
                    latitude: 1,
                    longitude: 1,
                    comment: [],
                    items,
                    itinerary,
                    condition,
                    distance,
                    price
                }

                console.log(newGuide)

                guides.push(newGuide);

                // Write back
                AsyncStorage.setItem("guides", JSON.stringify(guides)).then(() => {
                    resolve(newGuide);
                }).catch(e => {
                    reject(e);
                })

            }).catch(e => {
                reject(e)
            })
        }).catch(e => {
            reject(e)
        })
    })
}
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    profile_pic_uri,
    name,
    username,
    email,
    password
}) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("users").then(users => {

            const parsedUsers = JSON.parse(users);
            const user = parsedUsers.find(user => user.email === email);

            user.profile_pic_uri = profile_pic_uri;
            user.name = name;
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
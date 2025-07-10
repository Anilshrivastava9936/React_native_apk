import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Forms/Menus/FooterMenu";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
    const navigate = useNavigation();
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
    //local state
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] = useState(false);
    //handle update user data
    const handleUpdate = async () => {
        try {
            setLoading(true);
            // console.log("update user", name, password, email);
            const { data } = await axios.post("/auth/update-user", {
                name,
                password,
                email,
            });
            if (!data) {
                console.log("user not updated ,Na")
            }
            setLoading(false);
            // let UD = JSON.stringify(data);
            // setState({ ...state, user: UD?.updatedUser });
            setState({ ...state, user: data?.updatedUser });
            alert(data && data.message);
            navigate.navigate("Login");


        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{
                            uri: "https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg",
                        }}
                        style={{ height: 200, width: 200, borderRadius: 80 }}
                    />
                </View>
                <Text style={styles.warningText}>
                    You can update name and password only{" "}
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        value={name}
                        style={styles.inputBox}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        value={email}
                        style={styles.inputBox}
                        editable={false}
                    />

                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        value={password}
                        style={styles.inputBox}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput
                        value={state?.user.role}
                        style={styles.inputBox}
                        editable={false}
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.updateBtnText}>
                            {loading ? "Please Wait" : "update Profile"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu></FooterMenu>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: 40,
    },
    warningText: {
        color: "red",
        fontSize: 13,
        textAlign: "center",
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        fontWeight: "bold",
        width: 70,
        color: "gray",
    },
    inputBox: {
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
    updateBtn: {
        backgroundColor: "black",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    updateBtnText: {
        color: "#ffffff",
        fontSize: 18,
    },
});
export default Account;

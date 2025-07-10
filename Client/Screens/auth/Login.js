import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
// import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
    //global State
    const [state, setState] = useState(AuthContext)

    // const navigation = useNavigation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    

    //btn function
    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!email || !password) {
                setLoading(false);
                return alert('Please Fill All Fields')
            }
            const lowerCaseEmail = email.toLowerCase();

            setLoading(false)
            const { data } = await axios.post('/auth/login', { email: lowerCaseEmail, password });
            setState(data);
            //local storage using asyncStorage
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            alert(data && data.message);
            navigation.navigate('Home')
            // console.log("Login Data==>", { email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error)

        }
    }

    //temp local storage
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem('@auth')
        // console.log("datlocal", data)
    }
    getLocalStorageData();


    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login </Text>
            <View style={{ marginHorizontal: 20 }}>

                <InputBox
                    inputTitle={"Email"}
                    value={email}
                    setValue={setEmail}
                    keyboardType="email-address"
                    autoComplete="email"
                />
                <InputBox
                    inputTitle={"Password"}
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoComplete="password"
                />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton btnTitle='Login' loading={loading} handleSubmit={handleSubmit} />
            <Text style={styles.linkText}>!Not a User  <Text style={styles.link} onPress={() => navigation.navigate('Register')}  >REGISTER</Text>{" "}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "yellow",
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    inputBox: {
        height: 40,
        fontWeight: "bold",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: "#af9f85",
    },
    linkText: {
        textAlign: "center",
        fontSize: 20,

    },
    link: {
        color: "red"
    }
});

export default Login
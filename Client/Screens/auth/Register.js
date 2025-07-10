import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from 'axios';

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //btn function
  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (!name || !email || !password) {
        setLoading(false);
        return alert('Please Fill All Fields')
      }

      const lowerCaseEmail = email.toLowerCase();

      setLoading(false)
      const { data } = await axios.post('/auth/register', { name, email: lowerCaseEmail, password });
      alert(data && data.message);
      navigation.naviagte('Login');
      // console.log("Register Data==>", { name, email: lowerCaseEmail, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error)

    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register </Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"Name"} value={name} setValue={setName} />
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
      <SubmitButton btnTitle='Register' loading={loading} handleSubmit={handleSubmit} />
      <Text style={styles.linkText}>Already Register User  <Text onPress={() => navigation.navigate('Login')} style={styles.link}>LOGIN</Text></Text>
    </View>
  );
};

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

export default Register;

import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import FooterMenu from '../components/Forms/Menus/FooterMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { PostContext } from '../context/postContext';


const Post = () => {
    // global state
    // const [posts,setPosts]=useContext(PostContext); before
    const { posts, setPosts } = useContext(PostContext);
    //local state
    const navigation = useNavigation();


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    //handle form data post DATa
    const handlePost = async () => {
        try {
            setLoading(true)
            if (!title) {
                alert("Please Add Title")
                setLoading(false);
            }
            if (!description) {
                alert("Please Add Description")
                setLoading(false);
            }
            const { data } = await axios.post('/post/create-post', { title, description })
            // data.save();
            setLoading(false)
            setPosts([...posts, data?.post])
            alert(data?.message)
            navigation.navigate("Home")

        } catch (error) {
            alert(error.response.data.message || error.message)
            console.log(error)
            setLoading(false)

            alert(`your post title is ${title} and post desc ${description}`)
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={{ alignItems: "center" }} >
                    <Text style={styles.heading} >Create a post</Text>
                    <TextInput style={styles.inputBox} placeholder='Add a Post' placeholderTextColor={"gray"} value={title} onChangeText={(text) => setTitle(text)} />
                    <TextInput style={[styles.inputBox, { height: 120, textAlignVertical: 'top' }]} placeholder='Add a Description' placeholderTextColor={"gray"} multiline={true} numberOfLines={6} value={description} onChangeText={(text) => setDescription(text)} />
                </View>
                <View style={{ alignItems: "center" }} >
                    <TouchableOpacity style={styles.postBtn} onPress={handlePost} >
                        <Text style={styles.postBtnText} >
                            <FontAwesome5 name='plus-square' size={18} />{" "}
                            Create post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu></FooterMenu>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 40,
    },
    heading: {

        fontSize: 25,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    inputBox: {
        backgroundColor: "#ffffff",
        textAlignVertical: "top",
        paddingTop: 10,
        width: 320,
        marginTop: 30,
        fontSize: 16, paddingLeft: 15, borderColor: 'gray', borderRadius: 2, borderRadius: 10,
    },
    postBtn: {
        backgroundColor: "black",
        width: 300,
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 30,

    },
    postBtnText: {
        color: "white",
        fontSize: 18, fontWeight: "bold",
    }
})

export default Post
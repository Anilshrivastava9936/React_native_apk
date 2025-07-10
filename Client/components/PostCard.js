import { View, Text, StyleSheet, Alert } from 'react-native'
import moment from 'moment'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import EditModel from './EditModel';
// import { orange } from '@mui/material/colors';

const PostCard = ({ posts, myPostScreen }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    //handle delete
    const handleDeletePrompt = (id) => {
        Alert.alert('Attention', "Are you sure want to delete this Post", [
            {
                text: "Cancel",
                onPress: () => {
                    console.log("cancel press")
                },
            },
            {
                text: "Delete",
                onPress: () => {
                    handleDeletePost(id);
                },
            },
        ]);
    };

    //handle delete post
    const handleDeletePost = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/post/delete-post/${id}`)
            setLoading(false)
            alert(data?.message)
            navigation.push('Myposts')

        } catch (error) {
            setLoading(false),
                console.log(error),
                alert(error)
        }
    }

    return (
        <View>
            <Text style={styles.heading}  >Total Posts {posts?.length}</Text>
            {myPostScreen && (<EditModel modalVisible={modalVisible} setModalVisible={setModalVisible} post={post} />)}
            {posts?.map((post, i) => (
                // key={post?._id || i} addes extra by own
                <View key={post?._id || i} style={styles.card}>
                    {myPostScreen && (<View style={{ flexDirection: "row", justifyContent: "flex-end" }} >
                        <Text style={{ marginHorizontal: 20 }}>
                            <FontAwesome5 name='pen' size={16} color={"darkblue"} onPress={() => { setPost(post), setModalVisible(true) }} />
                        </Text>
                        <Text >
                            <FontAwesome5 name='trash' size={16} color={"red"} onPress={() => handleDeletePrompt(post?._id)} />
                        </Text>
                    </View>)}
                    <Text style={styles.title} >Title : {post?.title}</Text>

                    <Text style={styles.desc} > {post?.description}</Text>

                    <View style={styles.footer} >
                        {post?.postedBy?.name && (<Text>  <FontAwesome5 name='user' color={"orange"} />{" "} {post?.postedBy?.name}  </Text>)}

                        <Text>  <FontAwesome5 name='clock' color={"orange"} />{" "}  {moment(post?.createdAt).format('DD:MM:YYYY')}  </Text>
                    </View>

                </View>


            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: "green",
        textAlign: "center",

    },
    card: {
        width: "97%",
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: "gray",
        padding: 20,
        borderRadius: 5,
        marginVertical: 10,


    },
    title: {
        fontWeight: "bold",
        paddingBottom: 10,
        borderBottomWidth: 0.3,

    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    desc: {
        marginTop: 10,
    }


})

export default PostCard
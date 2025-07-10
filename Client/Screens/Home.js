import { View, Text, StyleSheet, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
// import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Forms/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import { ScrollView } from 'react-native-gesture-handler';
import PostCard from '../components/PostCard';
import { useFocusEffect } from '@react-navigation/native';


const Home = () => {
    //global state
    // const [state] = useContext(AuthContext);
    // const [posts, getAllPosts] = useContext(PostContext); before
    const { posts, getAllPosts } = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false)

    //for auto refreshing extra
    useFocusEffect(
        useCallback(() => {
            getAllPosts();
        }, [])
    );


    // refresh control
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getAllPosts();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [])

    // const onRefresh = useCallback(async () => {
    //     setRefreshing(true);
    //     await getAllPosts();
    //     setRefreshing(false);
    // }, [getAllPosts]);

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <PostCard posts={posts} />
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <View style={{ backgroundColor: "#ffffff" }}>
                <FooterMenu></FooterMenu>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',

    }
})

export default Home;
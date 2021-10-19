import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';

import PushNotification from "react-native-push-notification";
import GlobalStyle from '../utils/GlobalStyle';



export default function Splash({ navigation }) {

    useEffect(() => {
        createChannels()
        setTimeout(() => {
            navigation.replace('My Tasks')
        },1000)
    }, []);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "task-channel",
                channelName: "Task Channel"
            }
        )
    }

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../../assets/todo.png')}
            />
            <Text style={[
                GlobalStyle.CustomFontBig,
                styles.text
            ]}>
                TO-DO-APP
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
    },
})
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'

import { useSelector, useDispatch } from 'react-redux'
import { setTaskID, setTasks } from '../redux/actions';

import GlobalStyle from '../utils/GlobalStyle'

export default function Done({ navigation }) {
    
    const { tasks } = useSelector(state => state.taskReducer)
    const dispatch = useDispatch()

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.ID != id)
        AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
            .then(() => {
                dispatch(setTasks(filteredTasks))
                // Alert.alert('Success' , 'Task Deleted Succesfully')
                console.warn('Task Deleted!')
            })
        .catch(err => console.log(err))
    }

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.ID === id)
        if (index > -1) {
            let newTasks = [...tasks]
            newTasks[index].Done = newValue
            AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
                .then(() => {
                    dispatch(setTasks(newTasks))
                    console.warn("Task Status Changed")
                })
            .catch(err => console.log(err))
        }
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={tasks.filter(task => task.Done === true)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(setTaskID(item.ID));
                            navigation.navigate('Task');
                        }}
                    >
                        <View style={styles.item_row}>
                            <CheckBox
                                value={item.Done}
                                onValueChange={(newValue)=>{checkTask(item.ID, newValue)}}
                            />
                            <View style={styles.item_body}>
                                <Text
                                    style={[
                                        GlobalStyle.CustomFontHW,
                                        styles.title
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Title}
                                </Text>
                                <Text
                                    style={[
                                        GlobalStyle.CustomFontHW,
                                        styles.subtitle
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.Description}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.delete}
                                // onPress={()=>{deleteTask(item.ID)}}
                                onPress={() => {
                                    Alert.alert('Warning!', 'Do you want to Delete the Task?', [
                                        { text: 'YES', onPress: () => {deleteTask(item.ID)} },
                                        { text: 'NO' }
                                    ])
                                }}
                            >
                                <FontAwesome5
                                    name={'trash'}
                                    size={25}
                                    color={'#ff3636'}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    item_row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_body:{
        flex: 1
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    delete: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    subtitle: {
        color: '#999999',
        fontSize: 20,
        margin: 5,
    }
})

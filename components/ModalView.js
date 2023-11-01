import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'

import globalStyles from '../utils/globalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';


const ModalView = ({ onPressHandlers }) => {

    const { onUpdateBlog, onDeleteBlog, onCloseModal } = onPressHandlers

    return (
        <View style={styles.container}>
            <View style={styles.modalViewContainer}>
                <TouchableOpacity
                    style={[styles.touchableBtn, globalStyles.updateBtn]}
                    onPress={onUpdateBlog}

                >
                    <Text style={globalStyles.btnText}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.touchableBtn, globalStyles.deleteBtn]}
                    onPress={onDeleteBlog}
                >
                    <Text style={globalStyles.btnText}>Delete</Text>
                </TouchableOpacity>

                <Ionicons
                    name="close"
                    size={30}
                    onPress={() => onCloseModal()}

                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        zIndex: 1,
                        borderWidth: 1,
                        borderRadius: 30,
                        paddingHorizontal: 2,

                    }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableBtn: {
        ...globalStyles.primaryTouchableBtn,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 5
    },
    modalViewContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 500,
        padding: 10,
        paddingTop: 40,
        paddingBottom: 40,
        width: '85%',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowColor: 'black',
        elevation: 10

    }
})

export default ModalView
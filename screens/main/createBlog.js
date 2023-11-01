import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import globalStyles from '../../utils/globalStyles';
import { auth, firestore, firebase } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { doc, getDoc } from 'firebase/firestore';

const CreateBlog = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImg, setCoverImg] = useState(null);

    let id = route.params?.id;
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;

    useEffect(() => {
        if (id && uid) {
            getBlogData(id);
        }
    }, [id, uid]);
    const onUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setBlogImage(result.uri);
        }
    }




    function onCheck() {
        if (id) {
            onUpdate(id);
            return;
        }
        onCreate();
    }
    function getBlogData(id) {
        const blogDocRef = doc(collection(firestore, 'usersBlog', uid, 'blogs'), id);
        getDoc(blogDocRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setTitle(data.title);
                setContent(data.content);
                setCoverImg(data.coverImage);
            }
        });
    }


    const upladCoverImg = async (uid) => {

        try {

            if (coverImg) {
                try {
                    const { uri } = await FileSystem.getInfoAsync(coverImg)
                    const blob = await new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            resolve(xhr.response)
                        }
                        xhr.onerror = (e) => {
                            reject(new TypeError('Network request failed'))
                        }
                        xhr.responseType = 'blob';
                        xhr.open('GET', uri, true)
                        xhr.send(null)
                    })
                    const filename = coverImg.substring(coverImg.lastIndexOf('/') + 1)
                    const ref = firebase.storage().ref().child(filename)
                    await ref.put(blob)
                    // Get the download URL of the uploaded image
                    imageUrl = await ref.getDownloadURL();

                } catch (e) {
                    console.log(e)
                }

            }
        } catch (e) {
            console.log(e)
        }
    }


    const onCreate = async () => {
        if (!title && !content) {
            return false;
        }
        navigation.navigate('Home');


        try {
            const docRef = await addDoc(collection(firestore, 'usersBlog', uid, 'blogs'), {
                title,
                content,
                coverImage: downloadURL,
                createdAt: serverTimestamp(),
            });

            // Clear form fields after creating the blog
            setTitle('');
            setContent('');
            setCoverImg(null);
        } catch (error) {
            console.log(error);
        }
    }



    const onUpdate = async (id) => {
        navigation.navigate('Home');
        try {
            let downloadURL = oldCoverImageURL;

            if (oldCoverImageURL !== coverImg) {
                // Use storage.put method for uploading the image to Firebase Storage
                const storageRef = ref(storage, 'images/' + id); // Update the path as needed
                await uploadBytes(storageRef, coverImgBlob); // Make sure coverImgBlob is a Blob or Uint8Array containing the image data
                downloadURL = await getDownloadURL(storageRef);
            }

            // Update the document in Firestore
            const blogDocRef = doc(collection(firestore, 'usersBlog', uid, 'blogs'), id);
            await updateDoc(blogDocRef, {
                title,
                content,
                coverImage: downloadURL,
                lastUpdate: serverTimestamp(),
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ScrollView
            style={globalStyles.primaryContainer}
            keyboardShouldPersistTaps={'always'}
        >
            <Text style={{ ...globalStyles.headingText, margin: 10 }}>Create A Blog</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={2}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Content</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={10}
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Image style={styles.image} source={{ uri: coverImg }} resizeMode="cover" />
                <TouchableOpacity style={[styles.touchabelBtn, globalStyles.uploadBtn]} onPress={onUploadImage}>
                    <Text style={globalStyles.btnText}>Upload Cover Image</Text>
                </TouchableOpacity>
            </View>
            <FontAwesome
                name="check-circle"
                color="purple"
                size={44}
                style={styles.uploadBtn}
                onPress={onCheck}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 2,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        margin: 10,
        fontFamily: 'Nunito-Regular',
    },
    touchabelBtn: {
        ...globalStyles.primaryTouchableBtn,
        width: 200,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    uploadBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 10,
    },
});

export default CreateBlog;

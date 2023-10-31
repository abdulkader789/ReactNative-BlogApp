// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../../firebaseConfig';

// const Home = ({ route }) => {
//     const { user } = route.params;
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userDocRef = doc(firestore, 'users', user.uid);
//                 const userDocSnapshot = await getDoc(userDocRef);
//                 if (userDocSnapshot.exists()) {
//                     setUserData(userDocSnapshot.data());
//                 } else {
//                     console.log('User data not found in Firestore');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();

//         return () => {
//             // Cleanup if necessary
//         };
//     }, [user]);

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {userData ? (
//                 <>
//                     <Text>Welcome, {userData.name}</Text>
//                     <Text>Email: {user.email}</Text>
//                 </>
//             ) : (
//                 <Text>Loading user data...</Text>
//             )}
//         </View>
//     );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import { Image, Text, Button, TextInput, StyleSheet, TouchableOpacity, View, Modal } from 'react-native';
import globalStyles from '../../utils/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore, firebase } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';


const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState([])
    const getBlogData = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'usersBlog', auth().currentUser.uid, 'blogs'));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };
    useEffect(() => {
        getBlogData()
    }, [])
    return (
        <View style={globalStyles.primaryContainer}>
            <Modal
                visible={modalOpen}
                animationType='fade'
                transparent={true}
            >
                {/* <ModalView>

                </ModalView> */}

            </Modal>
            <View style={styles.header}>
                <Text style={globalStyles.headingText}>My Blogs</Text>
            </View>
            <View style={styles.addIcon}>
                <Icon name="plus" size={25} color="white" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    addIcon: {
        position: 'absolute',
        bottom: 20,
        left: '45%',
        zIndex: 1,
        elevation: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 60,
        height: 60
    },

})

export default Home;

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const Home = ({ route }) => {
    const { user } = route.params;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(firestore, 'users', user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    setUserData(userDocSnapshot.data());
                } else {
                    console.log('User data not found in Firestore');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        return () => {
            // Cleanup if necessary
        };
    }, [user]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {userData ? (
                <>
                    <Text>Welcome, {userData.name}</Text>
                    <Text>Email: {user.email}</Text>
                    {/* Display other user data as needed */}
                </>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

export default Home;

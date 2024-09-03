import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/Firebase';

const Reviews = ({ item }) => {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');

    const onSubmit = async () => {
        if (!item || !item.id) {
            ToastAndroid.show('Invalid item ID', ToastAndroid.BOTTOM);
            return;
        }

        if (!userInput.trim()) {
            ToastAndroid.show('Comment cannot be empty', ToastAndroid.BOTTOM);
            return;
        }

        try {
            const docRef = doc(db, 'businessList', item.id);
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    rating: rating,
                    comment: userInput,
                }),
            });
            ToastAndroid.show('Comment added successfully', ToastAndroid.BOTTOM);
            setUserInput('');
            setRating(4);
        } catch (error) {
            console.error('Error adding review: ', error);
            ToastAndroid.show('Failed to add comment', ToastAndroid.BOTTOM);
        }
    };

    return (
        <View className='bg-gray-200' style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10 }}>
                Reviews
            </Text>
            
            <Rating
                onFinishRating={(rating) => setRating(rating)}
                ratingColor='#ff9d14' // Color for filled stars
                ratingBackgroundColor='#e0e0e0' // Color for unfilled stars
                ratingCount={5} // Number of stars
                imageSize={40} // Size of the stars
                style={{ paddingVertical: 10 }}
            />

            <TextInput
                placeholder='Write Your Comment'
                onChangeText={(value) => setUserInput(value)}
                value={userInput}
                numberOfLines={4}
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: 'gray',
                    padding: 10,
                    marginHorizontal: 17,
                    marginVertical: 5,
                    textAlignVertical: 'top'
                }}
            />

            <TouchableOpacity
                onPress={onSubmit}
                disabled={!userInput.trim()} 
                style={{
                    backgroundColor: !userInput.trim() ? Colors.primary : Colors.triple,
                    padding: 12,
                    marginHorizontal: 9,
                    borderRadius: 5,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Reviews;
    
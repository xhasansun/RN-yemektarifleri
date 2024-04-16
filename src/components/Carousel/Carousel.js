import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slick from 'react-native-slick';
import {COLORS} from '../../styles/colors'

const Carousel = () => {
    return (
        <View style={styles.container}>
            <Slick style={styles.wrapper} showsButtons={false} dotColor="#fff" activeDotColor='orange'>
                <View style={styles.slideWrapper}>
                    <Text style={styles.text}>Hello Slick</Text>
                </View>
                <View style={styles.slideWrapper}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slideWrapper}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Slick>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    wrapper: {
    },
    slideWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginHorizontal: 0,
        marginHorizontal: 1,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Carousel;

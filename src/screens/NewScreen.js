import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import WebView from 'react-native-webview'

import React from 'react'


const NewScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView source={{ uri: 'https://www.minibetonmikseri.com/' }} />
        </SafeAreaView>
    )
}

export default NewScreen

const styles = StyleSheet.create({})
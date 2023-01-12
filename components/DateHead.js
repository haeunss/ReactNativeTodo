import React from 'react';
import {View, Text, StyleSheet,StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DateHead({date}){
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    const {top} = useSafeAreaInsets();

    return(
        <>
            <View style={[styles.statusBarPlaceholder, {height: top}]} />
            <StatusBar backgroundColor="#FFB100"/>
            <View style={styles.block}>
                <Text style={styles.dateText}>
                    {year}년 {month}월 {day}일
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    statusBarPlaceholder:{
        backgroundColor: '#FFB100',
    },
    block:{
        padding: 16,
        backgroundColor: '#FFB100',
    },
    dateText:{
        fontSize:18,
        color: 'white'
    }
});

export default DateHead;
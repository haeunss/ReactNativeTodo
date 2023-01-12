import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

function Empty(){
    return (
        <View style={styles.block}>
             <Image 
                source={require('../assets/images/young_and_happy.png')} 
                style={styles.image} 
                />
            <Text style={styles.description}>할 일이 없습니다. 쉬세요!</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    block: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
    },
    image:{
        width:250,
        height:179,
        marginBottom:16,
    },
    description:{
        fontSize:24,
        color:'#9e9e9e',
    },
});

export default Empty;
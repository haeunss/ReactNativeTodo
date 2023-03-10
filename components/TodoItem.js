import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TodoItem({id, text, done, onToggle, onRemove}){
    const remove = () => {
        Alert.alert(
            '삭제',
            '정말로 삭제하시겠어요?',
            [
                {text: '취소', onPress: () => {}, style: 'cancel'},
                {
                  text: '삭제',
                  onPress: () => {
                    onRemove(id);
                  },
                  style: 'destructive',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {},
            },
        );
    };

    return(
        <View style={styles.item}>
            <TouchableOpacity onPress={() => onToggle(id)}>
                <View style={[styles.circle, done && styles.filled]}>
                    {done && (
                        <Image
                            source={require('../assets/icons/check_white/check_white.png')}
                        />
                    )}
                </View>
            </TouchableOpacity>
            <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
            {done ? (
                <TouchableOpacity onPress={remove}>
                  <Icon name="delete" size={32} color="#ccc" />
                </TouchableOpacity>
                ) : (
                  <View style={styles.removePlaceholder} />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      padding: 16,
      borderBottomColor: '#e0e0e0',
      alignItems: 'center',
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderColor: '#A3BB98',
      borderWidth: 1,
      marginRight: 16,
    },
    filled: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A3BB98',
    },
    text: {
      flex: 1,
      fontSize: 16,
      color: '#212121',
    }, //false 상태이면 적용할 스타일
    lineThrough: {
        color: '#9e9e9e',
        textDecorationLine: 'line-through',
    }, //true 상태이면 적용할 스타일
    removePlaceholder: {
        width: 32,
        height: 32,
    },
});

export default TodoItem;
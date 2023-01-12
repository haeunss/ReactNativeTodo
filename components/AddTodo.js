import React, {useState} from 'react';
import {
    View, 
    StyleSheet, 
    TextInput, 
    Image, 
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    Keyboard,
} from 'react-native';

function AddTodo({onInsert}) {
  const [text, setText] = useState('');
  
  const onPress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss();
  } //dismiss는 현재 나타난 키보드를 닫아줌

  const button=(
    <View style={styles.buttonStyle}>
        <Image source={require('../assets/icons/add_white/add_white.png')} />
    </View>
    )

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress}
        returnKeyType="done"
      />
      {/* onsubmitEditing은 enter눌렀을 때 호출되는 함수, returnKeyType는 enter타입을 지정해주는데 타입에 따라 enter부분에 보이는 설명 또는 아이콘이 바뀜 */}
      {Platform.select({
        ios:(
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                {button}
                </TouchableOpacity>
        ),
        android:(
            <View style={styles.circleWrapper}>
                <TouchableNativeFeedback onPress={onPress}>
                    {button}
                </TouchableNativeFeedback>
            </View>
        ),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    height: 64,
    paddingHorizontal: 16,
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#A3BB98',
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: 'hidden',
    borderRadius:24,
  }, //안드로이드 : 원안에서만 물결효과
});

export default AddTodo;
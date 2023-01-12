import React, {useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import todosStorage from './storages/todosStorage';

import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';

function App() {
  const today = new Date();
  const [todos, setTodos] = useState([
    {id:1, text:'작업환경 설정', done:true},
    {id:2, text:'리액트 네이티브 기초 공부', done:false},
    {id:3, text:'투두리스트 만들어보기', done:false},
  ]);

  useEffect(() => {
    todosStorage
      .get()
      .then(setTodos)
      .catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  useEffect(()=>{
    async function load(){
      try{
        const rawTodos = await AsyncStorage.getItem('todos');
        const saveTodos = JSON.parse(rawTodos);
        setTodos(saveTodos);
      }catch(e){
        console.log('Failed to load todos');
      }
    }
    load();
  },[]);

  useEffect(()=>{
    async function save(){
      try{
        await AsyncStorage.setItem('todos',JSON.stringify(todos));
      }catch(e){
        console.log('Failed to save todos');
      }
    }
    save();
  },[todos]);

  const onInsert = text => {
    //새로 등록할 항목의 id를 구함
    //todos배열에서 todo id를 찾아 새로운 배열을 만들고 가장 큰 id (최댓값) 를 구함 그 값에 1 더하기
    //list가 비어있으면 1을 id로 사용
    const nextId = 
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    //text:text가 아닌 이유
    //단축된 속성명이라는 문법 때문 text 값을 파라미터로 받아오고 있고 이를 객체의 text속성으로 사용하겠다는 의미
    //결국 text:text와 동일한 코드임
    const todo = {
      id:nextId,
      text,
      done:false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  }

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id != id);
    setTodos(nextTodos);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding'})} style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block:{
    flex:1,
  },
  avoid: {
    flex: 1,
  },
});

export default App;
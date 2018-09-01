import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import update from 'immutability-helper';
import { saveKey, getKey } from './AsyncStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff'
  },
  inputBox: {
    borderColor: 'darkgreen',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 10
  },
  inputText: {
    fontSize: 18
  },
  button: {
    marginBottom: 10,
    width: '50%',
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 5,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 30
  }
});

class TodayTasksScreen extends React.Component {
  state = {
    todayTitle: {
      todayFirst: '',
      todaySecond: '',
      todayThird: ''
    }
  };

  onPressButton() {
    this.props.navigation.goBack();
  }

  async saveItem(key, value) {
    const { todayTitle } = this.state;
    todayTitle[key] = value;
    this.setState({
      todayTitle
    });
    await AsyncStorage.setItem('todayTitle', JSON.stringify(todayTitle));
  }

  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        {/* <View style={{ borderWidth: 1, borderColor: 'red' }}> */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            onChangeText={value => this.saveItem('todayFirst', value)}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            onChangeText={value => this.saveItem('todaySecond', value)}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            onChangeText={value => this.saveItem('todayThird', value)}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>決定</Text>
          </View>
        </TouchableOpacity>
        {/* <Loading text="ログイン中" isLoading={this.state.isLoading} /> */}
      </View>
    );
  }
}

export default TodayTasksScreen;

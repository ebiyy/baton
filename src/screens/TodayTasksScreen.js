import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

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
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 5,
    color: 'white'
  }
});

class TodayTasksScreen extends React.Component {
  //   state = {
  //     email: 'い',
  //     text: ''
  //   };
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
    // this とかの処理を入れないとエラーになるので登録ボタンにする
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
            //   onChangeText={text => this.setState({ text })}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            //   onChangeText={text => this.setState({ text })}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            //   onChangeText={text => this.setState({ text })}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <TouchableOpacity onPress={this.onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </View>
        </TouchableOpacity>
        {/* <Loading text="ログイン中" isLoading={this.state.isLoading} /> */}
        <Text style={styles.title}>{email}</Text>
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text
            .split(' ')
            .map(word => word && '🍕')
            .join(' ')}
        </Text>
      </View>
    );
  }
}

export default TodayTasksScreen;

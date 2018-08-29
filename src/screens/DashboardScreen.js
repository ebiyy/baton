import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 24,
    backgroundColor: '#fff'
  },
  inputBox: {
    width: '80%',
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
    margin: 30,
    marginBottom: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 50
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 30
  },
  mainBox: {
    marginBottom: 20,
    backgroundColor: '#f2f2b0',
    padding: 50,
    borderRadius: 40
  },
  mainBoxStart: {
    backgroundColor: 'gray',
    padding: 50,
    borderRadius: 40
  },
  mainText: {
    fontSize: 100,
    color: 'orange',
    textShadowColor: '#ddd',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 8
  },
  mainTextStart: {
    fontSize: 100,
    color: 'white'
  }
});

class DashboardScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: true
  };

  onPressButton() {
    Alert.alert('You tapped the button!');
    // this とかの処理を入れないとエラーになるので登録ボタンにする
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainBox}>
          <View>
            <Text style={styles.mainText}>10日</Text>
            <Text style={{ fontSize: 40, alignSelf: 'center' }}>継続中</Text>
          </View>
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
        {/* <View style={styles.mainBoxStart}>
          <View>
            <Text style={styles.mainTextStart}>0日</Text>
            <Text style={{ fontSize: 40, alignSelf: 'center' }}>継続中</Text>
          </View>
        </View> */}
        {/* <TouchableOpacity onPress={this.onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>開始</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default DashboardScreen;

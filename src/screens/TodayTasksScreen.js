import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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
    text01: '',
    text02: '',
    text03: ''
  };

  onPressButton() {
    this.props.navigation.goBack();
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
            onChangeText={text01 => {
              this.setState({ text01 });
            }}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            onChangeText={text02 => {
              this.setState({ text02 });
            }}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            placeholder="１５文字以内で入力してください"
            onChangeText={text03 => {
              this.setState({ text03 });
            }}
            editable
            maxLength={15}
            underlineColorAndroid="#fff"
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>決定</Text>
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

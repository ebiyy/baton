import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Alert, Button, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#555555'
  },
  formButton: {
    borderWidth: 1,
    borderColor: '#555555'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5
  }
});

/**
 * AsyncStorageの指定のキーに値を保存する
 * @param {*} key キー
 * @param {*} value 保存する値
 */
async function saveKey(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error saving data${error}`);
  }
}

class AsyncStorageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myKey: null
    };
  }

  /**
   * AsyncStorageに指定のキーに格納されているデータを取得する
   * @param {*} key AsyncStorageのキー
   */
  async getKey(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      Alert.alert(value);
      this.setState({ myKey: value });
    } catch (error) {
      console.log(`Error retrieving data${error}`);
    }
  }

  /**
   * AsyncStorageの指定のキーに値を削除する
   * @param {*} key キー
   */
  async resetKey(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.getKey(key);
    } catch (error) {
      console.log(`Error resetting data${error}`);
    }
  }

  render() {
    const { myKey } = this.state;
    const dispKeyValue = `Stored key is =${myKey}`;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Demo AsyncStorage!</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter key you want to save!"
          defaultValue={myKey}
          onChangeText={value => saveKey('@MySuperStore:key', value)}
        />
        <Button
          style={styles.formButton}
          onPress={() => this.getKey('@MySuperStore:key')}
          title="Get Key"
          color="#2196f3"
          accessibilityLabel="Get Key"
        />
        <Button
          style={styles.formButton}
          onPress={() => this.resetKey('@MySuperStore:key')}
          title="Reset"
          color="#f44336"
          accessibilityLabel="Reset"
        />
        <Text style={styles.instructions}>{dispKeyValue}</Text>
      </View>
    );
  }
}

export default AsyncStorageScreen;

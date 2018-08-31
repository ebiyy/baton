import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
  AsyncStorage
} from 'react-native';
import Expo from 'expo';
import Modal from 'react-native-modal';
import { Card } from 'react-native-elements';
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#40826D',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginBottom: 10,
    paddingLeft: 15
  },
  inputText: {
    fontSize: 18,
    color: 'white'
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 30
  },
  mainBox: {
    marginBottom: 20,
    backgroundColor: '#fff0005c',
    padding: 35,
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
    textShadowColor: 'pink',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 3
  },
  mainTextStart: {
    fontSize: 100,
    color: 'white'
  },
  button: {
    margin: 30,
    marginBottom: 10,
    width: 150,
    borderRadius: 50
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
  modalContent: {
    backgroundColor: 'lightblue',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});

class DashboardScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: true,
    visibleModal: null
  };

  async componentDidMount() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('エラー');
        // ...
      });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });
        db.enablePersistence()
          .then(() => {
            // Initialize Cloud Firestore through firebase
          })
          .catch(err => {
            if (err.code === 'failed-precondition') {
              // Multiple tabs open, persistence can only be enabled
              // in one tab at a a time.
              // ...
            } else if (err.code === 'unimplemented') {
              // The current browser does not support all of the
              // features required to enable persistence
              // ...
            }
          });

        // ...
      } else {
        // User is signed out.
        // ...
      }
      // ...
    });
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
    // this とかの処理を入れないとエラーになるので登録ボタンにする
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Card title="Sponsored Link">
        <Text>目標達成サポート商品</Text>
        <Text>PotencialSecret~潜在意識活用マニュアル~は必要ですか？</Text>
        <Text>やる気が出ないのは潜在意識が邪魔しているせいかも・・・</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {this.renderButton('必要ない', () => {
            this.setState({ visibleModal: null });
            this.props.navigation.navigate('TodayTasks');
          })}
          {this.renderButton('必要かも', () => {
            this.setState({ visibleModal: null });
            Linking.openURL(***REMOVED***);
          })}
        </View>
      </Card>
    </View>
  );

  render() {
    const { height, width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        {/* <View style={styles.mainBox}>
          <View>
            <Text style={[styles.mainText, { fontSize: width / 3.8 }]}>10日</Text>
            <Text style={{ fontSize: 20, alignSelf: 'center' }}>連続継続中</Text>
          </View>
        </View>
        <View style={styles.inputBox}>
          <TouchableOpacity onPress={this.onPressButton}>
            <Text style={styles.inputText}>声を少し張って訊き返されない！</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <TouchableOpacity onPress={this.onPressButton}>
            <Text style={styles.inputText}>感覚的に話さない！</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputBox}>
          <TouchableOpacity onPress={this.onPressButton}>
            <Text style={styles.inputText}>ついつい食べ過ぎない！</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.mainBoxStart}>
          <View>
            <Text style={styles.mainTextStart}>0日</Text>
            <Text style={{ fontSize: 40, alignSelf: 'center' }}>継続中</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: 2 })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>開始</Text>
          </View>
        </TouchableOpacity>

        {/* {this.renderButton('開始', () => this.setState({ visibleModal: 2 }))} */}
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          onBackdropPress={() => this.setState({ visibleModal: false })}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }
}

export default DashboardScreen;

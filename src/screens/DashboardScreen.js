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

async function firebaseAuth() {
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

      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });
}

/**
 * AsyncStorage保存先キー
 */
const AS_KEY = {
  // 今日の目標
  TODAY_TITLE: 'todayTitle',
  // 今日の各目標
  TITLE: ['todayFirst', 'todaySecond', 'todayThird']
};

class DashboardScreen extends React.Component {
  constructor() {
    super();
    // androidのタイマー不具合非表示（対策がないため）
    console.ignoredYellowBox = ['Setting a timer'];
  }

  state = {
    isTodayData: false,
    isGetData: false,
    isLoading: true,
    visibleModal: null,
    todayTitle: {}
  };

  componentDidMount() {
    firebaseAuth();
  }

  onPressButton() {
    Alert.alert('You tapped the button!');
    // this とかの処理を入れないとエラーになるので登録ボタンにする
  }

  /**
   *今日の目標をAsyncStorageから取得
   *
   * @memberof DashboardScreen
   */
  setTodayTitle() {
    AsyncStorage.getItem(AS_KEY.TODAY_TITLE).then(value => {
      this.setState({
        isGetData: true
      });
      if (value) {
        const todayTitle = JSON.parse(value);
        this.setState({
          isTodayData: true,
          todayTitle
        });
      }
    });
  }

  /**
   *モーダルコンテンツ
   *
   * @memberof DashboardScreen
   */
  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Card title="Sponsored Link">
        <Text>目標達成サポート商品</Text>
        <Text>PotencialSecret~潜在意識活用マニュアル~は必要ですか？</Text>
        <Text>やる気が出ないのは潜在意識が邪魔しているせいかも・・・</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {this.renderButton('必要ない', () => {
            const { navigation } = this.props;
            this.setState({ visibleModal: null });
            navigation.navigate('TodayTasks');
          })}
          {this.renderButton('必要かも', () => {
            this.setState({ visibleModal: null });
            Linking.openURL(***REMOVED***);
          })}
        </View>
      </Card>
    </View>
  );

  /**
   *モーダルフッターボタンエレメント
   *
   * @memberof DashboardScreen
   */
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * 各目標表示
   *
   * @param {*} title 各目標
   * @returns 各目標表示エレメント
   * @memberof DashboardScreen
   */
  todayTitleGenerator(title) {
    return (
      <View style={styles.inputBox}>
        <TouchableOpacity onPress={this.onPressButton}>
          <Text style={styles.inputText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 目標出力コンテンツ
   *
   * @returns 目標コンテンツ
   * @memberof DashboardScreen
   */
  renderTodayTitleContent() {
    const { todayTitle } = this.state;
    const { TITLE } = AS_KEY;
    return (
      <View style={{ width: '100%' }}>
        {this.todayTitleGenerator(todayTitle[TITLE[0]])}
        {this.todayTitleGenerator(todayTitle[TITLE[1]])}
        {this.todayTitleGenerator(todayTitle[TITLE[2]])}
      </View>
    );
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { isTodayData, visibleModal, isGetData } = this.state;
    // AsyncStorageから今日の目標を取得、取得後にisGetDataはfalseになる
    if (!isGetData) {
      this.setTodayTitle();
    }
    // 今日の目標、取得フラグ
    // true: 目標表示、 false: 目標設定表示
    if (isTodayData) {
      return (
        <View style={styles.container}>
          <View style={styles.mainBox}>
            <View>
              <Text style={[styles.mainText, { fontSize: width / 3.8 }]}>10日</Text>
              <Text style={{ fontSize: 20, alignSelf: 'center' }}>連続継続中</Text>
            </View>
          </View>
          {this.renderTodayTitleContent()}
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.mainBoxStart}>
          <View>
            <Text style={styles.mainTextStart}>0日</Text>
            <Text style={{ fontSize: 40, alignSelf: 'center' }}>継続中</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.setState({ visibleModal: true })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>開始</Text>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={visibleModal === true}
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

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
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    backgroundColor: '#265366',
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
  static navigationOptions = () => ({
    headerTitle: '今日の目標！'
  });

  constructor(props) {
    super(props);
    // androidのタイマー不具合非表示（対策がないため）
    console.ignoredYellowBox = ['Setting a timer'];
  }

  state = {
    isTodayData: false,
    isGetData: false,
    isLoading: true,
    visibleModal: null,
    todayTitle: {},
    complete: {
      [AS_KEY.TITLE[0]]: false,
      [AS_KEY.TITLE[1]]: false,
      [AS_KEY.TITLE[2]]: false
    }
  };

  componentDidMount() {
    firebaseAuth();
  }

  /**
   * 目標達成完了トグルメソッド
   * @param {number} index 目標のインデックス
   */
  onPressButton(index) {
    const { complete } = this.state;
    const { TITLE } = AS_KEY;
    complete[TITLE[index]] = !complete[TITLE[index]];
    this.setState(complete);
  }

  /**
   *今日の目標をAsyncStorageから取得
   *
   * @memberof DashboardScreen
   */
  setTodayTitle() {
    // for debug
    // AsyncStorage.removeItem(AS_KEY.TODAY_TITLE);
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
   * stateを更新するメソッド
   * ナビゲーションに渡して遷移先でここのstateを更新する
   * @param {string} key stateのキー
   * @param {any} value 格納する値
   */
  updateState(key, value) {
    this.setState({ [key]: value });
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
            navigation.navigate('TodayTasks', {
              updateState: (key, value) => this.updateState(key, value)
            });
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
  todayTitleGenerator(index) {
    const { TITLE } = AS_KEY;
    const { inputBox } = styles;
    const { complete } = this.state;
    let color = '#265366';
    if (complete[TITLE[index]]) {
      color = '#DDD';
    }
    return (
      <View style={[inputBox, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => this.onPressButton(index)}>
          {this.toggleCheakMark(TITLE[index])}
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 完了マークをプッシュ判定し、目標エレメント作成
   * @param {string} key completeのキー
   */
  toggleCheakMark(key) {
    const { todayTitle, complete } = this.state;
    if (complete[key]) {
      return (
        <Text style={styles.inputText}>
          <Icon name="check-circle" size={25} color="#265366" />
          &nbsp;&nbsp;
          {todayTitle[key]}
        </Text>
      );
    }
    return <Text style={styles.inputText}>{todayTitle[key]}</Text>;
  }

  /**
   * 目標出力コンテンツ
   *
   * @returns 目標コンテンツ
   * @memberof DashboardScreen
   */
  renderTodayTitleContent() {
    return (
      <View style={{ width: '100%' }}>
        {this.todayTitleGenerator(0)}
        {this.todayTitleGenerator(1)}
        {this.todayTitleGenerator(2)}
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

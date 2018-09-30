import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

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

interface TodayTasksScreenState {
  todayTitle: todayTitle;
}

export interface todayTitle {
  [key: string]: string;
  todayFirst: string;
  todaySecond: string;
  todayThird: string;
}

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class TodayTasksScreen extends React.Component<HomeScreenProps, object> {
  static navigationOptions = () => ({
    headerTitle: '明日の自分に挑戦！'
  });

  state: TodayTasksScreenState = {
    todayTitle: {
      todayFirst: '',
      todaySecond: '',
      todayThird: ''
    }
  };

  componentDidMount() {}

  onPressButton() {
    const { navigation } = this.props;
    navigation.state.params.updateState('isGetData', false);
    navigation.state.params.resetComplete();
    navigation.goBack();
  }

  async saveItem(key: string, value: string) {
    const { todayTitle } = this.state;
    todayTitle[key] = value;
    this.setState({ todayTitle });
    await AsyncStorage.setItem('todayTitle', JSON.stringify(this.state));
  }

  render() {
    return (
      <ScrollView>
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
              placeholder="１５文字以内で入力してください"
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
              this.onPressButton();
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>決定</Text>
            </View>
          </TouchableOpacity>
          {/* <Loading text="ログイン中" isLoading={this.state.isLoading} /> */}
        </View>
      </ScrollView>
    );
  }
}

export default TodayTasksScreen;

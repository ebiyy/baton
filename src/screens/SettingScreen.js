import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Image,
  Picker
} from 'react-native';
import { List, ListItem, Divider } from 'react-native-elements';

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});

/**
 * pickerItem 生成
 */
function generatorPicker() {
  const elements = [];
  for (let i = 0; i < 24; i += 1) {
    elements.push(<Picker.Item key={i} label={i.toString()} value={i} />);
  }
  return elements;
}

class SettingScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: '設定'
  });

  state = {
    limitHour: {
      startTime: null,
      endTime: null
    }
  };

  componentWillMount() {
    //
    let { limitHour } = this.state;
    AsyncStorage.getItem('limitHour').then(value => {
      if (!value) {
        limitHour = { startTime: 18, endTime: 3 };
      } else {
        limitHour = JSON.parse(value);
      }
      this.setState({ limitHour });
    });
  }

  componentDidMount() {}

  /**
   * Pickerの値が変わった時、limitHourをアップデート
   * @param {*} limitHour
   */
  update(limitHour) {
    this.setState({ limitHour });
    const { navigation } = this.props;
    navigation.state.params.updateState('limitHour', limitHour);
    AsyncStorage.setItem('limitHour', JSON.stringify(limitHour));
  }

  render() {
    const { limitHour } = this.state;
    const { startTime, endTime } = limitHour;
    const timeText = `集計時間設定    ${startTime}時 から ${endTime}時まで`;
    return (
      <View>
        <View>
          <ListItem title="ユーザーポリシー" />
        </View>
        <View>
          <ListItem roundAvatar title={timeText} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={startTime}
              onValueChange={itemValue => {
                limitHour.startTime = itemValue;
                this.update(limitHour);
              }}
            >
              {generatorPicker()}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={endTime}
              onValueChange={itemValue => {
                limitHour.endTime = itemValue;
                this.update(limitHour);
              }}
            >
              {generatorPicker()}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingScreen;

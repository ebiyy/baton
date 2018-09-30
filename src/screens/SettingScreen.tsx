import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Picker,
  NativeSyntheticEvent,
  TextInputScrollEventData
} from 'react-native';
import { ListItem, Divider, Text } from 'react-native-elements';
import Modal, { ModalProps } from 'react-native-modal';
import { NavigationScreenProp } from 'react-navigation';

const styles = StyleSheet.create({
  rivider: {
    backgroundColor: '#265366',
    marginVertical: 15
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
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
  msgSubTitle: {
    fontSize: 20,
    marginBottom: 7,
    fontWeight: 'bold'
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

interface State {
  limitHour: LimitHour;
  visibleModal: boolean;
  scrollOffset: number | undefined;
}

interface LimitHour {
  startTime: number | null;
  endTime: number | null;
}

export interface Props {
  navigation: NavigationScreenProp<any, any>;
}

class SettingScreen extends React.Component<Props, State> {
  static navigationOptions = () => ({
    headerTitle: '設定'
  });

  state: State = {
    limitHour: {
      startTime: null,
      endTime: null
    },
    visibleModal: false,
    scrollOffset: undefined
  };

  constructor(props: Props, private scrollViewRef: ScrollView | null) {
    super(props);
  }

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

  // react-native-modal/Example.js at master · react-native-community/react-native-modal - https://goo.gl/DuzvHQ
  // 上記参考コード、他も（モーダルスクロール）
  renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  handleOnScroll = (event: NativeSyntheticEvent<TextInputScrollEventData>) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  handleScrollTo = (p: { animated: boolean; y: number }) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  /**
   * Pickerの値が変わった時、limitHourをアップデート
   * @param {*} limitHour
   */
  update(limitHour: LimitHour) {
    this.setState({ limitHour });
    const { navigation } = this.props;
    navigation.state.params.updateState('limitHour', limitHour);
    AsyncStorage.setItem('limitHour', JSON.stringify(limitHour));
  }

  render() {
    const { limitHour, visibleModal, scrollOffset } = this.state;
    const { startTime, endTime } = limitHour;
    const timeText = `集計時間設定    ${startTime}時 から ${endTime}時まで`;
    return (
      <View>
        {/* renderButtonを使う */}
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ visibleModal: true });
            }}
          >
            <ListItem title="プライバシーポリシー" />
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: '#265366' }} />
        <View>
          <ListItem title={timeText} />
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
        <Modal
          isVisible={visibleModal}
          onSwipe={() => this.setState({ visibleModal: false })}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={scrollOffset}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          style={styles.bottomModal}
        >
          <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 10 }}>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={16}
              style={{ margin: 10 }}
            >
              {this.renderButton('閉じる', () => {
                this.setState({ visibleModal: false });
              })}
              <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5 }}>
                プライバシーポリシー
              </Text>
              <Text>batonは、日々の目標の達成度を記録するモバイルアプリケーションです。</Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>個人情報保護方針</Text>
              <Text>
                以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、個人情報保護の重要性と認識と取り組みを徹底することにより、個人情報の保護を推進いたします。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>個人情報の管理</Text>
              <Text>
                ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏えいなどを防止するため、セキュリティシステムの維持・管理の徹底等の必要な措置を講じ、安全対策を実施し、個人情報の厳重な管理を行います。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>個人情報の利用目的</Text>
              <Text>
                アプリ利用には、メールアドレスとパスワードによる登録が必要になることを予定しています。この認証情報は、ユーザーがアプリを利用することを可能にする目的以外では利用いたしません。メールアドレスに関しましては、アプリ運営からのご連絡やご案内に使用する場合がございます。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>個人情報の第三者への開示・提供の禁止</Text>
              <Text>
                当アプリは運営は、ユーザーよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合いを除き、個人情報を第三者に開示いたしません。
                {'\n'}
                ・ユーザーの同意がある場合
                {'\n'}
                ・ユーザーが希望されるサービスを行うために当社が業務を委託する業者に対して開示する場合
                {'\n'}
                ・法令に基づき開示することが必要な場合
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>個人情報の安全対策</Text>
              <Text>
                個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じます。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>ご本人の照会</Text>
              <Text>
                ユーザーがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>法令、規範の遵守と見直し</Text>
              <Text>
                保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
              </Text>
              <Divider style={styles.rivider} />
              <Text style={styles.msgSubTitle}>お問い合わせ</Text>
              <Text>
                個人情報の取り扱いに関するお問い合わせは、 mankutsuu – at – gmail.com
                までご連絡ください。
              </Text>
              <Divider style={styles.rivider} />
              {this.renderButton('閉じる', () => {
                this.setState({ visibleModal: false });
              })}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SettingScreen;

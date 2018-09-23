import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, NetInfo } from 'react-native';
import { Svg } from 'expo';
import { ListItem, Divider } from 'react-native-elements';
import firebase from 'firebase';

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
  },
  batonItemContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    marginLeft: 10
  },
  batItemContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    marginLeft: 10,
    backgroundColor: '#ddd'
  }
});

class HistoryScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: '達成履歴'
  });

  state = {
    margeData: []
  };

  componentDidMount() {
    this.margeData();
  }

  generatorAvatar() {
    const { Path, G } = Svg;
    return (
      <Svg width="20" height="20" viewBox="10 -20 100 100">
        <G transform="translate(50 50) scale(1 1) rotate(0) translate(-50 -50)" fill="#34C8FF">
          <Path d="M58.3,31L46.1,18.8c0-4,4.1-8,8-8L66.3,23L58.3,31z M101,82c9.8-1.6,14.7-6.5,16.3-16.3L55.2,3.6  c-9.8,1.6-14.7,6.5-16.3,16.3L101,82z M74.1-13.6c-2.8-1.6-2.8-1.6-4.4,1.2L68-9.6c-1.6,2.9-1.6,2.9,1.2,4.5L72-3.4  c2.8,1.6,2.8,1.6,4.4-1.2l1.6-2.8c1.6-2.8,1.6-2.8-1.2-4.4L74.1-13.6z M91.8,16.3h-3.3c-3.3,0-3.3,0-3.3,3.3v3.3  c0,3.3,0,3.3,3.3,3.3h3.3c3.3,0,3.3,0,3.3-3.3v-3.3C95.1,16.3,95.1,16.3,91.8,16.3z M57.5-18h-3.3C51-18,51-18,51-14.7v3.3  c0,3.3,0,3.3,3.3,3.3h3.3c3.3,0,3.3,0,3.3-3.3v-3.3C60.8-18,60.8-18,57.5-18z M37.7-13.6l-2.9,1.6c-2.8,1.6-2.8,1.6-1.2,4.4l1.6,2.8  c1.6,2.9,1.6,2.9,4.4,1.2l2.9-1.6c2.8-1.6,2.8-1.6,1.2-4.5l-1.6-2.8C40.5-15.2,40.5-15.2,37.7-13.6z M27.2-1  c-2.8-1.6-2.8-1.6-4.4,1.2L21.1,3c-1.6,2.8-1.6,2.8,1.2,4.4l2.8,1.6c2.9,1.6,2.9,1.6,4.5-1.2l1.6-2.9c1.6-2.8,1.6-2.8-1.2-4.4  L27.2-1z M23.2,16.3h-3.3c-3.3,0-3.3,0-3.3,3.3v3.3c0,3.3,0,3.3,3.3,3.3h3.3c3.3,0,3.3,0,3.3-3.3v-3.3  C26.5,16.3,26.5,16.3,23.2,16.3z M57.5,50.6h-3.3c-3.3,0-3.3,0-3.3,3.3v3.3c0,3.3,0,3.3,3.3,3.3h3.3c3.3,0,3.3,0,3.3-3.3v-3.3  C60.8,50.6,60.8,50.6,57.5,50.6z M25.1,33.3l-2.8,1.6c-2.8,1.6-2.8,1.6-1.2,4.4l1.6,2.9c1.6,2.8,1.6,2.8,4.4,1.2l2.8-1.6  c2.9-1.6,2.9-1.6,1.2-4.4l-1.6-2.9C28,31.7,28,31.7,25.1,33.3z M39.7,45.9c-2.8-1.6-2.8-1.6-4.4,1.2l-1.6,2.8  c-1.6,2.8-1.6,2.8,1.2,4.4l2.9,1.6c2.8,1.6,2.8,1.6,4.4-1.2l1.6-2.8c1.6-2.9,1.6-2.9-1.2-4.5L39.7,45.9z M84.6-1l-2.8,1.6  c-2.9,1.6-2.9,1.6-1.2,4.4l1.6,2.9c1.6,2.8,1.6,2.8,4.5,1.2l2.8-1.6c2.8-1.6,2.8-1.6,1.2-4.4L89,0.2C87.4-2.6,87.4-2.6,84.6-1z" />
        </G>
      </Svg>
    );
  }

  renderBatonTitle = (title, i) => (
    <ListItem
      titleStyle={{ fontWeight: 'bold' }}
      containerStyle={styles.batonItemContent}
      key={i}
      leftAvatar={this.generatorAvatar()}
      title={title}
    />
  );

  renderBatTitle = (title, i) => (
    <ListItem
      containerStyle={styles.batItemContent}
      key={i}
      leftIcon={{ name: 'block', size: 18 }}
      title={title}
    />
  );

  async margeData() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;
    const { data } = navigation.state.params;
    const fbData = [];
    let { margeData } = this.state;
    margeData = [];
    await NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === 'none') {
        // console.warn(data);
        // console.warn(connectionInfo.type);
        margeData = data;
        this.setState({ margeData });
      } else {
        db.settings({ timestampsInSnapshots: true });
        // console.warn(currentUser.uid);
        db.collection(`users/${currentUser.uid}/todayTitle`)
          .orderBy('createOn', 'desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              fbData.push(doc.data());
            });
            if (fbData.length > 0) {
              const noSaved =
                data.length > 0 ? fbData.filter(fb => data.every(d => fb.date !== d.date)) : [];
              margeData = noSaved.concat(fbData);
              this.pushFirebase(noSaved);
            } else {
              margeData = data;
              this.pushFirebase(data);
            }
            this.setState({ margeData });
          })
          .catch(error => {
            // console.warn(error);
          });
      }
    });
  }

  pushFirebase(data) {
    // console.log(data);
    // debug用、ありえないケース
    if (data.length === 0) {
      const { navigation } = this.props;
      navigation.state.params.updateState('data', []);
      AsyncStorage.setItem('data', JSON.stringify([]));
    }
    data.map(item => {
      const db = firebase.firestore();
      const { currentUser } = firebase.auth();
      const { todayTitle, complete, date } = item;
      db.collection(`users/${currentUser.uid}/todayTitle`)
        .add({
          todayTitle,
          complete,
          createOn: new Date(),
          date
        })
        .then(() => {
          const { navigation } = this.props;
          navigation.state.params.updateState('data', []);
          AsyncStorage.setItem('data', JSON.stringify([]));
        })
        .catch(error => {
          // console.warn(error);
        });
    });
  }

  renderListItem(item, i) {
    const elements = [];
    elements.push(
      <View key={0}>
        <Divider style={{ backgroundColor: '#265366' }} />
        <ListItem title={item.date} />
        <Divider style={{ backgroundColor: '#265366' }} />
      </View>
    );
    Object.keys(item.complete).forEach((key, index) => {
      if (item.complete[key]) {
        elements.push(this.renderBatonTitle(item.todayTitle[key], index + 1));
      } else {
        elements.push(this.renderBatTitle(item.todayTitle[key], index + 1));
      }
    });
    return (
      <View style={{ marginBottom: 10 }} key={`data${i}`}>
        {elements}
      </View>
    );
  }

  render() {
    const { margeData } = this.state;
    return <ScrollView>{margeData.map((item, i) => this.renderListItem(item, i))}</ScrollView>;
  }
}

export default HistoryScreen;

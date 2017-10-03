/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { AppRegistry,StyleSheet,Text,TouchableOpacity, View, Image, Modal, TouchableHighlight, ScrollView} from 'react-native';
import {Container} from 'native-base';
import HideableView from 'react-native-hideable-view';
import {Fonts} from 'react-native-vector-icons';
import { Tabs, Tab, Icon , SocialIcon, Header} from 'react-native-elements';
import ExpandableList from 'react-native-expandable-section-flatlist';

import MapView from 'react-native-maps';

import MockData from './constants/mockData';
import DictStyle from './constants/dictStyle';

const styles = StyleSheet.create({
  ShuttleDetailWrapper: {
    backgroundColor: '#fff', 
    zIndex:190, 
    borderWidth: 1,
    borderColor: '#000',
  },
  ShuttleDetailHeaderText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    borderWidth:2,
    borderColor:'#f00',
    flex: 1,
    height: 500,
  },
  container: {
    flex: 1,
    position:'relative',
  },
  modalContainer:{
    flex:1, 
    flexDirection: 'column', 
    marginTop: 80, 
    backgroundColor:'rgb(198,201,204)'
  },
  modalCLoseIcon:{
    fontSize: 30, 
    fontWeight: 'bold', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalHeader: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth:1, 
    borderBottomColor:'#00f',
  }
});

export default class JHShuttleServiceApp extends Component {

  constructor(props){
    super(props);
  }
    
  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

    render() {
      return (
        <Container>
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{height: 78}}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={<JHLogoComponent />}
                rightComponent={<HeaderCustomComponent />}
                outerContainerStyles={{ backgroundColor: '#566AB5', height: 78}}
            />
          </View>
          <View>
            <MapComponent /> 
          </View>
      </View>
      </Container>
      );
    }
  }

  class MapComponent extends React.Component{
    render(){
      const initialRegion = {
        latitude: 22.5726,
        longitude: 88.3639,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }     
      return(
        <MapView style={styles.map}
          provider = {MapView.POOVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        </MapView>
      );
    }
  }

  class JHLogoComponent extends React.Component {
    render() {
      return (
        <View>
          <Image source={require('./assets/jhlogo_1.png')} style={{ width: 128, height: 41.9, top: 5}}/>
        </View>
      );
    }
  }

  class HeaderCustomComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          selectedTab: 'Time Table',
          modalVisible: false,
      };
    }
  
    setModalVisible(visible, selIcon) {
      this.setState({modalVisible: visible, selectedTab: selIcon});
    }

    render() {
      const { selectedTab } = this.state;
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
              <View>
                  <Icon
                        name='clock'
                        type='evilicon'
                        color='#fff'
                        underlayColor='#f00'
                        onPress={() => this.setModalVisible(true, 'Time Table')} 
                      />
              </View>
              <View>
                  <Icon
                        name='question'
                        type='evilicon'
                        color='#fff'
                        underlayColor='#f00'
                        onPress={() => this.setModalVisible(true, 'Information')} 
                      />
              </View>
              <View>
                  <Icon
                    name='bell'
                    type='evilicon'
                    color='#fff'
                    underlayColor='#f00'
                    onPress={() => alert('You will get intimated soon.') } 
                  />
              </View>
          </View>

          {/* Modal Window for Time Table and Information ~ Start */}
              <Modal
                  presentationStyle='overFullScreen'
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  onShow={() => {alert('Everything showed.')}}
              >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{borderBottomWidth:1, borderBottomColor:'#00f'}}>
                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, !this.state.selectedTab)
                          }}>
                          <Text style={styles.modalCLoseIcon}>&#x2039;</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={styles.modalHeader}>
                        <Text style={{fontSize: 21, fontWeight: 'normal', textAlign:'center'}}>{this.state.selectedTab}</Text>
                      </View>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>
                            {/*<Information />*/}
                            <TimeTable />
                    </View>
                </View>
            </Modal>
            {/* Modal Window for Time Table and Information ~ End */}

        </View>
      );
    }
  }
  
  class TimeTable extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          visible: true,
      };
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState({
          visible: !this.state.visible
      });
    }
  
      _renderRow = (rowItem, rowId, sectionId) => (
        <TouchableOpacity key={rowId} onPress={() => {}}>
          <View
            style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
              justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
              borderBottomColor: DictStyle.colorSet.lineColor }}
          >
              <View
                style={{ alignItems: 'center', margin: 5, padding: 5,
                  borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor }}
              >
                <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
                  {rowItem.title}
                </Text>
              </View>
              <View
                style={{ alignItems: 'center', margin: 5, padding: 5,
                  borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor }}
              >
                <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
                  {rowItem.title2}
                </Text>
              </View>
          </View>
        </TouchableOpacity>
      );
    
      _renderSection = (section, sectionId)  => {
        return (
          <View
            style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
              justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
              borderBottomColor: DictStyle.colorSet.lineColor }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
                {section}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: DictStyle.fontSet.xSize, color: DictStyle.colorSet.weakFontColor }}>
                {'Show'}
              </Text>
            </View>
          </View>
        );
      };
    

    render(){
      return (
        <ScrollView>
          <HideableView visible={this.state.visible} style={{position:'absolute', top:50, zIndex:30}}>
            <ExpandableList
              dataSource={MockData.workbenchData}
              headerKey="title"
              memberKey="member"
              renderRow={this._renderRow}
              renderSectionHeaderX={this._renderSection}
            />
          </HideableView>
        </ScrollView>
      );
    }
  }

  class Information extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    
    render() {
      return (
        <View style={styles.ShuttleDetailWrapper}>
            <Text style={styles.ShuttleDetailHeaderText} >
                Ø  All schedules are subject to road, traffic and weather conditions and may be changed as use and needs warrant.    
                Ø  PM Commuter passengers who want to be dropped at Aquarium T Sta. may request the State St driver do so, but the N Station buses cannot stop there.
                Ø   7:40 PM & 8:10 PM passengers should advise driver of their destination upon boarding the vehicle at 601
                Ø  During inclement weather, passengers may wait inside lobbies of 601 Congress or 380 Stuart St, but will need to watch for bus arrival outside & board before scheduled departure time. 
                Ø  The 5:05 Shuttle from 601 Congress to the Back Bay will drop off at the corner of Berleley and Stuart Streets. Outside of Grill 23
                Ø  For Wheelchair accessible transportation between Back Bay & 601 Congress, please contact Stephanie Nickerson at 617-663-4016 (x734016)
            
            </Text>
        </View>
      );
    }
  }

AppRegistry.registerComponent('JHShuttleServiceApp', () => JHShuttleServiceApp);

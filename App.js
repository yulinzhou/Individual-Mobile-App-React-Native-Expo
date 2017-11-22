import React, { Component } from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import DeepLinking from 'react-native-deep-linking';
import {Permissions,Notifications,Facebook} from 'expo';

import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  ScrollView,
  AppState,
  Platform,
  Alert,
  Linking,
  Image
} from 'react-native';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements'
const localNotification = {
    title: 'this is the notification',
    body: 'sample notification', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: false // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: false // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

 
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
import ListItem from  './components/ListItem';
const styles = require('./styles.js');

const firebaseConfig = {
  apiKey: "AIzaSyBgRCPw9-XZM80crn5pbnRouOJVuqzTlRk",
      authDomain: "myfirstprojectyulin.firebaseapp.com",
      databaseURL: "https://myfirstprojectyulin.firebaseio.com",
  storageBucket: "myfirstprojectyulin.appspot.com",
  projectId: "myfirstprojectyulin",
  messagingSenderId: "876436475164"

};

const schedulingOptions = {
    time: (new Date()).getTime() + 10000, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    repeat: 'day'
  };
  const today={
    todayDate: (new Date().getDate()),
    todayMonth: (new Date().getMonth()+1),
    todayYear: (new Date().getFullYear()),

  }
const firebaseApp = firebase.initializeApp(firebaseConfig);


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.itemsRef = firebaseApp.database().ref();
    console.log("items", this.itemsRef.key);
    this.state = {
      fortuneGod:'',
      loveGod:'',
      healthGod:'',
      luckGod:''
      };
   
  }



  getItems() {
    
    return firebase.database().ref('/gods').once('value').then((snapshot) => {
      const { fortuneGod,loveGod,healthGod,luckGod } = snapshot.val();
      console.log('updating state');
      this.setState({
        fortuneGod,loveGod,healthGod,luckGod
      });
    });
  }


  componentDidMount() {
    this.getItems()
    .then(() => console.log(this.state));

    console.log(this.state.bad);
       
  Permissions.askAsync(Permissions.NOTIFICATIONS);
  /*if (Constants.lisDevice && resut.status === 'granted') {
   console.log('Notification permissions granted.')
  }*/
    AppState.addEventListener('change', this.handleAppStateChange);

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState) {
    if (appState === 'background') {
      //let date = new Date(Date.now() + (this.state.seconds * 1000));
      /*if (Platform.OS === 'ios') {
        date = date.toISOString();
      }*/
      Notifications.scheduleLocalNotificationAsync(localNotification,schedulingOptions);
      Notifications.cancelAllScheduledNotificationsAsync();
    }
    Notifications.cancelAllScheduledNotificationsAsync();
   // Notifications.scheduleLocalNotificationAsync(localNotification,schedulingOptions);Notifications.cancelAllScheduledNotificationsAsync()
  }
  async logIn() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('121148121910097', {
      permissions: ['public_profile'],
      behavior: 'web'
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
  }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
      <Text style={styles.title}>                       Good Day!
      </Text>
      <Text color='black'>                       !
      </Text>
      <Text color='black'>                       !
      </Text>
      <Text style={styles.title}>Date:                   { today.todayDate} {today.todayMonth} {today.todayYear}
      </Text>
      <Text>

      </Text>
      <Text style={styles.title}>Fortune God:       {this.state.fortuneGod}
      </Text>
      <Text>
        
      </Text>
      <Text style={styles.title}>Luck God:            {this.state.luckGod}
      </Text>
      <Text>
        
      </Text>
      <Text style={styles.title}>Health God:         {this.state.healthGod}
      </Text>
      <Text>
        
      </Text>
      <Text style={styles.title}>Love God:            {this.state.loveGod}
      </Text>
      <Text color='black'> !
         </Text>
         <Text color='black'> !
         </Text>
         <Text color='black'> !
         </Text>
      <Button 

      style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
        title="Go to my profile"
        
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }>
      </Button>


        <Button
        style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
       title="Go to Today's fortune"
       onPress={() =>
         navigate('TodayFortune', { name: 'Today Fortune' })
       }
        />
        
        <Button
        style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
       title="My Chinese name"
       onPress={() =>
         navigate('ChineseName', { name: 'My Chinese Name' })
       }
        />
        </Image>
      </View>
      
       
    );
  }
}
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.test={
      content:'sample'};
    this.itemsRef = firebaseApp.database().ref();
    console.log("items", this.itemsRef.key);
    this.state = {
      chineseName:'',
      username:'',
      DOB:'',
      TOB:'',
      PinYin:'',
      Gender:'',
      Occ:'',
      Coin:0
      };
   
  }

  getItems() {
    
    return firebase.database().ref('/profile').once('value').then((snapshot) => {
      const { chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin } = snapshot.val();
      this.test.content=snapshot.val().username;
      console.log('updating state');
      this.setState({
        chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin
      });
      
      console.log('this is username'+this.test.content);
    });
    
  }

  componentDidMount() {
    this.getItems()
    .then(() => console.log(this.state));
     DeepLinking.addScheme('https://');
        Linking.addEventListener('url', this.handleUrl);
        DeepLinking.addRoute('/www.google.com.au', (response) => {
            // example://test 
            this.setState({ response });
          });
       
          DeepLinking.addRoute('/www.facebook.com', (response) => {
            // example://test/23 
            this.setState({ response });
          });
       
          DeepLinking.addRoute('/test/:id/details', (response) => {
            // example://test/100/details 
            this.setState({ response });
          });
       
          Linking.getInitialURL().then((url) => {
            if (url) {
              Linking.openURL(url);
            }
          }).catch(err => console.error('An error occurred', err));
    console.log(this.state.bad);
  }
  static navigationOptions = {
    title: 'Profile',
  };
   
 handleBD = (text) => {
    this.state.DOB=text
 }
 handleBT = (text) => {
    this.state.TOB=text
 }
 handleGender = (text) => {
  this.state.Gender=text
    
 }
 handleUN = (text) => {
  this.state.username=text
}
handleCN = (text) => {
  this.state.chineseName=text
}
handlePY = (text) => {
 this.state.PinYin=text 
}
 handleOcc = (text) => {
  this.state.Occ=text
}
updateProfile(){
  AlertIOS.alert(
    'profile updated'
   );
  var updates = {};
  updates['/profile' ] = this.state;
  console.log('updating profile');
  this.forceUpdate();
  return firebase.database().ref().update(updates);
}
componentWillUnmount() {
      Linking.removeEventListener('url', this.handleUrl);
    }
   
    
shareStory(){
 
     this.state.Coin=this.state.Coin+5;
     var updates = {};
     updates['/profile/Coin'] =this.state.Coin;
     Linking.openURL('https://www.facebook.com')
     console.log('updating profile');
     this.forceUpdate()
     return firebase.database().ref().update(updates);
  
}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
      <ScrollView>
        <Text style={styles.title}> username </Text>
        <TextInput style={styles.input}
          placeholder = {this.state.username} placeholderTextColor= 'white' onChangeText = {this.handleUN} />
          <Text style={styles.title}> Date of Birth </Text>
          <TextInput style={styles.input} 
          placeholder = {this.state.DOB} placeholderTextColor= 'white' onChangeText = {this.handleBD} />
          <Text style={styles.title}> Time of Birth </Text>
          <TextInput style={styles.input} 
          placeholder = {this.state.TOB} placeholderTextColor= 'white' onChangeText = {this.handleBT} />
          <Text style={styles.title}> Chinese Name </Text>
          <TextInput style={styles.input}
          placeholder =  {this.state.chineseName} placeholderTextColor= 'white' onChangeText = {this.handleCN} />
          <Text style={styles.title}> Gender </Text>
          <TextInput style={styles.input}
          placeholder = {this.state.Gender} placeholderTextColor= 'white' onChangeText = {this.handleGender} />
          <Text style={styles.title}> Occupation </Text>
          <TextInput style={styles.input}
          placeholder = {this.state.Occ} placeholderTextColor= 'white' onChangeText = {this.handleOcc} />
          <Text style={styles.title}>
          Wallet: {this.state.Coin} coins
          </Text>
         
        <Button
        style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
        title="Update Profile"
        onPress={() =>
           {this.updateProfile()
           }  
          }
  
      />
      <Button
      style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
       title="share a story in facebook and get 5 coins"     onPress={() =>(
         this.shareStory())
       }
        />
      </ScrollView>
      </Image>
      </View>
       
      
    );
  }
}
class ChineseNameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.itemsRef = firebaseApp.database().ref();
    
    console.log("items", this.itemsRef.key);
    this.state = {
      chineseName:'',
      username:'',
      DOB:'',
      TOB:'',
      PinYin:'',
      Gender:'',
      Occ:'',
      Coin:0
      };
      this.cName={
        Cmeaning:''
      }
    
  }
 
 
  static navigationOptions = {
    title: 'My Chinese Name',
  };
  setCN() {
    const { navigate } = this.props.navigation;
    ChineseNameGlobal='whatever';
    navigate('NameMeaning', { name: 'Name Meaning' })
  }

  getItems() {
    
    return firebase.database().ref('/profile').once('value').then((snapshot) => {
      const { chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin } = snapshot.val();
      console.log('updating state');
      this.setState({
        chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin
      });
    });
  }
  getMeaning() {
    return firebase.database().ref('/Cname').once('value').then((snapshot) => {
      const { Cmeaning } = snapshot.val();
      console.log('get name meaning');
      
      this.cName={
        Cmeaning
      }
      console.log(this.cName.Cmeaning);
      this.forceUpdate()
    });
  }
  componentDidMount() {
    this.getItems()
    .then(() => console.log(this.state));
    this.getMeaning()
    .then(() => console.log(this.state));

    console.log(this.state.bad);
  }
  getNewName(){
    const { navigate } = this.props.navigation;
    AlertIOS.alert(
      'this will cost 5 coins'
     );
     this.state.Coin=this.state.Coin-5;
     var updates = {};
     updates['/profile/Coin'] =this.state.Coin;
  
     console.log('updating profile');
     navigate('NameMeaning', { name: 'Name Meaning' })
     return firebase.database().ref().update(updates);
   
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
        <Text style={styles.title}> Your chinese name is   </Text>
        <Text>
  
      </Text>
      <Text style={styles.text}> {this.state.chineseName} </Text>
      <Text>
        
      </Text>  
          <Text style={styles.title}>Meaning</Text>
          <Text>
        
      </Text>
          <Text style={styles.text}> {this.cName.Cmeaning} </Text>
          <Text color= 'black'>!
          </Text>
          <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
         
        
      
          <Button
          style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 } 
          title="Get a new Chinese Name" onPress={() => 
           this.getNewName()
            }/>
            
              </Image>
            </View>
    );
  }
}



class EarnCoinsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    
    console.log("items", this.itemsRef.key);
    this.state = {
      chineseName:'',
      username:'',
      DOB:'',
      TOB:'',
      PinYin:'',
      Gender:'',
      Occ:'',
      Coin:0
      };
  }
  getItems() {
    
    return firebase.database().ref('/profile').once('value').then((snapshot) => {
      const { chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin } = snapshot.val();
      console.log('updating state');
      this.setState({
        chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin
      });
    });
  }
  componentDidMount(){  
    this.getItems()
    .then(() => console.log(this.state)); 
     DeepLinking.addScheme('https://');
    Linking.addEventListener('url', this.handleUrl);
    DeepLinking.addRoute('/www.google.com.au', (response) => {
        // example://test 
        this.setState({ response });
      });
   
      DeepLinking.addRoute('/www.facebook.com', (response) => {
        // example://test/23 
        this.setState({ response });
      });
   
      DeepLinking.addRoute('/test/:id/details', (response) => {
        // example://test/100/details 
        this.setState({ response });
      });
   
      Linking.getInitialURL().then((url) => {
        if (url) {
          Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));}
  
  componentWillUnmount() {
      Linking.removeEventListener('url', this.handleUrl);
    }
   
    handleUrl = ({ url }) => {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          DeepLinking.evaluateUrl(url);
        }
      });
    }
shareStory(){
 
     this.state.Coin=this.state.Coin+5;
     var updates = {};
     updates['/profile/Coin'] =this.state.Coin;
     Linking.openURL('https://www.facebook.com')
     console.log('updating profile');
     return firebase.database().ref().update(updates);
  
}
  static navigationOptions = {
    title: 'Earn Coinse',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
        <TextInput style={styles.input}
          placeholder = 'i just had the best day today following this app instruction' placeHolderColor = 'white'/>
          <Button
          style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
       title="Share a story on facebook and earn 5 coins"
       onPress={() =>
       {this.shareStory()
       }
       }
        />
        </Image>
      </View>
       
      
    );
  }
}
class TodayFortuneScreen extends React.Component {
  static navigationOptions = {
    title: 'Today Fortune',
  };
  constructor(props) {
    super(props);

    this.itemsRef = firebaseApp.database().ref();
    
    console.log("items", this.itemsRef.key);
    this.state = {
      bad:'',
      good:''
      };
    
  }
  getItems() {
    
    return firebase.database().ref('/fortunes').once('value').then((snapshot) => {
      const { bad,good } = snapshot.val();
      console.log('updating state');
      this.setState({
        bad, good
      });
    });
  }

  componentDidMount() {
    this.getItems()
    .then(() => console.log(this.state));

    console.log(this.state.bad);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
        <Text style={styles.title}>Date:                   { today.todayDate} {today.todayMonth} {today.todayYear}</Text>
        <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
        <Text style={styles.title}>Good to do:  </Text>
        <Text color= 'black'>!
      </Text>
        <Text style={styles.text}>
         {this.state.good}
      </Text>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
        <Text style={styles.title}>Bad to do: </Text>
        <Text color= 'black'>!
      </Text>
        <Text style={styles.text}>
         {this.state.bad}
      </Text>
        </Image>
      </View>
       
      
    );
  }
}
class NameMeaningScreen extends React.Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    this.mean='';
    console.log("items", this.itemsRef.key);
      this.cName={
        first:'',
        second:''
      };
      this.pro = {
        chineseName:'',
        username:'',
        DOB:'',
        TOB:'',
        PinYin:'',
        Gender:'',
        Occ:'',
        Coin:0
        };
  }
  shareStory(){
    
        this.state.Coin=this.state.Coin+5;
        var updates = {};
        updates['/profile/Coin'] =this.state.Coin;
        Linking.openURL('https://www.facebook.com')
      
        return firebase.database().ref().update(updates);
     
   }
   setNewName(){
    
    
    this.pro.chineseName= this.cName.first + ' '+ this.cName.second
    var updates = {};
    updates['/profile/chineseName'] =this.pro.chineseName;
    AlertIOS.alert(
      'your chinese name is set as '+ this.cName.first + ' '+ this.cName.second
     );
    this.setNewMean()     
    console.log('updating profile');
    return firebase.database().ref().update(updates);
   }
   setNewMean(){
    
    var updates = {};
   // this.pro.chineseName= this.cName.first + ' '+ this.cName.second
    updates['/Cname/Cmeaning'] =this.mean;
    console.log('updating profile');
    
    return firebase.database().ref().update(updates);
   }
  getItems() {
    
    return firebase.database().ref('/profile').once('value').then((snapshot) => {
      const { chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin } = snapshot.val();
      console.log('updating state');
      this.pro={
        chineseName,username,DOB,TOB,PinYin,Gender,Occ,Coin
      };
    });
    ChineseNameGlobal=this.state.chineseName;
  }
  get12Char(){
    var firstChar = Math.floor(Math.random() * 30);
    var secondChar = Math.floor(Math.random() * 30);
    var temp='';
    var am = this.pro.TOB.indexOf('am') == -1 //can not find am
    var yinMonth0  = this.pro.DOB.indexOf('-07-') != -1 // can find july
    var yinMonth1  = this.pro.DOB.indexOf('-11-') != -1 // can find Nov
    var yinMonth2  = this.pro.DOB.indexOf('-03-') != -1 // can find march
    if (am && yinMonth0 && yinMonth1 && yinMonth2){temp='yin'}
    else {temp='yang'}
    return firebase.database().ref('/'+temp).once('value').then((snapshot) => {
      this.cName.first = snapshot.val()[firstChar];
      this.cName.second = snapshot.val()[secondChar];
      console.log(this.cName.first);
      console.log(this.cName.second);
      
    });
  }
  
  getMeaning() {
    var ranMean = Math.floor(Math.random() * 15);
    return firebase.database().ref('/meaning').once('value').then((snapshot) => {
      this.mean= snapshot.val()[ranMean];
      console.log(this.mean.nameMeaning);
      
    });
  }
 
  componentDidMount(){  
    this.getItems()
    .then(() => console.log(this.pro));
    this.get12Char()
    .then(() => console.log(this.cName)); 
   
    this.getMeaning()
   .then(() => console.log(this.mean));

     DeepLinking.addScheme('https://');
    Linking.addEventListener('url', this.handleUrl);
 
    DeepLinking.addRoute('/www.google.com.au', (response) => {
      // example://test 
      this.setState({ response });
    });
 
    DeepLinking.addRoute('/www.facebook.com', (response) => {
      // example://test/23 
      this.setState({ response });
    });
 
    DeepLinking.addRoute('/test/:id/details', (response) => {
      // example://test/100/details 
      this.setState({ response });
    });
 
    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));

this.t1 = setTimeout(() => this.forceUpdate(), 5000)

}

componentWillUnmount() {
  this.getItems()
  .then(() => console.log(this.pro));
  this.get12Char()
  .then(() => console.log(this.cName)); 
  this.getMeaning()
  .then(() => console.log(this.mean));
    Linking.removeEventListener('url', this.handleUrl);
this.t2 = setTimeout(() => this.forceUpdate(), 5000)

  }
 
  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }
  static navigationOptions = {
    title: 'Name Meaning',
  };


  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./pic.jpg')}  style={styles.backgroundImage}>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>
        <Text style={styles.title}> Your Chinese Name is </Text>
        <Text style={styles.text}>
        {this.cName.first} {this.cName.second}
      </Text>
        <Text style={styles.title}> meaning  </Text>
        <Text style={styles.text}>
         {this.mean}
      </Text>
      <Text color= 'black'>!
      </Text>
      <Text color= 'black'>!
      </Text>

        <Button
        style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }  
       title="Copy and share this on facebook and earn 5 coins"
       onPress={() =>
       this.shareStory()}
        />
        <Text color= 'black'>!
      </Text>
        <Button
        style={styles.button}

              backgroundColor = 'cornflowerblue'

              underlayColor = 'transparent'

              fontWeight = 'bold'

              borderRadius = { 3 }
       title="Set this as your new Chinese name"
       onPress={() =>
       this.setNewName()}
        />
        </Image>
      </View>
      //https://www.google.com.au/ 
      
    );
  }
}


class BowlAppScreen extends React.Component {

  constructor(props) {
    super(props);

    this.itemsRef = firebaseApp.database().ref();
    console.log("items", this.itemsRef.key);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds
    };
  }
  static navigationOptions = {
    title: 'Bowlapp',
  };
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  changeValue(id, delta) {
    //Find the item by id, and save the new value
    this.itemsRef.child(id).once('value')  
          .then(item => {  
            const value = item.val();   
            value.value += delta;   
            return value;  
          })   
          .then(value => {   
            var updates = {};   
            updates[`/${id}`] = value;   
            return this.itemsRef.update(updates);  
          })   
          .catch(err => {   
            console.log('err', err);   
          });
    console.log(`Changing: ${id}, by value: ${delta}`);
  }

  getName() {
    AlertIOS.prompt(
      'Get a chinese name',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ name: text, value: 0 })
          }
        },
      ],
      'plain-text'
    );
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        console.log("child", child);
        items.push({
          title: child.val().name,
          value: child.val().value,
          _key: child.key
        });
      });

      const ds = this.state.dataSource
      this.setState({
        dataSource: ds.cloneWithRows(items)
      });

    });
  }

  renderItem(item) {
    console.log(item._key);
    return (
      <ListItem
        _key={item._key}
        title={item.title}
        value={item.value}
        changeValue={(key, delta) => this.changeValue(key, delta)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Enabled Bowl Debt"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderItem(rowData)}
          // renderRow={this.renderItem.bind(this)}
        />
        <ActionButton title="Add Person" onPress={(event) => this.addPerson(event)} />
      </View>
    );
  }
}


export const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Bowl:{screen:BowlAppScreen},
  TodayFortune:{ screen: TodayFortuneScreen},
  ChineseName: { screen: ChineseNameScreen },
  EarnCoins:{screen: EarnCoinsScreen},
  NameMeaning:{screen:NameMeaningScreen},
});
export default class App extends Component {
  render() {
    return <Nav />;
  }
}
AppRegistry.registerComponent('App', () => App);



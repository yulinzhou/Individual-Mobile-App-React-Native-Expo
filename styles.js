const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  button: {
    
        width: 300,
    
        height: 50
    
      },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color:'white'
 },
 title: {
  color: 'cornflowerblue',
  fontSize:22,
  fontWeight:'bold'
},
 text: {
  color: 'white',
  fontSize:18,
  fontWeight:'bold'
},
capitalLetter: {
  color: 'red',
  fontSize: 20
},
wordBold: {
  fontWeight: 'bold',
  color: 'black'
},
italicText: {
  color: '#37859b',
  fontStyle: 'italic'
},
textShadow: {
  textShadowColor: 'red',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius : 5
},
backgroundImage: {
  flex: 1,
  resizeMode: 'cover', // or 'stretch'
  //justifyContent: 'center',
  width: null,
  height: null 
},


})

module.exports = styles
module.exports.constants = constants;

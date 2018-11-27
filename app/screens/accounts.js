import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Collapsible from 'react-native-collapsible';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chequingAccountNumber: "64136167171",
       chequingBalance: null,
       savingAccountNumber: "95181167171",
       savingBalance: null,
       collapsed: true,
       chequingHistory: [],
    }
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  async componentWillMount() {
    const chequingBalance = await AsyncStorage.getItem('chequingBalance');
    const savingBalance = await AsyncStorage.getItem('savingBalance');
    const chequingHistory = await AsyncStorage.getItem('chequingHistory');

    if (chequingBalance) {
      this.setState({
        chequingBalance: chequingBalance,
      });
    }
    if (savingBalance ) {
      this.setState({
        savingBalance: savingBalance,
      });
    }
    if (chequingHistory ) {
      this.setState({
        chequingHistory: JSON.parse(chequingHistory),
      });
    }
  }
  render() {
    return (
      <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.container}>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Chequing
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.chequingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.chequingBalance}$
          </Text>

        </View>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Savings
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.savingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.savingBalance}$
          </Text>
          <TouchableHighlight style={{borderColor:'black'}} onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>View Transactions</Text>
            </View>
          </TouchableHighlight>
          <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.container2}>
            <View style={{marginLeft:50, width: 100, backgroundColor: 'white'}}>
              <Text>
                   { (this.state.chequingHistory).map((item, key)=>(<Text key={key}> { item.date } {'\n'}</Text>))}
              </Text>
            </View>
            <View style={{width:150, alignItems: 'center', backgroundColor: 'white'}}>
              <Text>
                   { (this.state.chequingHistory).map((item, key)=>(
                     <Text key={key}>
                     { item.transaction } {'\n'}
                     </Text>))}
              </Text>
            </View>
            <View style={{width: 100, backgroundColor: 'white'}}>
              <Text>
                   { (this.state.chequingHistory).map((item, key)=>(<Text key={key}> { item.amount } {'\n'}</Text>))}
              </Text>
            </View>
          </View>
          </Collapsible>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderWidth: 0.3
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:40,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#2aa202',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText:{
    color:'#fff',
    fontSize: 15,
    textAlign:'center',
  }
});

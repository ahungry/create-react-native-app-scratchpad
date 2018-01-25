import React from 'react';
import { StyleSheet, Text, Image, TextInput, ScrollView } from 'react-native';

export default class App extends React.Component {
  texter (msg) {
    alert(msg)
  }
  render () {
    return (
      <ScrollView style={styles.container}>

        <Image
          source={{ uri: 'http://ahungry.com/img/logo.png' }}
          style={{ width: 320, height: 280 }} />

        {/* https://facebook.github.io/react-native/docs/textinput.html#onchangetext */}
        <TextInput onChangeText={this.texter} />

        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

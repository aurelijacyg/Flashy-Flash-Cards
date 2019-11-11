import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default class RenameDeckView extends React.Component {
  state = {
    deckName: ""
  };

  changeDeckName(newName) {
    this.setState({
      deckName: newName
    });
  }

  renameDeck = () => {
    this.props.renameDeck(this.state.deckName);
  };

  render() {
    return (
      <View style={styles.container}>
       
        <Text style={styles.text}> Enter new name of the deck </Text>
        <TextInput style={styles.inputBox} onChangeText={text => this.changeDeckName(text)} value={this.deckName}/>
        <TouchableOpacity  style={styles.button} onPress={this.renameDeck}>
            <Text style={styles.buttonText}>RENAME</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  inputBox: {
    height: 50,
    width: 300,
    borderColor: "white",
    borderWidth: 2,
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  button: {
    display: 'flex',
    height: 40,
    width: 300,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffe6b3',
    backgroundColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Courier"
  }
});
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from "react-native";

export default class AddCardView extends React.Component {
  state = {
    deckName: "",
    front: "",
    back: ""
  };

  changeCardFront(frontText) {
    this.setState({
      front: frontText
    });
  }

  changeCardBack(backText) {
    this.setState({
      back: backText
    });
  }

  addNewCard = () => {
    let newCard = {front: this.state.front, back: this.state.back};
    this.props.addCard(newCard);
  };

  render() {
    return (
      <View style={styles.container}>
       
        <Text style={styles.text}> Enter a question for the card </Text>
        <ImageBackground source={require('../img/card.jpg')} resizeMode='cover' style={ styles.imgBackground }> 
            <TextInput style={styles.inputBox} onChangeText={text => this.changeCardFront(text)} value={this.front}/>
        </ImageBackground>
        
        <Text style={styles.text}> Enter an answer </Text>
        <View style={styles.cardBack}>
            <TextInput style={styles.inputBox} onChangeText={text => this.changeCardBack(text)} value={this.back}/>
        </View>
        
        <TouchableOpacity  style={styles.button} onPress={this.addNewCard}>
            <Text style={styles.buttonText}>ADD</Text>
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
    borderColor: "black",
    borderWidth: 2,
    color: "black"
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
    width: 360,
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
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  imgBackground: {
    width: 360,
    height: 270,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBack: {
    width: 360,
    height: 270,
    borderWidth: 1.5,
    borderColor: "#000000",
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"
  }
});
import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from "react-native";

export default class DeckList extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center"}} style={styles.scrollView}>
        {this.props.decks.map(deck => (
          <View key={deck.name} style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => this.props.changeStateToDeck(deck)}>
              <ImageBackground source={require('../img/card.jpg')} resizeMode='cover' style={ styles.imgBackground }>
                <Text>{deck.name}</Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity  style={styles.button} onPress={() => this.props.changeStateToAddCards(deck)}>
                    <Text style={styles.buttonText}>ADD CARDS</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.button} onPress={() => this.props.changeStateToRenameDeck(deck)}>
                    <Text style={styles.buttonText}>RENAME</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={styles.button} onPress={() => this.props.deleteDeck(deck)}>
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 1
  },
  button: {
    display: 'flex',
    height: 40,
    width: 100,
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
  },
  imgBackground: {
    width: 300,
    height: 200,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
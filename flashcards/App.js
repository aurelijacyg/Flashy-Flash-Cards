import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Constants from "expo-constants";
import decks from "./db/flashcards";
import Card from "./components/Card";
import DeckList from "./components/DeckList";
import RenameDeckForm from "./actionViews/RenameDeckView";
import AddDeckForm from "./actionViews/AddDeckView";
import AddCardForm from "./actionViews/AddCardView";

export default class App extends React.Component {
  state = {
    decks: decks,
    showDecks: true,
    cardsOfDeck: "",
    selectedDeck: "",
    addDeck: false,
    renameDeck: false,
    addCards: false,
  };

  changeStateToDeck = deck => {
    this.setState({
      showDecks: false,
      cardsOfDeck: deck.cards,
      selectedDeck: deck
    });
  };

  changeStateToDecksList = () => {this.setState({showDecks:true});};

  changeStateAfterUpdate = allDecks => {
    this.setState({
      decks: allDecks,
      addCards: false,
      renameDeck: false,
      addDeck: false,
    });
  };

  changeStateToRenameDeck = (deck) => {
    this.setState({
      renameDeck: true,
      selectedDeck: deck
    });
  };

  renameDeck(newName) {
    let indexOfDeck = this.state.decks.indexOf(this.state.selectedDeck);
    let currentDeck = this.state.selectedDeck;
    let allDecks = this.state.decks;

    currentDeck.name = newName;
    allDecks[indexOfDeck] = currentDeck;

    this.changeStateAfterUpdate(allDecks);
  }

  changeStateAddDeck = () => {
    this.setState({
      addDeck: true
    });
  };

  addNewDeck(deck) {
    this.setState({
      decks: [...this.state.decks, deck],
      addDeck: false
    });
  }

  changeStateToAddingNewCards = (deck) => {
    this.setState({
      addCards: true,
      selectedDeck: deck,
      showDecks: false
    })
  }

  changeStateAfterAddingNewCards = allDecks => {
    this.setState({
      decks: allDecks,
      addCards: false,
      renameDeck: false,
      addDeck: false,
      showDecks: true
    })
  }

  changeDeck(changedCardsOfDeck, operation) {
    let indexOfDeck = this.state.decks.indexOf(this.state.selectedDeck);
    let currentDeck = this.state.selectedDeck;
    let allDecks = this.state.decks;
    currentDeck.cards = changedCardsOfDeck;
    allDecks[indexOfDeck] = currentDeck;

    if (operation === "addcards"){
      this.changeStateAfterAddingNewCards(allDecks)

    } else {
      this.changeStateAfterUpdate(allDecks)
    }
  }

  addCard(card) {
    let currentDeck = this.state.selectedDeck;
    currentDeck.cards = [...currentDeck.cards, card];
    this.changeDeck(currentDeck.cards, "addcards");
  }

  changeStateAfterDeletingDeck = (newDecks) => {
    this.setState({
      decks: newDecks
    });
  }

  deleteDeck = deck => {
    let newDecks = this.state.decks.filter(item => item !== deck);
    this.changeStateAfterDeletingDeck(newDecks)
  };

  render() {
    if (this.state.showDecks) {
      return (
        <View style={styles.container}>
          {this.state.renameDeck && (
            <RenameDeckForm
              renameDeck={text => this.renameDeck(text)}
            ></RenameDeckForm>
          )}
          
          <DeckList
            decks={this.state.decks}
            changeStateToRenameDeck={this.changeStateToRenameDeck}
            changeStateToAddCards={this.changeStateToAddingNewCards}
            deleteDeck={this.deleteDeck}
            changeStateToDeck={this.changeStateToDeck}
          />      

          <TouchableOpacity  style={styles.button} onPress={() => this.changeStateAddDeck()}>
            <Text style={styles.buttonText}>ADD NEW DECK</Text>
          </TouchableOpacity>

          {this.state.addDeck && (
            <AddDeckForm
              addDeck={deck => this.addNewDeck(deck)}
            ></AddDeckForm>
          )}

        </View>
      );
    } else if (this.state.addCards){
      return (
        <View style={styles.container}>
          <View style={styles.topRow}>
            <Text style={styles.mainText}>Flashy Flash Cards</Text>
          </View>
          <View style={styles.mainRow}>
            <AddCardForm
              addCard={card => this.addCard(card)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.topRow}>
            <Text style={styles.mainText}>Flashy Flash Cards</Text>
          </View>
          <View style={styles.mainRow}>
            <Card
              cards={this.state.cardsOfDeck}
              backToMenu={this.changeStateToDecksList}
              changeDeck={(deck) => this.changeDeck(deck,"")}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "stretch",
    alignContent: "center",
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight
  },
  topRow: {
    flex: 1.5,
    flexDirection: "row",
    backgroundColor: '#3E3E3E',
    justifyContent: 'center',
    alignItems: "center",
  },
  mainRow: {
    flex: 14,
    flexDirection: "row",
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  button: {
    display: 'flex',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff9999",
    shadowColor: '#ffe6b3',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  scrollView: {
    marginHorizontal: 1
  }
});
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

export default class Card extends React.Component {
  state = {
    showFront: true,
    correctCardsDeck: [],
    incorrectCardsDeck: [],
    currentCardIndex: 0,
    currentDeck: [],
    cardsTime: [],
    startTime: 0,
    endTime: 0
  };

  flipCard = () => {
    let endTime = new Date();
    this.setState({
      showFront: !this.state.showFront,
      endTime: endTime
    });
  }

  answerButtonHandling = (answer) => {
    if (answer === "correct"){
      answerArray = this.state.correctCardsDeck;
    } else {
      answerArray = this.state.incorrectCardsDeck;
    }
    let endTime = this.state.endTime;
    let startTime = this.state.endTime;
    let time = Math.abs(endTime - startTime);
    let card = this.state.currentDeck[this.state.currentCardIndex];
    card.time = time;
    answerArray.push(card);
    answerArray.sort((a, b) => b.time - a.time);

    if (answer === "correct"){
      this.setState({correctCardsDeck: answerArray});
    } else {
      this.setState({incorrectCardsDeck: answerArray});
    }
    this.nextCard();
  }

  nextCard = () => {
    let cardIndex = this.state.currentCardIndex;
    if (cardIndex < this.state.currentDeck.length - 1) {
      this.changeStateToNextCard()
    } else {
      let newDeck = this.state.incorrectCardsDeck.concat(this.state.correctCardsDeck);
      this.changeStateToDefault(newDeck);
      this.props.changeDeck(newDeck, "");
    }
  };

  changeStateToNextCard = () => {
    let startTime = new Date();
    let newIndex = this.state.currentCardIndex + 1;
    this.setState({
      showFront: true,
      currentCardIndex: newIndex,
      startTime: startTime
    });
  };

  changeStateToDefault(newDeck) {
    this.setState({
      showFront: true,
      correctCardsDeck: [],
      incorrectCardsDeck: [],
      currentCardIndex: 0,
      currentDeck: newDeck,
      startTime: new Date()
    });
  }

  deleteCard = () => {
    let newDeck = []
    let deckLength = this.state.currentDeck.length
    for(let i = 0; i < deckLength; i++){
      if (this.state.currentDeck[i] !== this.state.currentDeck[this.state.currentCardIndex]){
        newDeck.push(this.state.currentDeck[i])
      }
    }
    this.setState({ currentDeck: newDeck });
    this.props.changeDeck(newDeck, "");
  };

  rearrangeDeck = () => {
    let deckLength = this.state.currentDeck.length;
    let remainingCards = this.state.currentDeck.slice(this.state.currentCardIndex, deckLength);
    let newDeck = this.state.incorrectCardsDeck.concat(remainingCards).concat(this.state.correctCardsDeck);
    this.changeStateToDefault(newDeck);
    this.props.changeDeck(newDeck, "");
  };

  backPressed = () => {
    this.rearrangeDeck();
    this.props.backToMenu();
  }

  componentWillMount() {
    let updatedDeck = [];
    this.props.cards.map(card => {
      let updatedCard = { front: card.front, back: card.back, time: 0 };
      updatedDeck.push(updatedCard);
    });
    this.setState({
      currentDeck: updatedDeck
    });
  }

  componentDidMount() {
    this.setState({
      startTime: new Date()
    });
  }

  componentWillUnmount() {
    this.setState({
      endTime: new Date()
    });
  }

  render() {
    if (this.state.showFront){
        return(
            <View>
              {this.state.currentDeck.length !== 0 && (
                <TouchableOpacity onPress={this.flipCard}>
                    <ImageBackground source={require('../img/card.jpg')} resizeMode='cover' style={ styles.imgBackground }>
                        <Text style={styles.cardText}>
                            {this.state.currentDeck[this.state.currentCardIndex].front}
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
              )}

              {this.state.currentDeck.length === 0 && (
                <View style={styles.mainView}>
                  <Text style={styles.textStyle}>There are no cards in this deck</Text>
                </View>
              )}

              {this.state.currentDeck.length !== 0 && (
                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity  style={styles.button} onPress={this.rearrangeDeck}>
                        <Text style={styles.buttonText}>RESTART</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress={this.deleteCard}>
                        <Text style={styles.buttonText}>DELETE CARD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress={this.backPressed}>
                        <Text style={styles.buttonText}>BACK TO MENU</Text>
                    </TouchableOpacity>
                </View>
              )}

              {this.state.currentDeck.length === 0 && (
                <View style={{ flexDirection: "row"}}>
                <TouchableOpacity  style={styles.buttonBack} onPress={this.props.backToMenu}>
                  <Text style={styles.buttonText}>BACK TO MENU</Text>
                </TouchableOpacity>
              </View>
              )}
            </View>
        );
    } else {
        return(
            <View>
                <View style={styles.answerRow}>
                    <TouchableOpacity  style={styles.btnCorrect} onPress={this.answerButtonHandling.bind(this, "correct")}>
                        <Text style={styles.answerBtnText}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.btnWrong} onPress={this.answerButtonHandling.bind(this, "incorrect")}>
                        <Text style={styles.answerBtnText}>WRONG</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.flipCard}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            {this.state.currentDeck[this.state.currentCardIndex].back}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity  style={styles.button} onPress={this.rearrangeDeck}>
                        <Text style={styles.buttonText}>RESTART</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress={this.deleteCard}>
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress={this.backPressed}>
                        <Text style={styles.buttonText}>BACK TO MENU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black'
  },
  answerRow: {
    height: 70,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  btnCorrect: {
    display: 'flex',
    height: 60,
    width: 180,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffe6b3',
    backgroundColor: "#99ffcc",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  btnWrong: {
    display: 'flex',
    height: 60,
    width: 180,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffe6b3',
    backgroundColor: "#ff9999",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  answerBtnText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Courier"
  },
  card: {
    width: 360,
    height: 270,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000000",
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"
  },
  imgBackground: {
    width: 360,
    height: 270,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Courier",
    textAlign: "center"
  },
  textStyle: {
    color:"#ff9999",
    fontSize: 30,
    fontFamily: "Courier",
    textAlign: "center"
  },
  button: {
    display: 'flex',
    height: 60,
    width: 120,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffe6b3',
    backgroundColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  buttonBack: {
    display: 'flex',
    height: 60,
    width: 350,
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
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Courier"
  }
});

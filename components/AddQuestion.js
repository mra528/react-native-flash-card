import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { addCardToDeck, getDecks } from "../utils/api"
import { connect } from 'react-redux'
import { deckAction } from '../action'
import SubmitButton from "./SubmitButton"

class AddQuestion extends Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: "Add Card"
        }
    }

    state = {
        question: null,
        answer: null
    }

    submit = () => {
        const { question, answer } = this.state;
        const { decks } = this.props;
        const card = {
            question: question,
            answer: answer
        }

        if (card.question === null || card.answer === null){
            Alert.alert(
                'Alert!',
                'Missing field',
                [

                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                ],
                { cancelable: false }
            )
        }
        else{
            const { deckTitle } = this.props.navigation.state.params

            decks[deckTitle].questions.push(card);


            addCardToDeck({ deckTitle, card }).then(() => {
                this.props.deckAction({decks});
                this.resetState;
                this.props.navigation.goBack()
            });
        }

    }

    resetState = () => {
        this.setState({question: null, answer: null})
    }


    render() {

        const { decks } = this.props;
        const { deckTitle } = this.props.navigation.state.params

        return (
            <View style={styles.container}>

                <View>
                    <TextInput style={styles.textInput} placeholder={"Question"} onChangeText={(text) => this.setState({question: text})} />
                </View>
                <View>
                    <TextInput style={styles.textInput} placeholder={"Answer"} onChangeText={(text) => this.setState({answer: text})} />
                </View>

                <View>
                    <SubmitButton onPress={this.submit} name="submit"/>
                </View>
            </View>
        )
    }
}


const mapStateToProps = decks=> ({decks: decks});


export default connect(mapStateToProps, {deckAction})(AddQuestion)


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        marginTop:50,
        alignItems: 'stretch'
    },
    textInput: {
        margin: 15,
        height: 40,
        borderColor: '#E53224',
        borderWidth: 1,
        paddingLeft:30
    },
    text: {
        fontSize: 50,
        textAlign: 'center'
    }
})
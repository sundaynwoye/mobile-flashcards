import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import PropTypes, {object} from "prop-types";
import { gray } from "../utils/colors";
import { handleInitialData } from '../actions/index';
import { connect } from "react-redux";
import Deck from "./Deck";

class DeckList extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        handleInitialData: PropTypes.func.isRequired,
        decks: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.handleInitialData();
    }

    componentDidUpdate() {
        const { decks, navigation } = this.props;
        navigation.setOptions({
            tabBarBadge: Object.keys(decks).length
        })
    }

    render() {
        const { decks, navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                {Object.values(decks).map(deck => {
                    return (
                        <TouchableOpacity
                            key={deck.title}
                            onPress={() =>
                                navigation.navigate('DeckInfo', { title: deck.title })
                            }
                        >
                            <Deck id={deck.title} />
                        </TouchableOpacity>
                    );
                })}
                <View style={{ marginBottom: 30 }} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        backgroundColor: gray
    }
})

const mapStateToProps = state => ({ decks: state });

export default connect(mapStateToProps, { handleInitialData })(DeckList);
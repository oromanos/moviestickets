// component that will be rendering a scrollable list of movie posters.

import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { movies } from './data';
// existing import statements
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

export default class Movies extends Component {
    static navigationOptions = {
        title: 'Movies',
        header: null
    };

    // helper methods to open or close a popup 
    // Add starting here
    state = {
        popupIsOpen: false,
        // Day chosen by user
        chosenDay: 0,       // choose first day by default
        // Time chosen by user
        chosenTime: null,
    }

    openMovie = (movie) => {
        this.setState({
            popupIsOpen: true,
            movie,
        });
    }

    closeMovie = () => {
        this.setState({
            popupIsOpen: false,
            // Reset values to default ones
            chosenDay: 0,
            chosenTime: null,
        });
    }

    chooseDay = (day) => {
        this.setState({
            chosenDay: day,
        });
    }

    chooseTime = (time) => {
        this.setState({
            chosenTime: time,
        });
    }

    bookTicket = () => {
        // Make sure they selected time 
        if (!this.state.chosenTime) {
        alert('Please select show time');
        } else {
        // Close popup
        this.closeMovie();
        // Navigate away to Confirmation route
        this.props.navigation.navigate('Confirmation', {code: Math.random().toString(36).substring(6).toUpperCase()})
        
        }
    }

    // Untill here

    render() {
        return (
        <View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                // Hide all scroll indicators
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >    
                { 
                    movies.map((movie, index) => <MoviePoster
                    movie={movie}
                    onOpen={this.openMovie}
                    key={index}
                    />)
                }
            </ScrollView>
            <MoviePopup
                movie={this.state.movie}
                isOpen={this.state.popupIsOpen}
                onClose={this.closeMovie}
                chosenDay={this.state.chosenDay}
                chosenTime={this.state.chosenTime}
                onChooseDay={this.chooseDay}
                onChooseTime={this.chooseTime}
                onBook={this.bookTicket}
            />
        </View>
        );
    }
}

// {movies.map((movie, index) => <Text>{movie.title}</Text>)}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});
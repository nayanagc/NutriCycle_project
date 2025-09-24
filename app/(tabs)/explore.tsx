import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Card, Paragraph, Searchbar, Title } from 'react-native-paper';


const SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query.');
      setRecipes([]);
      return;
    }

    // Check if API key is loaded
    if (!SPOONACULAR_API_KEY) {
      setError('Spoonacular API key is not loaded. Please check your .env file.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query: searchQuery,
          number: 10, // You can adjust the number of results
          addRecipeInformation: true, // Get full recipe details
        },
      });

      if (response.data.results.length === 0) {
        setRecipes([]);
        setError('No recipes found for your search. Try something different!');
      } else {
        setRecipes(response.data.results);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes. Please check your network connection or API key.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Explore Recipes" />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for a recipe..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchRecipes}
          style={styles.searchBar}
          onIconPress={searchRecipes}
        />
      </View>

      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card key={recipe.id} style={styles.card}>
              <Card.Cover source={{ uri: recipe.image }} />
              <Card.Content>
                <Title>{recipe.title}</Title>
                <Paragraph>Ready in: {recipe.readyInMinutes} mins</Paragraph>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.infoText}>Find delicious recipes based on your ingredients!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 8,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 50,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
});
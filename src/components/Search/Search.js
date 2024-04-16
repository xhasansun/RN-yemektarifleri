import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SvgSearch from '../../assets/İcons/Search';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const recipesData = useSelector((state) => state.user.recipesData);
  const navigation = useNavigation();

  const handleChangeText = (text) => {
    setSearchText(text);
  };

  const filterRecipes = () => {
    if (searchText.length < 1) {
      return []; // 1 karakterden az ise boş dizi döndür
    }

    const filteredRecipes = recipesData.filter((recipe) =>
      recipe.foodName.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredRecipes;
  };

  const handleRecipePress = (recipe) => {
    setSearchText(''); // Input'u boşalt
    navigation.navigate('RecipeDetailScreen', { item: recipe });
  };

  const renderFilteredRecipes = () => {
    const filteredRecipes = filterRecipes();

    if (filteredRecipes.length === 0) {
      return null; // Sonuç bulunamadığında null döndür
    }

    return (
      <ScrollView style={styles.resultsContainer}>
        {filteredRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeItem}
            onPress={() => handleRecipePress(recipe)}
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{recipe.foodName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SvgSearch style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Yemek Tarifi Arayın..."
          placeholderTextColor="#0A9A61B3"
          value={searchText}
          onChangeText={handleChangeText}
        />
      </View>
      {renderFilteredRecipes()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    zIndex: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
    top: 60,
    width: '100%',
    maxHeight: 300,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  recipeName: {
    fontSize: 16,
    color: '#555',
  },
});

export default Search;

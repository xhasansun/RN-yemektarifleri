import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SvgGoBack from '../assets/İcons/GoBack';

const categories = [
  { id: 1, id: 'kahvalti', name: 'Kahvaltılar', image: 'https://ibacafe.com/ibamenu/wp-content/uploads/2023/02/DSCF3698-scaled.jpg' },
  { id: 2, id: 'ogle', name: 'Öğle Yemekleri', image: 'https://ibacafe.com/ibamenu/wp-content/uploads/2023/02/DSCF3698-scaled.jpg' },
  { id: 3, id: 'aksam', name: 'Akşam Yemekleri', image: 'https://ibacafe.com/ibamenu/wp-content/uploads/2023/02/DSCF3698-scaled.jpg' },
  { id: 4, id: 'tatlilar', name: 'Tatlılar', image: 'https://ibacafe.com/ibamenu/wp-content/uploads/2023/02/DSCF3698-scaled.jpg' },
  // Diğer kategoriler...
];

const Categories = ({ navigation }) => {

  const handleCategoryPress = (category) => {
    navigation.navigate('SelectedCategoriesListScreen', { categoryId: category.id, categoryName: category.name });
    // Kategoriye tıklandığında yapılacak işlemler
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}> <SvgGoBack stroke={'#0A9A61'} /> </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Kategoriler</Text>
      </View>
      <ScrollView>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category)}
            >
              <Image source={{ uri: category.image }} style={styles.categoryImage} resizeMode="cover" />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0A9A61'
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryCard: {
    width: '100%',
    height: 200,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  categoryOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  categoryName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  }
});

export default Categories;

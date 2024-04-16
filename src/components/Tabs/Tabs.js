import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../../../firebase/config';
import { collection, onSnapshot, getDocs, addDoc, deleteDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore';
import Card from '../Card/Card';
import { COLORS } from '../../styles/colors';
import { useSelector } from 'react-redux';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('kahvalti');
    const [data, setData] = useState([]);
    const uid = useSelector((state) => state.user.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const querySnapshot = await getDocs(
                query(collection(db, "Recipes"), where("category", "==", activeTab))
              );
              const data = querySnapshot.docs.map((doc) => doc.data());
              setData(data);
            } catch (error) {
              console.error("Error fetching data: ", error);
            }
          };
          

        const unsubscribe = onSnapshot(collection(db, 'Recipes'), fetchData);

        return () => unsubscribe();
    }, [activeTab]);


    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };


    const handleFavoritePress = async (item) => {
        try {
            const userFavoritesRef = doc(db, 'Favoriler', uid);
            const userFavoritesSnapshot = await getDoc(userFavoritesRef);

            if (userFavoritesSnapshot.exists()) {
                const userFavoritesData = userFavoritesSnapshot.data();

                // Eğer aynı yemek zaten favorilere eklenmişse işlem yapmayın
                if (userFavoritesData.hasOwnProperty(item.id)) {
                    console.log('Bu yemek zaten favorilere eklenmiş.');
                    return;
                }

                const mealRef = doc(userFavoritesRef, 'favorites', item.id);
                await setDoc(mealRef, item);
            } else {
                const mealRef = doc(userFavoritesRef, 'favorites', item.id);
                await setDoc(mealRef, item);
            }
        } catch (error) {
            console.log('Favori eklerken hata oluştu:', error);
        }
    };



    const handleFavoriteRemove = async (id) => {
        try {
            const userFavoritesRef = doc(db, 'Favoriler', uid, 'favorites', id);
            const favoriteSnapshot = await getDoc(userFavoritesRef);

            if (favoriteSnapshot.exists()) {
                await deleteDoc(userFavoritesRef);
                console.log('Yemek favorilerden kaldırıldı.');
            } else {
                console.log('Bu yemek favorilere eklenmemiş.');
            }
        } catch (error) {
            console.log('Favori kaldırılırken hata oluştu:', error);
        }
    };



    const renderContent = () => {
        if (data.length === 0) {
            return <Text>No data available</Text>;
        }
        return (
            <>
                <View style={styles.recommendationWrapper}>
                    <Text style={styles.recommendationTitle}>Öneri</Text>
                    <Text style={styles.recommendationSeeAll}>Tümünü Gör</Text>
                </View>
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                    renderItem={({ item }) => (
                        <Card
                            key={item.id}
                            id={item.id} // ID'yi Card componentine geçirin
                            foodName={item.foodName}
                            cookingTime={item.cookingTime}
                            image={item.image}
                            isFavorite={false} // İlk renderda favori değil olarak ayarlanır
                            onFavoritePress={() => handleFavoritePress(item)}
                            onFavoriteRemovePress={() => handleFavoriteRemove(item.id)}
                        />
                    )}
                />
            </>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.categoryTitleWrapper}>
                    <Text style={styles.primaryTitle}>Kategoriler</Text>
                    <Text style={styles.seeAllText}>Tümünü Gör</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'kahvalti' && styles.activeTab]}
                        onPress={() => handleTabPress('kahvalti')}
                    >
                        <Text style={[styles.tabText, activeTab === 'kahvalti' && styles.activeTabText]}>🥞</Text>
                        <Text style={[styles.tabText, activeTab === 'kahvalti' && styles.activeTabText]}>Kahvaltı</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'ogle' && styles.activeTab]}
                        onPress={() => handleTabPress('ogle')}
                    >
                        <Text style={[styles.tabText, activeTab === 'ogle' && styles.activeTabText]}>🍲</Text>
                        <Text style={[styles.tabText, activeTab === 'ogle' && styles.activeTabText]}>Öğle Yemeği</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'aksam' && styles.activeTab]}
                        onPress={() => handleTabPress('aksam')}
                    >
                        <Text style={[styles.tabText, activeTab === 'aksam' && styles.activeTabText]}>🍛</Text>
                        <Text style={[styles.tabText, activeTab === 'aksam' && styles.activeTabText]}>Akşam Yemeği</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'tatlilar' && styles.activeTab]}
                        onPress={() => handleTabPress('tatlilar')}
                    >
                        <Text style={[styles.tabText, activeTab === 'tatlilar' && styles.activeTabText]}>🍰</Text>
                        <Text style={[styles.tabText, activeTab === 'tatlilar' && styles.activeTabText]}>Tatlı</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {renderContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    recommendationWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    recommendationTitle: {
        fontSize: 25,
        fontWeight: '500',
    },
    recommendationSeeAll: {
        color: COLORS.primary,
        fontSize: 14,
    },
    categoryTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    primaryTitle: {
        fontSize: 25,
        fontWeight: '500',
    },
    seeAllText: {
        color: COLORS.primary,
        fontSize: 14,
    },
    tab: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 7,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        marginBottom: 15,
        minWidth: 140,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
    contentContainer: {
        paddingLeft: 20,
    },
});

export default Tabs;
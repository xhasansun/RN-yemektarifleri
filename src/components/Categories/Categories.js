import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../../../firebase/config';
import { collection, onSnapshot, getDocs, addDoc, deleteDoc, doc, query, where, setDoc, getDoc } from 'firebase/firestore';
import Card from '../Card/Card';
import { COLORS } from '../../styles/colors'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setUid, setFavoritesList } from '../../reducers/userReducer';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";




const Categories = () => {
    const [activeTab, setActiveTab] = useState('kahvalti');
    const [data, setData] = useState([]);
    const uid = useSelector((state) => state.user.uid);
    const favoritesList = useSelector((state) => state.user.favoritesList);
    const recipesData = useSelector((state) => state.user.recipesData);


    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        isRecipeFavorite();
        fetchData();
    }, [activeTab, dispatch, uid, favoritesList, recipesData, isRecipeFavorite]);

    const fetchData = async () => {
        try {
            const filteredData = recipesData.filter(
                (item) => item.category === activeTab
            );
            setData(filteredData);
        } catch (error) {
            console.error("Error filtering data: ", error);
        }
    };

    const isRecipeFavorite = (recipeId) => {
        return favoritesList?.some((favorite) => favorite.id === recipeId);
    };


    const handleTabPress = (tab) => {
        setActiveTab(tab);
    };

    const TabButton = ({ title, icon, isActive, onPress }) => {
        return (
            <TouchableOpacity
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={onPress}
            >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {icon}
                </Text>
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
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
                // console.log('Yemek favorilerden kaldırıldı.');
            } else {
                // console.log('Bu yemek favorilere eklenmemiş.');
            }
        } catch (error) {
            // console.log('Favori kaldırılırken hata oluştu:', error);
        }
    };


    const renderSkeletonItem = () => (
        <SkeletonPlaceholder.Item flexDirection="column" paddingRight={10}>
            <SkeletonPlaceholder.Item width={150} height={220} borderRadius={10} />
            <SkeletonPlaceholder.Item marginTop={3}>
                <SkeletonPlaceholder.Item width={150} height={20} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
    );



    const renderContent = () => {
        if (data.length === 0) {
            return (
                <SkeletonPlaceholder borderRadius={4}>
                    <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={20}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <React.Fragment key={index}>
                                {renderSkeletonItem()}
                            </React.Fragment>
                        ))}
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            );
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
                        <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailScreen', { item })}>
                            <Card
                                key={item.id}
                                id={item.id} // ID'yi Card componentine geçirin
                                foodName={item.foodName}
                                cookingTime={item.cookingTime}
                                image={item.image}
                                isFavorite={() => isRecipeFavorite(item.id)}
                                onFavoritePress={() => handleFavoritePress(item)}
                                onFavoriteRemovePress={() => handleFavoriteRemove(item.id)}
                            />
                        </TouchableOpacity>
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
                    <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                        <Text style={styles.recommendationSeeAll}>Tümünü Gör</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrolviewStyle}>
                <TabButton
                    title="Kahvaltı"
                    icon="🥞"
                    isActive={activeTab === 'kahvalti'}
                    onPress={() => handleTabPress('kahvalti')}
                />
                <TabButton
                    title="Öğle Yemeği"
                    icon="🍲"
                    isActive={activeTab === 'ogle'}
                    onPress={() => handleTabPress('ogle')}
                />
                <TabButton
                    title="Akşam Yemeği"
                    icon="🍛"
                    isActive={activeTab === 'aksam'}
                    onPress={() => handleTabPress('aksam')}
                />
                <TabButton
                    title="Tatlı"
                    icon="🍰"
                    isActive={activeTab === 'tatlilar'}
                    onPress={() => handleTabPress('tatlilar')}
                />
            </ScrollView>
            {renderContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
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
        paddingLeft: 13,
    },
    scrolviewStyle: {
        paddingLeft: 22,
    },
    skeletonWrapper: {
        paddingHorizontal: 20,
    }
});

export default Categories;
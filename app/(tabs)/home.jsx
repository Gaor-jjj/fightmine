import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import Header from '../../components/Header';
import BuildingComponent from '../../components/BuildingComponent';
import { getCurrentUser, fetchBuildings, updateUserBuildingCount, updateGold } from '../../lib/appwrite';

export default function Home() {
    const [gold, setGold] = useState(0);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buildings, setBuildings] = useState([]);
    const [userData, setUserData] = useState(null);

    // Calculate total profit based on buildings
    const totalProfit = buildings.reduce(
        (total, building) => total + building.ownedCount * building.profit,
        0
    );

    // Fetch buildings and user data
    useEffect(() => {
        async function initialize() {
            try {
                const fetchedBuildings = await fetchBuildings();
                const currentUser = await getCurrentUser();

                if (currentUser) {
                    setUserId(currentUser.$id);
                    setUserData(currentUser);
                    setGold(currentUser.gold);
                }

                const mappedBuildings = fetchedBuildings.map((building) => {
                    const ownedCount = currentUser
                        ? currentUser[building.title.toLowerCase().replace(' ', '_')] || 0
                        : 0;
                    return {
                        id: building.id,
                        title: building.title,
                        price: building.price,
                        profit: building.profit,
                        ownedCount, // Dynamically set from user data
                    };
                });

                setBuildings(mappedBuildings);
                setLoading(false);
            } catch (error) {
                console.error('Error initializing buildings or user:', error);
                setLoading(false);
            }
        }
        initialize();
    }, []);

    // Add total profit to gold every second
    useEffect(() => {
        if (!userId || totalProfit <= 0) return;

        const interval = setInterval(async () => {
            try {
                setGold((prevGold) => {
                    const updatedGold = prevGold + totalProfit;
                    updateGold(userId, updatedGold);
                    return updatedGold;
                });
            } catch (error) {
                console.error('Error updating gold with profit:', error);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [userId, totalProfit]);

    // Handle clicking the coin to earn more gold
    const handleCoinPress = async () => {
        if (loading || !userId) return;

        try {
            setGold((prevGold) => {
                const newGoldValue = prevGold + 1;
                updateGold(userId, newGoldValue);
                return newGoldValue;
            });
        } catch (error) {
            console.error('Error updating gold on click:', error);
        }
    };

    // Handle purchasing a building
    const handlePurchaseBuilding = async (building) => {
        const mineField = building.title.toLowerCase().replace(' ', '_');

        if (!userData || !mineField) return;

        if (gold < building.price) {
            Alert.alert('Not enough gold', 'You do not have enough gold to purchase this building.');
            return;
        }

        try {
            const newGold = gold - building.price;
            const newMineCount = (userData[mineField] || 0) + 1;

            await updateUserBuildingCount(userId, mineField, newMineCount, newGold);

            setUserData((prev) => ({
                ...prev,
                [mineField]: newMineCount,
                gold: newGold,
            }));
            setGold(newGold);

            setBuildings((prevBuildings) =>
                prevBuildings.map((b) =>
                    b.id === building.id ? { ...b, ownedCount: newMineCount } : b
                )
            );
        } catch (error) {
            console.error('Error purchasing building:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1">
                <Header coinCount={gold} />
                <View className="h-1/4">
                    <ImageBackground
                        source={require('../../assets/images/minebg.png')}
                        resizeMode="cover"
                        className="flex-1 justify-center items-center"
                    >
                        <TouchableOpacity onPress={handleCoinPress}>
                            <Image source={require('../../assets/images/coin.png')} className="w-24 h-24" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View className="flex-1 justify-center items-center p-4">
                    {buildings.map((building) => (
                        <BuildingComponent
                            key={building.id}
                            building={building}
                            ownedCount={building.ownedCount}
                            onPurchase={handlePurchaseBuilding}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

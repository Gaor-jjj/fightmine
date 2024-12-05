import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import Header from '../../components/Header';
import BuildingComponent from '../../components/BuildingComponent';
import { getCurrentUser, fetchBuildings, updateUserBuildingCount } from '../../lib/appwrite';
import { useGold } from '../../context/GoldProvider';

export default function Home() {
    const { gold, updateGold, isLoading } = useGold();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buildings, setBuildings] = useState([]);
    const [userData, setUserData] = useState(null);

    const totalProfit = buildings.reduce(
        (total, building) => total + building.ownedCount * building.profit,
        0
    );

    useEffect(() => {
        async function initialize() {
            try {
                const fetchedBuildings = await fetchBuildings();
                const currentUser = await getCurrentUser();

                if (currentUser) {
                    setUserId(currentUser.$id);
                    setUserData(currentUser);
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
                        ownedCount,
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

    useEffect(() => {
        if (!userId || totalProfit <= 0) return;

        const interval = setInterval(() => {
            updateGold(totalProfit, 'add');
        }, 1000);

        return () => clearInterval(interval);
    }, [userId, totalProfit, updateGold]);

    const handleCoinPress = useCallback(() => {
        if (loading || isLoading) return;
        updateGold(1, 'add');
    }, [loading, isLoading, updateGold]);

    const handlePurchaseBuilding = useCallback(async (building) => {
        const mineField = building.title.toLowerCase().replace(' ', '_');

        if (!userData || !mineField || isLoading) return;

        if (gold < building.price) {
            Alert.alert('Not enough gold', 'You do not have enough gold to purchase this building.');
            return;
        }

        try {
            await updateGold(building.price, 'subtract');
            const newMineCount = (userData[mineField] || 0) + 1;

            await updateUserBuildingCount(userId, mineField, newMineCount, gold - building.price);

            setUserData((prev) => ({
                ...prev,
                [mineField]: newMineCount,
            }));

            setBuildings((prevBuildings) =>
                prevBuildings.map((b) =>
                    b.id === building.id ? { ...b, ownedCount: newMineCount } : b
                )
            );
        } catch (error) {
            console.error('Error purchasing building:', error);
            // Revert the gold subtraction if there's an error
            updateGold(building.price, 'add');
        }
    }, [userData, isLoading, gold, userId, updateGold]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 bg-neutral">
                <Header />
                <View className="h-1/4">
                    <ImageBackground
                        source={require('../../assets/images/minebg.png')}
                        resizeMode="cover"
                        className="flex-1 justify-center items-center"
                    >
                        <TouchableOpacity onPress={handleCoinPress}>
                            <Image source={require('../../assets/images/coin.png')} className="w-20 h-20" />
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


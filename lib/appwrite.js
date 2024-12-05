import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fightmine',
    projectId: '674966a7002704d30497',
    databaseId: '67496afc0017b342da76',
    userCollectionId: '67496b1f0004fc51cf9d',
    buildingCollectionId: '674dc4d7000b526718be',
};

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);

// User creation
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Failed to create account');

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
            }
        );

        return newUser;
    } catch (error) {
        console.error('Error creating user:', error.message, error);
        throw new Error(error.message || 'Failed to create user');
    }
}

// Sign in
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message || 'Failed to sign in');
    }
}

// Get current user
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser || currentUser.documents.length === 0) {
            return null;
        }

        return currentUser.documents[0];
    } catch (error) {
        return null;
    }
}

// Sign out
export async function signOut() {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error.message || 'Failed to sign out');
    }
}

// Subscribe to gold updates
export function subscribeToGoldUpdates(userId, callback) {
    const subscription = client.subscribe(
      `databases.${config.databaseId}.collections.${config.userCollectionId}.documents.${userId}`,
      (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          if (response.payload.gold !== undefined) {
            console.log('Gold updated to:', response.payload.gold);
            callback(response.payload.gold);
          }
        }
      }
    );
  
    return () => subscription(); // Unsubscribe when the component unmounts
}
  
// Update gold
export const updateGold = async (userId, newGold) => {
    try {
        console.log('Attempting to update gold:', { userId, newGold });
        const response = await databases.updateDocument(
            config.databaseId,
            config.userCollectionId,
            userId,
            { gold: newGold }
        );
    } catch (error) {
        console.error('Error updating gold in database:', error.message, error);
    }
};
export async function fetchBuildings() {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.buildingCollectionId
        );
        return response.documents.map((document) => ({
            id: document.$id,
            title: document.title, // Ensure this matches the field name in Appwrite
            price: document.price, // Ensure this matches the field name in Appwrite
            profit: document.profit, // Ensure this matches the field name in Appwrite
        }));
    } catch (error) {
        console.error('Error fetching buildings:', error.message, error);
        return [];
    }
}
export const updateUserBuildingCount = async (userId, mineField, newMineCount, newGold) => {
    try {
        console.log('Updating user data for:', { mineField, newMineCount, newGold });

        const updateData = {
            [mineField]: newMineCount,
            gold: newGold,
        };

        const response = await databases.updateDocument(
            config.databaseId,
            config.userCollectionId,
            userId,
            updateData
        );

        console.log('User building count and gold updated successfully:', response);
        return response;
    } catch (error) {
        console.error('Error updating user building count in database:', error.message, error);
        throw error;
    }
};
// Subscribe to power updates
export function subscribeToPowerUpdates(userId, callback) {
    const subscription = client.subscribe(
        `databases.${config.databaseId}.collections.${config.userCollectionId}.documents.${userId}`,
        (response) => {
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                if (response.payload.power !== undefined) {
                    console.log('Power updated to:', response.payload.power);
                    callback(response.payload.power);
                }
            }
        }
    );

    return () => subscription(); // Unsubscribe when the component unmounts
}
export const getMonsters = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId,
        '6751a12d00310c8e7cf8' // Replace with your actual collection ID
      );
  
      return response.documents.map((document) => ({
        id: document.$id,
        name: document.name, // Ensure this matches the field name in Appwrite
        hp: document.hp,     // Ensure this matches the field name in Appwrite
        gold: document.gold, // Ensure this matches the field name in Appwrite
      }));
    } catch (error) {
      console.error('Error fetching monsters:', error.message, error);
      return [];
    }
  };
  

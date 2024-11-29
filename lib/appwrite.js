import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.fightmine',
    projectId: '674966a7002704d30497',
    databaseId: '67496afc0017b342da76',
    userCollectionId: '67496b1f0004fc51cf9d'
}

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error('Failed to create account');

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username
            }
        );

        return newUser;

    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(error.message || 'Failed to create user');
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser || currentUser.documents.length === 0) {
            return null;
        }

        return currentUser.documents[0];
    } catch (error) {
        return null;
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(error)
    }
}
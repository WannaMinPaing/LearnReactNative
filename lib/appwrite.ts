import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint : "https://cloud.appwrite.io/v1",
    platform : "com.youtube.try",
    projectId: "66b1064d00080dde7d4e",
    databaseId : "66b1090100383f66b83d",
    userCollectionId : "66b10942000411760198",
    videoCollectionId : "66b109900009353b0d10",
    storageId : "66b10c0c001ac468bdfa"
 }


const client = new Client();
client.setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({ email, password, username }: { email: string, password: string, username: string }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error('Account creation failed');
        const avatarUrl = avatars.getInitials(username);

        await SignInForm({email,password});
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(error.message);
        } else {
            console.error('An unknown error occurred');
            throw new Error('An unknown error occurred');
        }
    }
};

export const  SignInForm = async({email,password}:{email:string,password:string}) => {
    try{
        const session = await account.createEmailPasswordSession(email,password);
        return session;

    }catch (error){
        if(error instanceof Error){
            console.error(error.message);
            throw new Error(error.message);
        }else{
            console.error('An unknown error occurred');
            throw new Error('An unknown error occurred');
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No current account');

        // Ensure currentAccount has a valid $id property
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)] // Use currentAccount.$id
        );

        if (!currentUser || !currentUser.documents.length) throw new Error('No current user found');

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it outside of this function if needed
    }
}
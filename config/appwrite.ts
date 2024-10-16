import { Client, Databases, Account, Storage } from 'node-appwrite'

// Admin Client
const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)  // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)   // Your project ID
        .setKey(process.env.NEXT_APPWRITE_KEY as string);

    return {
        get account() {
            return new Account(client)
        },
        get databases() {
            return new Databases(client)
        },
        get storage() {
            return new Storage(client)
        },
    }
}


// Session Client
const createSessionClient = async (session: string) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)  // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)             // Your project ID

    if (session) {
        client.setSession(session)
    }

    return {
        get account() {
            return new Account(client)
        },
        get databases() {
            return new Databases(client)
        },
    }
}

export { createAdminClient, createSessionClient }
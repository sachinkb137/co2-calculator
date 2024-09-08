import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    // defining methods
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call some method
                console.log('inside appwrite creating account');
                return this.login({ email, password })
            }
            else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            console.log('inside login appwrite');
            
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite Services :: getCurrentUser :: error', error);
        }
        return null;
    }

    async logout() {
        try {
            // console.log('user is logged out');
            return await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrtite Services :: logout :: error', error);
        }
    }
}

// object of the class
const authService = new AuthService()

export default authService

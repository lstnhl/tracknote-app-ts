declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        MONGO_URI: string;
        SALT: string;
        SALT2: string;
        STORAGE_DIR: string;
    }
}
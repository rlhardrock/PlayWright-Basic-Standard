import dotenv from 'dotenv'
dotenv.config()

export const URLS = {
    URL_SAUCE: process.env.URL_MAIN
}

export const CREDENTIALS = {
    USER: process.env.LOG_USER,
    PASSWORD: process.env.LOG_PASSWORD
}

export const CLIENT = {
    NAME: process.env.USER_F_NAME,
    SURNAME: process.env.USER_L_NAME,
    ZIPCODE: process.env.ZIP_CODE
}
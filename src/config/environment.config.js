import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT = {
    PORT: process.env.PORT,
    MONGODB_URI_STRING: process.env.MONGODB_URI_STRING,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    URL_API_BACKEND: process.env.URL_API_BACKEND,
    URL_FRONTEND: process.env.URL_FRONTEND,
    
}

export default ENVIRONMENT
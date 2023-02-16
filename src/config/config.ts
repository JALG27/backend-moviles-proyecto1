export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: "mongodb+srv://JALG:administrator@basededatos.h0esmuw.mongodb.net/?retryWrites=true&w=majority",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD 
    }
}

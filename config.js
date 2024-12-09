module.exports = {
    app: {
        port: process.env.PORT || 3000 // Sử dụng PORT do Railway cung cấp hoặc mặc định là 3000
    },
    database: {
        connection: process.env.MONGO_URI || 'mongodb://localhost:27017/shopping',
        option: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        }
    },
    session: {
        key: process.env.SESSION_KEY || '27bda112-99dd-4496-8015-ea20d1034228' // Sử dụng SESSION_KEY từ biến môi trường
    }
};
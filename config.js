const config = {
    development: {
        database: {
            mongoUri: 'mongodb://localhost:27017',
            dbName: 'rw-code'
        }
    },
    production: {
        database: {
            mongoUri: '',
            dbName: ''
        }
    }
}

export default config[process.env.NODE_ENV === 'development' ? 'development' : 'production'];
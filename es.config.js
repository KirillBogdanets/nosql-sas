module.exports = {
    apps: [
        {
            name: "chess-app-sas",
            script: "chess-app.js",
            instances: 4,
            exec_mode: "cluster",
            env: {
                "NODE_ENV": "DEV",
                "MONGO_URL": process.env.MONGO_URL,
                "X_API_KEY": process.env.X_API_KEY,
            }
        }
    ]
}
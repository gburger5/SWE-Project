import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./user"
import { Problem } from "./problem"
import { Achievement } from "./achievement"
import { Leaderboard } from "./leaderboard"

const config = require('../config/config.js');

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.pg_host,
    port: config.pg_port,
    username: config.pg_username,
    password: config.pg_password,
    database: config.pg_database,
    synchronize: true,
    logging: true,
    entities: [User, Achievement, Problem, Leaderboard],
    subscribers: [],
    migrations: [],
})

export default AppDataSource;
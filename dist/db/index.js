"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const config_1 = require("../config");
async function main() {
    const client = (0, postgres_1.default)(config_1.config.databaseUrl);
    const db = (0, postgres_js_1.drizzle)(client);
}
main();

require('dotenv').config();
module.exports = {
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramUsersAllowlist: JSON.parse(process.env.TELEGRAM_USERS_ALLOWLIST || "{}")
}
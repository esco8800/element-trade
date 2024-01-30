import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

const bot = new TelegramBot(config.tgToken, {polling: true});

export function sendNotification(chatId, message) {
    bot.sendMessage(chatId, message);
}

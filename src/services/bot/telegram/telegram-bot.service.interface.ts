export interface TelegramBotConfig {
    token: string;
    allowlist: (string | number | undefined)[];
}
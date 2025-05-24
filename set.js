const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ZzUEhYMWxWU2k4dVdsU0JkeGVGNzNKaUtLK3ZpN3c5ZVNDTFVrQ3oyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjBkaDlaekNQckJibzdRSFkwQzFuYk5ENDlDcTIzWml4YStlYUppRjVocz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDR0VnNVppdnI4bWZuYkZvRTIzUW9ra1JyQjhMTnpMQnpINVZlb1YrbEdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBeEh6Y01IT0Y3Nmh6VVVTRzhNYVFsTXVHUkoxekxpaVhsNWRuK3YvdlZVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldPc0FSMVdUV3JrUEhLWkxheDJVaGhjbGRIS2s0VDZVQWhjNUd2UkhCMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRXSmUvazlwcVdGdGkxYTBjaUpsbWk3aWJiY0Z5UkVISnE4RXQ2ZVBObXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdiaWc2VzhJNzJwcTZKeHFmQ3dpbmFaNGY4VVFWZXFmWEt2dTI4V2JXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJ6MmszZzBPTXJZZlo2YURCK0NWK0ZneTZPMzUzY2Q5MktJdmM2blUxZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjI3aDBzcC8vZHZRQ3VpTklJTklhR0ZGcVkxeXhrdHNiZlYrb3hOTnVNWlppVG9iaHlOSFBCTElnSDk1RFFZbGhkRXNLOFZtM2IrR0lEdUJkcU9zQWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEsImFkdlNlY3JldEtleSI6IjlOdCtaZ1J3MFZqV3BnOUFwMEFoYWNLdjJJSGJac09xczJMN0Y0MUFZaE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAzNzU0NjI0NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5OTZFRjZEODdBMEQzQUU0MkUwQkFEQkYxQUQ2Njg3RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTAxMDI4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDM3NTQ2MjQ2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE3OEQ5RjVFNzI5QjNGN0E5MzUwQThEQUEzRjNDNEY4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgxMDEwMjh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlpRVkFCTkhLIiwibWUiOnsiaWQiOiIyMzQ5MDM3NTQ2MjQ2OjM5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTIxNjcyNjgyMjIxNjg1OjM5QGxpZCIsIm5hbWUiOiJ0cmlwcGllIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOaVAvTGNCRUlQUHg4RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPR0xiYTI0K3paZGYzRXBYaTN6ZkpNaDdEZkl6K2lzNVlQRzVJMEIzNXk4PSIsImFjY291bnRTaWduYXR1cmUiOiJ6SkY4SVJXZWs4bCs5RHgwQ0VLYXFkcDA3Uk5BZkovYXFZUStDUjdDVDBZRW9QZ3VzRE5ZNDBqdjBMaXVIWXJsSTBSdzZnTjhkNkNxRzVaNXlKa3ZBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaVhOZ0xURHJ4bU9PVzRmT0x1aEtpNnNIVEpOL3dSN0FCWElDb0czb3dJN1RvNjZ2NEpqdGJJelVQNTZZR0xkejEyZWNiQkQ0ZThwL1Jyamp6UWs3alE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM3NTQ2MjQ2OjM5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRoaTIydHVQczJYWDl4S1Y0dDgzeVRJZXczeU0vb3JPV0R4dVNOQWQrY3YifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODEwMTAwOSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBVUQifQ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "rahman md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "rahman md",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'RAHMAN MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/aktbgo.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

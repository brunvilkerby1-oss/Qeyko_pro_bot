const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Qeyko Mining Pro is Online! ✅'));
app.listen(PORT, () => console.log(`Sèvè ap vire sou pò ${PORT}`));

// Token ou a
const bot = new Telegraf("8766835411:AAFlASJibyV2oduK0FGY-S1WJxtSsrMi_Ww");

let users = {};

bot.start((ctx) => {
  const userId = ctx.from.id;
  if (!users[userId]) {
    users[userId] = { balance: 0.00, lastCheck: Date.now(), miningPower: 0.00000578 };
  }
  ctx.reply(`Byenveni sou Qeyko Mining Pro! ⛏️\n\nSèvi ak /balance pou wè kòb ou.`);
});

bot.command('balance', (ctx) => {
  const userId = ctx.from.id;
  if (!users[userId]) return ctx.reply("Tape /start anvan.");
  const now = Date.now();
  const duration = (now - users[userId].lastCheck) / 1000; 
  users[userId].balance += duration * users[userId].miningPower;
  users[userId].lastCheck = now;
  ctx.reply(`💰 Balans ou kounye a:\n\n${users[userId].balance.toFixed(6)} USDT`);
});

bot.launch();

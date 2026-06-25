import dotenv from 'dotenv';
dotenv.config();

import db from '../database/db.js';
import User from '../models/users.js';
import Member from '../models/member.js';

await db();

const users = await User.find({
  canLogin: false
}).lean();

console.log(`Encontrados ${users.length} membros`);

await Member.insertMany(users);

console.log('Membros copiados');

await User.deleteMany({
  canLogin: false
});

console.log('Membros removidos de users');

process.exit(0);
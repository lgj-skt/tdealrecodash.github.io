const express = require('express');
const AWS = require('aws-sdk');
const mysql = require('mysql2/promise');

const app = express();

// RDS 인증 정보 설정
AWS.config.update({
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  region: 'REGION',
});

// RDS 데이터베이스 연결 정보 설정
const connection = await mysql.createConnection({
  host: 'HOST',
  user: 'USER',
  password: 'PASSWORD',
  database: 'DATABASE_NAME',
});

// API 엔드포인트
app.get('/data', async (req, res) => {
  try {
    // 쿼리 실행
    const [rows] = await connection.execute('SELECT * FROM TABLE_NAME');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 실행
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

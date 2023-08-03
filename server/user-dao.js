'use strict';

const { db } = require('./db');
const crypto = require('crypto');



exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve(false); 
      }
      else {
        const user = {id: row.id, username: row.email, name: row.name, type: row.type};
        
        crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};




exports.changeType = (type, id) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE user 
                SET type = ?
                WHERE id =?`;
    db.run(sql, [type, id], (err) => {
      if(err)
        reject(err);
      else {
        resolve(true);
      }
    });
  });
};
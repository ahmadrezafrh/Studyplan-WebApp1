'use strict';
/* Data Access Object (DAO) module for accessing exams */

const { db } = require('./db');
const { cs, sp } = require('./studyplan');

// get all exams
exports.getCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT course.code, course.name, course.credits, max.maxstudents, incompatible.incourses, preparatory.precourses, course.enrolled
                FROM course
                LEFT JOIN max ON max.code = course.code
                LEFT JOIN incompatible ON incompatible.code = course.code
                LEFT JOIN preparatory ON preparatory.code = course.code`;
    db.all(sql, [], (err, rows) => {
      if(err)
        reject(err);
      else {
        const courses = rows.map(row => new cs(row.code, row.name, row.credits, row.maxstudents, row.incourses, row.precourses, row.enrolled));
        resolve(courses);
      }
    });
  });
};

exports.getStudyPlan = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT studyplan.studentid, course.code, course.name, course.credits
                FROM studyplan
                LEFT JOIN course ON studyplan.coursecode = course.code
                LEFT JOIN max ON max.code = course.code
                LEFT JOIN incompatible ON incompatible.code = course.code
                LEFT JOIN preparatory ON preparatory.code = course.code
                WHERE studyplan.studentid== ?;`;

    db.all(sql, [id], (err, rows) => {
      if(err)
        reject(err);
      else {
        const studyPlan = rows.map(row => new sp(row.code, row.name, row.credits));
        resolve(studyPlan);
      }
    });
  });
};


exports.deleteStudyPlan = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM studyplan
                WHERE studentid = ?`;
      db.run(sql, [id], (err) => {
        if(err)
          reject(err);
        else {
          resolve(true);
        }
      });
  });
};



exports.updateStudyPlan = (studyPlan, id) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO studyplan (studentid,coursecode)
                VALUES (?,?);`;
    studyPlan.codes.forEach((code) => {
      db.run(sql, [id, code], (err) => {
        if(err)
          reject(err);
        else {
          resolve(true);
        }
      });
    });
  });
};

exports.addEnrolled = (studyPlan) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE course SET enrolled = enrolled + 1 WHERE code = ?`;
    studyPlan.codes.forEach((code) => {
      db.run(sql, [code], (err) => {
        if(err)
          reject(err);
        else {
          resolve(true);
        }
      });
    });
  });
};


exports.removeEnrolled = (studyPlan) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE course SET enrolled = enrolled - 1 WHERE code = ?`;
    studyPlan.codes.forEach((code) => {
      db.run(sql, [code], (err) => {
        if(err)
          reject(err);
        else {
          resolve(true);
        }
      });
    });
  });
};
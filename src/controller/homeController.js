import pool from '../configs/connectDB';
import multer from 'multer';

let getHomePage = async (req, res) => {
  //logic
  const [rows, fields] = await pool.execute('SELECT * FROM `Users`');

  return res.render('index.ejs', { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute(`SELECT * FROM Users WHERE ID = ?`, [userId]);

  console.log(user[0]);
  return res.send(JSON.stringify(user));
};

let addNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  await pool.execute(
    `INSERT INTO Users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );

  return res.redirect('/');
};

let deleteUser = async (req, res) => {
  let userID = req.body.userID;
  await pool.execute(`DELETE FROM Users WHERE ID = ?`, [userID]);

  return res.redirect('/');
};

let editUser = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute(`SELECT *FROM Users WHERE ID = ?`, [id]);

  return res.render('update.ejs', { dataUser: user[0] });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, ID } = req.body;

  await pool.execute(
    `UPDATE Users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE ID = ? `,
    [firstName, lastName, email, address, ID]
  );

  return res.redirect('/');
};

let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs');
};

let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send('Please select an image to upload');
  }

  res.send(
    `You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`
  );
};

let handleUploadMutipleFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send('Please select an image to upload');
  }

  let result = 'You have uploaded these images: <hr />';
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload-file">Upload more images</a>';
  res.send(result);
};

module.exports = {
  getHomePage,
  getDetailPage,
  addNewUser,
  deleteUser,
  editUser,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMutipleFile,
};

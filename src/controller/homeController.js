import pool from '../configs/connectDB';

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

module.exports = {
  getHomePage,
  getDetailPage,
  addNewUser,
  deleteUser,
  editUser,
  updateUser,
};

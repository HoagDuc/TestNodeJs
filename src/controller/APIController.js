import pool from '../configs/connectDB';

let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `Users`');

  return res.status(200).json({
    message: 'ok',
    data: rows,
  });
};

let createUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;

  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: 'missing required param!',
    });
  }

  await pool.execute(
    `INSERT INTO Users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: 'ok',
  });
};

let deleteUser = async (req, res) => {
  let userID = req.params.ID;
  if (!userID) {
    return res.status(200).json({
      message: 'missing required params!',
    });
  }

  await pool.execute(`DELETE FROM Users WHERE ID = ?`, [userID]);

  return res.status(200).json({
    message: 'ok',
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, ID } = req.body;
  if (!firstName || !lastName || !email || !address || !ID) {
    return res.status(200).json({
      message: 'missing required param!',
    });
  }

  await pool.execute(
    `UPDATE Users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE ID = ? `,
    [firstName, lastName, email, address, ID]
  );

  return res.status(200).json({
    message: 'ok',
  });
};

module.exports = { getAllUser, createUser, deleteUser, updateUser };

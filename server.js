const { Sequelize, DataTypes } = require("sequelize");

// 1. replace the 'users_db' with the database name you've created using mysql workbench
// 2. replace 'root' with your mysql workbench username
// 3. replce "password@123" with your mysql workbench password.
const sequelize = new Sequelize("users_db", "root", "Password@123", {
  host: "localhost",
  dialect: "mysql",
});

// 4. In this step we are creating a connection between our sql database and our js file.
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// 5. Use the following code snippet to create a new user table in your database.
const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// 6. In this step we are synchronizing our table format with the table in our database and creating a new table called users in our db.
// sequelize
//   .sync()
//   .then(() => {
//     console.log("User table created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table : ", error);
//   });
// 7. Use the following code snippet to create a new record
// sequelize
//   .sync()
//   .then(() => {
//     User.create({
//       name: "chaitanya",
//       email: "chaitanya.makala@masaischool.com",
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.error("Failed to create a new record : ", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Unable to create new record : ", error);
//   });

// 8. Use the following code snippet to read the table contents
sequelize
  .sync()
  .then(() => {
    User.findAll()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

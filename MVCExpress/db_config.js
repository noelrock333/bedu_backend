const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://127.0.0.1:5432/bedu_travels');

const Destination = sequelize.define("destinations", {
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.TEXT
}, {
  timestamps: false
});

const User = sequelize.define("users", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

module.exports = {
  Destination,
  User
};

// async function connect() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// module.exports = connect;
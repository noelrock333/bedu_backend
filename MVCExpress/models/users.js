const db = require('../db_config');

const create = async (user) => {
  try {
    await db.User.create(user);
    return true;
  } catch (err) {
    throw Error(err);
  }
}

const getByEmail = async (email) => {
  try {
    const user = await db.User.findOne({
      raw: true,
      where: { email: email }
    });
    return user;
  } catch (err) {
    throw Error(err);
  }
}

module.exports = {
  create,
  getByEmail,
};

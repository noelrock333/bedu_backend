const db = require('../db_config');

const getAll = async () => {
  try {
    const destinations = await db.Destination.findAll({ raw: true });
    console.log(destinations);
    return destinations;
  } catch (err) {
    console.log(err);
  }
}

const create = async (destination) => {
  try {
    await db.Destination.create(destination);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const getById = async (id) => {
  try {
    const destination = await db.Destination.findOne({
      raw: true,
      where: { id: id }
    });
    return destination;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const update = async (id, destination) => {
  try {
    await db.Destination.update(destination, {
      where: { id: id },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

const destroy = async (id) => {
  try {
    await db.Destination.destroy({
      where: {
        id: id
      }
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  destroy,
}
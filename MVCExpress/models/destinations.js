const destinations = require('../destinations');

const getDestinations = () => {
  return destinations;
}

const updateDestination = (id) => {

}

const getDestination = (id) => {
  return destinations.find(item => item.id == id);
}

module.exports = {
  getDestinations,
  updateDestination,
  getDestination
}
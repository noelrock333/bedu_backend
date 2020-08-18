let id = 0;
const destinations = [
  {
    id: id,
    title: 'Playa paradisiaca',
    description: 'Esta playa está bien bonita, deberías venir a visitarla, welcome to acapulco we',
    image: '/images/playa.jpg'
  },
  {
    id: ++id,
    title: 'Bosque nordico',
    description: 'Este es uno de los bosques más frondosos de el mundo con el mejor clima',
    image: '/images/bosque.jpg'
  }
];

module.exports = destinations;
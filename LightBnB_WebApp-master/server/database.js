const pool = require('./index.js');

/// Users

// Get a single user from the database given their email.
const getUserWithEmail = function(email) {
  //Query Params
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE email = $1;
  `
  email = [email];
  // Database Query
  return pool.query(queryString, email)
  .then((res) => res.rows[0])
  .catch((err) => {
    console.error('query error', err.stack)
  });
}
exports.getUserWithEmail = getUserWithEmail;

// Get a single user from the database given their id.
const getUserWithId = function(id) {
  //Query Params  
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE id = $1;
  `
  id = [id];
  // Database Query
  return pool.query(queryString, id)
  .then((res) => res.rows[0])
  .catch((err) => {
    console.error('query error', err.stack)
  });
}
exports.getUserWithId = getUserWithId;

// Add a new user to the database.
const addUser =  function(user) {
  //Query Params 
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  const values = [user.name, user.email, user.password];
  // Database Query
  return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch((err) => {
    console.error('query error', err.stack)
  });
}
exports.addUser = addUser;

/// Reservations

// Get all reservations for a single user.
const getAllReservations = function(guest_id, limit = 50) {
  //Query Params
  const queryString = `
  SELECT properties.id, properties.title, properties.city, properties.cost_per_night, start_date, end_date, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url, cover_photo_url, AVG(property_reviews.rating) as average_rating
  FROM reservations
  LEFT JOIN properties ON reservations.property_id = properties.id
  LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;
  `
  const values = [guest_id, limit];
  // Database Query
  return pool.query(queryString, values)
  .then(res => res.rows)
  .catch((err) => {
    console.error('query error', err.stack);
  });
}
exports.getAllReservations = getAllReservations;

const addReservation = function(reservation) {
  //Query Params
  const insertReservation = `
  INSERT INTO reservations (guest_id, property_id, start_date, end_date)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `
  const values = [reservation.owner_id, reservation.property_id, reservation.reservation_start_date, reservation.reservation_end_date];
  //Database Query
  return pool.query(insertReservation, values)
  .then(res => {
    return res.rows
  })
  .catch((err) => {
    console.error('query error', err.stack);
  });
}
exports.addReservation = addReservation;


/// Properties

// Get all properties.
const getAllProperties = function(options, limit = 50) {
  //Query Params
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  LEFT JOIN property_reviews ON property_id = properties.id
  `
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
    queryParams.push(Number(options.owner_id));
    queryString += `owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `cost_per_night <= $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
    queryParams.push(`${options.minimum_rating}`);
    queryString += `rating >= $${queryParams.length} ` 
  }
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `
  // Database Query
  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch((err) => {
    console.error('query error', err.stack);
  });
}
exports.getAllProperties = getAllProperties;

// Add a property to the database
const addProperty = function(property) {
  //Query Params
  const insertProperty = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, Number(property.parking_spaces), Number(property.number_of_bathrooms), Number(property.number_of_bedrooms)];
  // Database Query
  return pool.query(insertProperty, values)
  .then(res => res.rows)
  .catch((err) => {
    console.error('query error', err.stack);
  });
}
exports.addProperty = addProperty;
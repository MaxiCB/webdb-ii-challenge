
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, vin: 'vin0', make: 'make', model: 'model', transmission: 'standard', status: 'Salvage', mileage: '200'},
        {id: 2, vin: 'vin1', make: 'make', model: 'model', mileage: '200'},
        {id: 3, vin: 'vin2', make: 'make', model: 'model', mileage: '200'},
      ]);
    });
};
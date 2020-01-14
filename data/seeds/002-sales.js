
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {id: 1, price: 100, data: "12/28/2019", car_ID: 1},
        {id: 2, price: 100, data: "12/28/2019", car_ID: 2},
        {id: 3, price: 100, data: "12/28/2019", car_ID: 3}
      ]);
    });
};

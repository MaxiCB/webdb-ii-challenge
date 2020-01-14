exports.up = function(knex, Promise) {
    return knex.schema.createTable("sales", tbl => {
      tbl.increments();
      tbl.decimal("price", 128);
      tbl.string("data", 128).notNullable();
      tbl.decimal("car_ID", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("sales");
  };
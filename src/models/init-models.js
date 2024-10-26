import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food_type from  "./food_type.js";
import _foods from  "./foods.js";
import _orders from  "./orders.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const food_type = _food_type.init(sequelize, DataTypes);
  const foods = _foods.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  foods.belongsTo(food_type, { as: "type", foreignKey: "type_id"});
  food_type.hasMany(foods, { as: "foods", foreignKey: "type_id"});
  orders.belongsTo(foods, { as: "food", foreignKey: "food_id"});
  foods.hasMany(orders, { as: "orders", foreignKey: "food_id"});
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  rate_res.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id"});

  return {
    food_type,
    foods,
    orders,
    rate_res,
    restaurant,
    users,
  };
}

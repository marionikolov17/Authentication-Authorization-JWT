'use strict';
import { Model, DataTypes } from "sequelize";
import connection from "./../connection";

interface UserAttributes {
  
}

class Users extends Model {
  
}

Users.init(
  {

  }, {
    tableName: "Users",
    sequelize: connection
  }
);

export default Users;
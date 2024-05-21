import { Sequelize } from 'sequelize';

let sequelizeConnection: Sequelize = new Sequelize("test_ts", "root", "admin56Mn7=33Zz", {
  host: "localhost",
  dialect: 'mysql',
  port: 3306, 
});

export default sequelizeConnection;
import Sequelize from 'sequelize';

export default {
  opt: {
    engine: 'MYISAM',
    underscored: true,
    updatedAt: false,
    tableName: 'Stocks'
  },
  attr: {
    rowId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }
};

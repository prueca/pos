import Sequelize from 'sequelize';

export default {
  opt: {
    engine: 'MYISAM',
    underscored: true,
    timestamps: false,
    tableName: 'Orders'
  },
  attr: {
    orderId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    }
  }
};

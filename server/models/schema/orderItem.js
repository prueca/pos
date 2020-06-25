import Sequelize from 'sequelize';

export default {
  opt: {
    engine: 'MYISAM',
    underscored: true,
    timestamps: false,
    tableName: 'OrderItems'
  },
  attr: {
    itemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: Sequelize.INTEGER,
      unique: 'compositeKey'
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'compositeKey'
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null
    }
  }
};

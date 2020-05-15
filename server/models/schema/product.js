import Sequelize from 'sequelize';

export default {
  opt: {
    engine: 'MYISAM',
    underscored: true,
    tableName: 'Products'
  },
  attr: {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
};

module.exports =  (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        nome:{
            type: DataType.STRING,
            allowNull: false, 
        },
        login:{
            type: DataType.STRING,
            allowNull: false, 
        },
        email:{
            type: DataType.STRING,
            allowNull: false, 
        },
        senha:{
            type: DataType.STRING,
            allowNull: false, 
        }





    })

    return Users;
}
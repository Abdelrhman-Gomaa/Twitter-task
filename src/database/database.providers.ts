import { Sequelize } from "sequelize-typescript";
import { Follower } from "src/follower/entities/follower.entity";
import { React } from "src/react/entities/react.entity";
import { Tweet } from "src/tweet/entities/tweet.entity";
import { User } from "../user/entities/UserEntity";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () =>{
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER, // 'postgres'
        password: process.env.DATABASE_PASSWORD, //'pass123' 
        database: process.env.DATABASE_NAME,
        define: {
          timestamps: false
        }
      });
      sequelize.addModels([User,Tweet,Follower,React])//
      //await sequlize.sync();

      // Check dataBase Connection
      sequelize.authenticate()
      .then(() => {
        console.log('DataBase Connected Successfully');
      }).catch((err) => {
        console.log(`Oobs Database Can't Connected : ${err.message}`)
      })

      /*User.sync({alter: true})
        .then(() =>{
          console.log(`User synchronization In DB Successfully------------------------------`)
        }).catch((err) => {
          console.log(`Can't synchronization User In BD ------------------------------ ${err.message}`)
        });
      Tweet.sync({alter: true})
        .then(() =>{
          console.log(`Tweet synchronization In DB Successfully------------------------------`)
        }).catch((err) => {
          console.log(`Can't synchronization Tweet In BD ------------------------------ ${err.message}`)
        })
      Follower.sync({alter: true})
        .then(() =>{
          console.log(`Follower synchronization In DB Successfully------------------------------`)
        }).catch((err) => {
          console.log(`Can't synchronization Follower In BD ------------------------------ ${err.message}`)
        });
      React.sync({alter: true})
        .then(() =>{
          console.log(`React synchronization In DB Successfully------------------------------`)
        }).catch((err) => {
          console.log(`Can't synchronization React In BD ------------------------------ ${err.message}`)
        })*/

      sequelize.sync({alter: true})
        .then(() =>{
          console.log(`Models and relation synchronization In DB Successfully------------------------------`)
        }).catch((err) => {
          console.log(`Can't synchronization Models and relation In BD ------------------------------ ${err.message}`)
        });
      
      return sequelize;
    },
  },
];
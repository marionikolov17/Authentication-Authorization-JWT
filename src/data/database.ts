import { User } from "./../types/user";

const db: Array<User> = [
    {
        id: 1,
        username: "mario",
        password: "1234",
        role: "coach"
    },
    {
        id: 2,
        username: "ivan",
        password: "1234",
        role: "trainee"
    }
]

export default db;
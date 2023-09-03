const router = require("express").Router()
const UsersRouter = require("./users/userRouter")
const authRouter = require("./auth/authRouter")
const Todo = require('./toDos/todoRoutes')

router.get("/", (req,res) =>{
    res.send('api running...!')
})
router.use("/", Todo )
router.use("/", UsersRouter)
router.use("/auth", authRouter)

module.exports = router

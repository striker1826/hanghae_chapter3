const express = require("express");
const app = express();
const connect = require('./schemas');
connect();
const port = 3000;

const postsRouter = require("./routes/posts")
const commentsRouter = require("./routes/comments");

// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/posts", postsRouter);

app.use("/comments", commentsRouter);


app.listen(port, () => {
    console.log(port, "번 포트로 서버가 열렸습니다.")
})


const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const Posts = require("../schemas/post")


// 게시글 조회
router.get("/", async(req, res) => {
    const posts = await Posts.find().sort({createdAt: -1})
    
    const data = []
    for (let i=0; i< posts.length; i++) {
        data.push({
            postId: posts[i]._id,
            title: posts[i].title,
            user: posts[i].user,
            data: posts[i].createdAt
        })
    }
    console.log(data)
    return res.json(data)
})

// 게시글 작성
router.post("/", async (req, res) => {
    console.log(req.body)

    const {user, password, title, content} = req.body;
    try {
        const createdPost = await Posts.create({user, password, title, content})
        return res.json({message: "게시글을 생성하였습니다."})
    }
    catch (e) {
        res.status(400).json("댓글 내용을 입력해주세요")
    }
})

// 게시글 상세 조회
router.get("/:boardId", async(req, res) => {

    const {boardId} = req.params;
   
    try {
        const post = await Posts.find({ _id : boardId});
        
        data = {
            user : post.user,
            createdAt : post.createdAt,
            content : post.content
        }
        res.json(data)
    }
    catch(e) {
        return res.status(400).json({ success: false, errorMessage: "해당 Id를 찾을 수 없습니다."})
    }
})

// 게시글 수정
router.put("/:boardpassword", async (req, res) => {

    const { boardpassword } = req.params;
    
    const { password, title, content, user } = req.body;
    
    try { 
        await Posts.findOneAndUpdate( {password: boardpassword}, {title : title, content : content, user: user}, {new : true});
        res.json({ result: "success" })
    }catch(e){
        return res.status(400).json({ success: false, errorMessage: e });
    }   
});

// 게시글 삭제
router.delete("/:_postId", async(req, res) => {
    
    const { boardId } = req.params;

    try {
        await Posts.deleteOne({ password : boardId})
        return res.json({message: "게시글을 삭제하였습니다."})
    }
    catch(e) {
        return res.status(400).json({success: false, errorMessage: "비밀번호가 일치하지 않습니다."})
    }
    
})

module.exports = router;



const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment")

// 댓글 생성
router.post("/:commentId", async(req, res) => {

    const { commentId } = req.params;
    const { user, password, content } = req.body;

    try {
        if (content == "") {
            return res.status(400).json("댓글을 입력해 주세요")
        }
        
        else {
            await Comment.create({ user, password, content, commentId})
            res.json({message: "댓글을 생성하였습니다."})
        }
    
    }
    catch (e) {
        return res.status(400).json("일치하는 ID가 없습니다.")
    }
    
        

})

// 댓글 목록 조회
router.get("/:boardId", async(req, res) => {
    const {boardId} = req.params;

    const comments = await Comment.find({ commentId : boardId }).sort({createdAt : -1})
    const data = []
    console.log(comments)
    for (let i=0; i < comments.length; i++) {
        data.push({
            commentId: comments[i]._id,
            usre: comments[i].user,
            content: comments[i].content,
            createdAt: comments[i].createdAt
        })
    }

    try {
        return res.json(data)
    }
    catch (e) {
        return res.status(400).json("댓글 목록 조회에 실패하였습니다.")
    }
})

// 댓글 수정
router.put("/:boardPw", async(req, res) => {
    const { boardPw } = req.params;
    const { content } = req.body;

    try {
        await Comment.findOneAndUpdate( {password: boardPw}, {content: content}, {new: true})
        res.json({massage:"댓글을 수정하였습니다."})
    }
    catch (e) {
        res.status(400).json(e)
    }
})

// 댓글 삭제
router.delete("/:boardId", async(req, res) => {
    const { boardId } = req.params;
    console.log(boardId)
    try {
        await Comment.findByIdAndDelete({boardId})
        res.json("댓글을 삭제했습니다.")
    }
    catch (e) {
        return res.status(400).json({success: false, errorMessage: "Id와 일치하는 댓글이 없습니다."})
    }
})

module.exports = router;


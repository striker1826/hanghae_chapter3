const mongoose = require("mongoose");

const connect = () => {
    mongoose
    .connect('mongodb+srv://test:win1358!@cluster0.bhsxk33.mongodb.net/?retryWrites=true&w=majority', { dbName: 'myDataBase' }), 
    
    {   ignoreUndefined: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
        }
    
    // .catch(err => console.log(err));
}

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
// mongoose.://test:win1358!@127.0.0.1:27017/
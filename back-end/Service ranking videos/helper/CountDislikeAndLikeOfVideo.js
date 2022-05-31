
let getInforAboutLikeAndDislikeOfVideo = async (userid, videoid, connectDB) => {
    let numberRowLike = await countRowLikedByVideoidAndUserid(userid, videoid, connectDB);
    let numberRowDislike = await countRowDislikedByVideoidAndUserid(userid, videoid, connectDB);
    let numberTotalLikeAndDislike = numberRowLike + numberRowDislike;

    return {
        numberRowLike: numberRowLike, 
        numberRowDislike: numberRowDislike, 
        numberTotalLikeAndDislike: numberTotalLikeAndDislike
    };
}

let countRowLikedByVideoidAndUserid = (userid, videoid, connectDB) => {

    return new Promise((resolve, reject) => {
        let stringQuery = "SELECT COUNT(id) AS total FROM likevideo WHERE videoid="+videoid;
        connectDB.query(stringQuery, function(error, result){
            if (error) {
                // lỗi kết nối.
                console.log('some error happen in connect');
                
                //return reject(error);
                return reject('some error happen in connect');
            }

            console.log('have found rowliked');
            return resolve(result[0].total);
        });
    })
}

let countRowDislikedByVideoidAndUserid = (userid, videoid, connectDB) => {
        
    return new Promise((resolve, reject) => {
        let stringQuery = "SELECT COUNT(id) as total FROM dislikevideo WHERE videoid="+videoid;
        connectDB.query(stringQuery, function(error, result){
            if (error) {
                // lỗi kết nối.
                console.log('some error happen in connect');
                
                //return reject(error);
                return reject('some error happen in connect');
            }

            console.log('have found rowdisliked');
            //console.log(result[0].total);
            return resolve(result[0].total);
        });
    })
    
}

module.exports = getInforAboutLikeAndDislikeOfVideo;
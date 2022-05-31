const jwtHelper = require("../helper/JwtHelper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "123";

// hàm kiểm tra so token.
let isAuth = async (req, res, next) => {
    console.log("đã đi đến Auth Middleware");

    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là nên truyền token vào header
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    
    if (tokenFromClient) {
      //console.log("duma lan 2");
      //console.log(tokenFromClient);
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;
            // Cho phép req đi tiếp sang controller, hoặc api.
            console.log('ngon rồi, token hợp lệ rồi')
            console.log("đã đi qua xong Auth Middleware");
            next();
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, để đây để debug lỗi cho các khi đang trong giai đoạn dev xem thôi
            debug("Error while verify token:", error);
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
      // Không tìm thấy token trong request
      // ps: nếu không tìm thấy token đây có thể là do người dùng tự nhập url vào, nên hãy gửi lại yêu cầu client đính kèm token để kiểm tra
      // nếu client trả lời không có token thì redirect sang login.
      
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
}

module.exports = {
  isAuth: isAuth,
};
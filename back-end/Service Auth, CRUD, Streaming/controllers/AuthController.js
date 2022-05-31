const jwtHelper = require("../helper/JwtHelper");
const UserModel = require("../models/UserModel");
const debug = console.log.bind(console);



// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "123";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "456";



/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let userData = null;
let login = async (req, res) => {
  try {
    // debug(`--Đang giả lập hành động đăng nhập thành công với Email: ${req.body.login[0]} và Password: ${req.body.login[1]}`);
    debug(`--Server nhận được thông tin thành công với Email: ${req.body.email} và Password: ${req.body.password}`);
    console.log(req.body);
    

    let emailData = req.body.email;
    let passwordData = req.body.password;

    UserModel.getUserWithEmailAndPassword(emailData, passwordData)
      .then((data) => {
        let userData = Object.assign({}, data); 
        console.log(userData); 
        createAccessTokenAndRefreshToken(userData, res);
      })
      .catch((err) => {
        console.log(err); 
        //res.status(500).json({"loginResult": false});
        if (err === 'some error happen in connect') {
          res.status(200).json({errorLogin: 'some error happen in connect'})
        }

        if (err === 'dont exist account with that email or password like that') {
          res.status(200).json({errorLogin: 'dont exist account with that email or password like that'})
        }

        res.redirect('/sign-in');
      }
    );

    

    // UserModel.getUserWithEmailAndPassword(req.body.login[0], req.body.login[1], function(result) {
    //   console.log('kết quả login là: ' + result);
    //   if (result === -1) {

    //     return res.status(500).json({"loginResult": false});
    //   } else {
    //     //userData = Object.assign({}, result);
        
    //   }
    // });
    
    // Mình sẽ comment mô tả lại một số bước khi làm thực tế cho các bạn như sau nhé:
    // - Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
    // - Nếu chưa tồn tại thì reject: User not found.
    // - Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
    // - Nếu password sai thì reject: Password is incorrect.
    // - Nếu password đúng thì chúng ta bắt đầu thực hiện tạo mã JWT và gửi về cho người dùng.
    // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:
  
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
///////////////////////////////////////////////////////////////////////////////

const createAccessTokenAndRefreshToken = async (userData, res) => {
  
    debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
    debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
    const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
    console.log({accessToken, refreshToken})
    
    sendTokenAndRefreshTokenToClient(userData, accessToken, refreshToken, res);
  
}


const sendTokenAndRefreshTokenToClient = (userData, accessToken, refreshToken, res) => {
  // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
    // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
    tokenList[refreshToken] = {accessToken, refreshToken};
    
    debug(`Gửi Token và Refresh Token về cho client...`);

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return res.status(200).json({accessToken, refreshToken, username: userData.username, profileurl: userData.profileurl, id: userData.id, role: userData.role});
  
}

//////////////////////////////////////////////////////////////////////////////

// hàm refresh lại token mới.
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // debug("tokenList: ", tokenList);
  
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;
      debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({accessToken});
    } catch (error) {
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      debug(error);
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

module.exports = {
  login: login,
  refreshToken: refreshToken,
};
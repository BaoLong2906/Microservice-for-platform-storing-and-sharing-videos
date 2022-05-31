let BestChoiceModel = require('../models/BestChoiceModel');

let baseURL = require("../helper/ServerOriginURL");
let linkImageStore = baseURL + "/images/";

let getTop3 = async (req, res) => {
    console.log("đã đi đến getTop3 trong BestChoiceController");
    try {
        BestChoiceModel.getTop3().then((data) => {
            return res.status(200).json(data);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


module.exports = {
    getTop3: getTop3,   
};
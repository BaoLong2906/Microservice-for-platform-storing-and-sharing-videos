from flask import Flask, render_template, redirect, url_for, Blueprint, request, session, jsonify
import os
from PIL import Image
from io import BytesIO
import keras
from keras import Sequential
import numpy as np
import requests

app = Flask(__name__)
folder_names = ["Unknown", "bóng cười", "ma túy", "đánh nhau", "súng đạn"]

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/predictImage', methods=['GET', 'POST'])
def predictFood():
    print(request)
    # lấy thông tin về URL của ảnh nhận được từ API.
    imageURL = request.args.post('imageURL')

    # lấy data của ảnh nhận được từ URL.
    imageResponse = requests.get(imageURL)

    # thực hiện chuyển đổi data đó sang dạng ma trận.
    imageData = Image.open(BytesIO(imageResponse.content))
    imageData = imageData.resize((200, 200), Image.ANTIALIAS)
    print(imageURL)
    imageNumpyArray = np.zeros((1, 200, 200, 3))
    imageNumpyArray[0, :, :, :] = np.asarray(imageData, dtype='int32')

    # thực hiện chạy chương trình dự đoán từ model đã train.
    predictionResult = cnnPredict(imageNumpyArray)

    # tạo đối tượng json lưu trữ các dữ liệu dự đoán.
    # data = {
    #     "unknow": predictionResult[0],
    #     "sungdan": predictionResult[4],
    #     "matuy": predictionResult[2],
    #     "danhnhau": predictionResult[3],
    #     "bongcuoi": predictionResult[1] 
    # }

    if predictionResult[0] <= 10:
        data = {
            "result": "fail"
        }
        return jsonify(data)

    if predictionResult[0] > 10:
        data = {
            "result": "pass" 
        }
        return jsonify(data)

    # return jsonify(data)

    # hiện phần % dự đoán.
    #return render_template('result.html', foodURL=imageURL, unkownP=predictionResult[0], burgerP=predictionResult[4], frenchfriesP=predictionResult[2], cheesecakeP=predictionResult[3], pizzaP=predictionResult[1])

# hàm chạy chương trình dự đoán từ model đã train.
def cnnPredict(image):
    keras.backend.clear_session()
    model = Sequential()
    model = keras.models.load_model('hello.h5')
    predictions = model.predict(image)
    return predictions[0] * 100

app.secret_key = os.urandom(24)
if __name__ == "__main__":
	app.run('127.0.0.1', 9000, debug=True)



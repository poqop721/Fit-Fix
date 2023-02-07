from asyncio import sleep
import json
import os
from flask import Flask, request, jsonify, send_file
import numpy as np
import tensorflow as tf
from tensorflow import keras
from flask_cors import CORS, cross_origin
import cv2
from collections import deque
from datetime import datetime, date
import base64
import sys,io
import mediapipe as mp

global result_img
global sendResultImg
global prediction
global feedback
feedback=''
global count
global idCount
idCount = 1
app = Flask(__name__)
cors = CORS(app)


sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')




# def video():
#     if(request.method == "POST"):
#         bytesOfVideo = request.get_data()
#         with open('video.mp4', 'wb') as out:
#             out.write(bytesOfVideo)
#         return "Video read"


@app.route('/predict', methods=['GET', 'POST'])
def make_prediction():
    DeleteAllFiles('picture/')
    global count
    global feedback
    global result_img
    global prediction
    if (request.method == "POST"):
        encodedVideo = request.get_data()
        with open('video.mp4', 'wb') as out:
            out.write(encodedVideo)
        video = cv2.VideoCapture('video.mp4')
        count = 0
        while (video.isOpened()):
            ret, image = video.read()
            image = cv2.rotate(image, cv2.ROTATE_180)
            # 시간 설정, 30=1초 정도, 숫자 더 높이면 초 늘어남
            if ret and count<=30:
                if (int(video.get(1)) % 30 == 0): 
                    # 이미지 경로와 파일명
                    cv2.imwrite("picture/%d.jpg" % count, image) 
                    count += 1
            else:
                break
        video.release()
    # 모델 로딩
    model = keras.models.load_model('fit fix.h5')
    li1 = []
    li2 = []
    li3 = []
    for i in range(count):
        prediction = []
        img = tf.keras.utils.load_img('picture/' + str(i) + '.jpg', target_size=(224, 224, 3))
        input_arr = tf.keras.preprocessing.image.img_to_array(img)
        input_arr = np.array([input_arr]) / 255.0
        predictions = model.predict(input_arr)
        print(i, end=' ')
        #     print(predictions)
        for i in predictions:
            if i[0][0] >= 0.5:
                prediction.append(1)
            else:
                prediction.append(0)
        li1.append(prediction[0])
        li2.append(prediction[1])
        li3.append(prediction[2])
        #     num1+=abs(data[1]-prediction[0])
        #     num2+=abs(data[2]-prediction[1])
        #     num3+=abs(data[3]-prediction[2])
    queue1 = deque(li1[:5])
    queue2 = deque(li2[:5])
    queue3 = deque(li3[:5])
    li1 = deque(li1[5:])
    li2 = deque(li2[5:])
    li3 = deque(li3[5:])

    idx1 = []

    idx2 = []

    idx3 = []
    while li1:
        if sum(queue1) > 2:
            idx1.append(sum(queue1))
        else:
            idx1.append(0)

        if sum(queue2) > 2:
            idx2.append(sum(queue1))
        else:
            idx2.append(0)

        if sum(queue3) > 2:
            idx3.append(sum(queue1))
        else:
            idx3.append(0)
        queue1.append(li1.popleft())
        queue1.popleft()
        queue2.append(li2.popleft())
        queue2.popleft()
        queue3.append(li3.popleft())
        queue3.popleft()
    max_idx = -1
    max_n = 0
    idx = 0
    for i in zip(idx1, idx2, idx3):
        if sum(i) > max_n:
            max_idx = idx
            max_n = sum(i)
        idx += 1
    prediction=[idx1[max_idx],idx2[max_idx],idx3[max_idx]]
    max_idx=max_idx
    print('dfdfdf'+str(max_idx))
    result_img='picture/' + str(max_idx) + '.jpg'
    cv2.imwrite("feedbackImg/%d.jpg" % idCount, cv2.imread('picture/' + str(max_idx) + '.jpg')) 
    correct = 0
    #file_path='C:\\Users\\hongik\\Desktop\\test_video\\video1\\'
    for i in range(count):
        
        images = {str(i):cv2.imread('picture/'+str(i)+'.jpg')}
    #{name: cv2.imread(name) for name in uploaded.keys()}
        # Initialize MediaPipe Pose.
        mp_pose = mp.solutions.pose
        pose = mp_pose.Pose(
            static_image_mode=True, min_detection_confidence=0.5)

        # Prepare DrawingSpec for drawing the face landmarks later.
        mp_drawing = mp.solutions.drawing_utils
        drawing_spec = mp_drawing.DrawingSpec(thickness=2, circle_radius=2)

        photo_return_value=[]
        for name, image in images.items():
        # Convert the BGR image to RGB and process it with MediaPipe Pose.
            results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        # landmark 출력
            image_hight, image_width, _ = image.shape
            if not results.pose_landmarks:
                continue

        #오른쪽 무릎, 오른쪽 엉덩이 좌표 비교하고 리스트에 0또는 1저장
            right_knee = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE].y * image_width
            right_hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP].y * image_width
            print(right_knee-right_hip)
            if right_knee > right_hip:
                photo_return_value.append(0)
            else:
                photo_return_value.append(1)

        # Draw pose landmarks.
            # print(f'Pose landmarks of {name}:')
            # annotated_image = image.copy()
            # mp_drawing.draw_landmarks(
            #     image=annotated_image,
            #     landmark_list=results.pose_landmarks,
            #     connections=mp_pose.POSE_CONNECTIONS,
            #     landmark_drawing_spec=drawing_spec,
            #     connection_drawing_spec=drawing_spec)
            # cv2.imshow('dd',annotated_image)

        #photo_return_value 출력
            # print(f'photo_return_value 출력(1은 풀스쿼트) : {photo_return_value}')
        correct+=photo_return_value[0]
    # 피드백 내용
    feedback = {}
    # 결과 분석 및 피드백 생성
    if prediction[0] >= 1:
        feedback['• 시선이 정면을 향하고 있지 않습니다.'] = '시선은 정면을 향해야 하고 하이바 스쿼트를 하게 될 때 시선이 아래를 향하게 되면 등위 윗부분이 무너지면서 자세가 무너지게 됩니다. 하이바 스쿼트를 하게 되면 시선은 정면 또는 정면보다 10도 위를 바라봐 주세요. 체스트 업도 확실하게 되며, 힙드라이빙 구사가 편합니다.'
    if prediction[1] >= 1:
        feedback['• 무릎이 안쪽으로 말렸습니다.'] = '무릎이 엄지 발가락 방향보다 안쪽으로 향하게 되면 무릎으로 중량을 받게 되면서 무릎에 무리가 됩니다. 무릎은 엄지발가락 방향을 향해야합니다. 그러면서 중량을 허벅지 둔근 등 다양한 근육으로 받게 하면 됩니다. 자신의 자세에 맞는 다리 넓이와 각도를 찾으면 됩니다.'
    if prediction[2] >= 1:
        feedback['• 발 뒷꿈치가 떴습니다.'] = '발 뒷꿈치가 뜨게 되면 무릎에 힘이 실리게 됩니다. 발 뒷꿈치가 뜬다면 종아리의 유연성이 부족할 수 있습니다. 운동 시작 전에 폼롤러를 이용하여 종아리를 풀어주거나 스트레칭을 통해서 해결을 할 수 있습니다. 발바닥의 뒷꿈치 위주로 힘들 주면서 전체에 힘을 주셔야합니다.'
    if correct == 0:
        print(correct)
        feedback['• 풀 스쿼트가 아닙니다.'] = '풀 스쿼트란 엉덩이가 무릎 아래까지 내려가는 것을 말 합니다. 내려갈 때 엉덩이가 무릎 아래까지 내려갈 수 있도록 가동 범위를 늘려주세요.'
    print(456456)
    # DeleteAllFiles('picture/')
    return feedback

def DeleteAllFiles(filePath):
    if os.path.exists(filePath):
        for file in os.scandir(filePath):
            os.remove(file.path)
        return 'Remove All File'
    else:
        return 'Directory Not Found'

# @app.route('/feedbackImg', methods=['GET', 'POST'])
# def feedbackImg_data():
#     global result_img
#     if (request.method == "POST"):
#         jsonObject = request.get_data()
#         id = json.loads(jsonObject)
#         result_img='feedbackImg/' + str(id['id']) + '.jpg'
#     return send_file(result_img)

# @app.route('/getfeedbackImg')
#     def getfeedbackImg_data():
#         global result_img
#         return send_file(result_img)
@app.route('/feedbackImg', methods=['GET', 'POST'])
def feedbackImg_data():
    global result_img
    return send_file(result_img)

@app.route('/feedback')
def feedback_data():
    global result_img
    global feedback
    global idCount
    today = date.today()
    now = datetime.now()
    print('123123')
    data = {
        "id": idCount,
        "title": today.strftime('%Y년 %m월 %d일'),
        "time": str(now.hour)+ '시' + str(now.minute) + '분',
        "body": feedback,
        },
    idCount = idCount + 1
    return jsonify(data);

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)

# Fit Fix
 CNN 기반 웨이트 트레이닝 수행 능력 향상 피드백 앱 서비스

## 개발 기간
- 2022.03.02일 ~ 2023.01.10일

## 참여 인원
- 담당 교수님 : 소프트웨어융합학과 김병서 교수님 
- 컴퓨터정보통신공학과 B787041 황준하 
- 컴퓨터정보통신공학과 B789055 전성태 
- 컴퓨터정보통신공학과 B789073 홍준호
- 소프트웨어융합학과 B790055 하상범

## 설계 목표
- 전체 설계 목표:
    CNN 기반 웨이트(헬스) 트레이닝 운동 수행 능력 향상 피드백 앱 서비스 설계
- 본 설계 과제에서는 앱 서비스를 통해 2 차원 카메라로 촬영한 사용자의 웨이트 트레이닝 운동 영상을 CNN(Convolutional Neural Networks)기반으로 분석하여 잘못된 자세에 따른 피드백을 이미지와 함께 제안하여 사용자의 부상 방지와 운동 능력 수행 향상을 가져오는 시스템 개발을 목표로 하고 있다. 사용자의 웨이트 트레이닝 운동 영상에서 스켈레톤 벡터 정보를 활용하여 가동 범위에 대한 피드백을 추가로 제안함으로 사용자의 운동 효과를 극대화하기 위한 시스템을 개발한다.

## 설계 배경(필요성) 및 동기
1. 포스트 코로나 시대를 맞이하여 국민들의 건강에 대한 인식 변화
- 전국 만 20 세 이상 성인 남녀 1,000 명을 대상으로 진행한 ‘코로나 19 시대 국민 체중 관리 현황 및 비만 인식 조사(대한비만학회)’에 따르면, 국민 100 명 중 40 명이 코로나 19 사태 이전 대비 체중이 3kg 이상 증가한 것으로 나타났다. 사회적 거리두기 및 외부 활동 자제로 인해 운동량과 일상생활 활동량이 감소한 것이 주요 원인이다. 그러나 최근 코로나 19 의 장기화와 변이로 인해 사회적 거리두기가 완화되고, 나빠진 건강을 관리하기 위해 운동, 특히 웨이트와 홈 트레이닝에 대한 관심이 늘어나고 있다.


2. 운동을 처음 시작하는 사람들의 문제점 및 어려움
- 운동을 마음 먹고 헬스장에 가도 시간 당 5 만원
상당의 PT(physical training)를 초보자가 선뜻 쉽게
선택하기는 힘든 경우가 대부분이다. 아래
그래프를 통해 운동에 대한 전반적인 인식 평가가
‘운동도 시간적, 금전적 여유가 있어야 할 수 있다’
라는 여론을 확인할 수 있다. 또한 운동을 처음
시작하는 사람들은 올바른 자세의 필요성을
인지하지 못하는 경우도 많다. 운동에 대한 지식을 갖추지 못한 채 잘못된 자세의 운동이 반복되면 건강을 위한 운동이 오히려 통증으로 돌아갈 수 있다. 웨이트 운동 시 특정 근육에만 들어가야할 힘이 다른 근육에 분배되어 목표한 근육 외의 근육을 사용하게 되며, 근육 염좌나 기타 부상, 통증의 위험이 증가할 수 있다. 예를 들어 집에서 스쿼트를 한다고 하자. 평소 유연성이 떨어지는 사람의 경우 중심을 잡으려다 발 뒤꿈치를 들어 무릎 부상을 유발할 수 있다. 또한 스쿼트는 무릎 내측 인대 관절에 가해지는 부하가 크기 때문에 초보자들이 잘못된 자세로 수행할 경우 심하면 퇴행성 관절염의 원인이 될 수 있다. 그렇다면 PT 를 선택하지 않은 초보자들은 대부분 ‘Youtube’와 같은 세계 최대 규모의 동영상 공유 플랫폼을 사용한다. 하지만 ‘세계 최대’ 인 만큼 잘못된 정보도 그만큼 많으며, 올바른 정보라고 해도 정확히 따라하기 힘든 한계가 존재한다. 따라서 올바른 운동 자세를 알려줄 수 있는, 효율적이고 신뢰성 높은 운동 자세 학습의 새로운 수단이 필요하다. 그 대안으로 잘못된 운동 자세를 확인하고 올바른 자세를 통계적으로 제시해주는 어플리케이션을 제안하고자 한다.

    <img width="375" alt="스크린샷 2023-02-08 오전 1 49 40" src="https://user-images.githubusercontent.com/103736987/217309763-2185756c-d89d-40ac-81a7-ebf69f874a2d.png">


## 팀원의 역할
- 데이터 전처리 과정부터 어플리케이션 최종 설계까지 모든 과정을 자세하게 참여한다. 
- 데이터 전처리 과정은 모든 팀원이 나누어 진행하였다.
    - **홍준호 학생**은 앞서 언급한 전체 설계 과제 중 설계 제안 프레임워크의 실 성능 평가와 검증을 위해 필요한 머신 러닝 모델 부분을 담당하며 구현 업무 중 헬스트레이닝 자세 교정 모델을 설계 및 구현 하는 것과 전처리 과정에서 필요한 파이썬 opencv2 library 를 통해 학습 및 활용하는 것을 목표로 하며 이를 통해 머신 러닝 시스템의 동작 방식을 이해하고 Motion Detection 기술을 익히는 것을 목표로 한다. 
    - **하상범 학생**은 앱 설계 과정 중 필요한 응용프로그램 제작 및 Mediapipe(Google 의 Vision Recognition Technology)를 활용한 알고리즘 제작을 수행한다. 
    - **전성태 학생**은 Front-End 부분을 React Native Framework 로(리액트 네이티브는 페이스북이 개발한 오픈 소스 모바일 애플리케이션 프레임워크이다.
안드로이드, iOS, 웹, UWP 용 애플리케이션을 개발하기 위해 사용되며, 개발자들이 네이티브 플랫폼 기능과 더불어 리액트를 사용할 수 있게 한다.) 구현한다. 
    - **황준하 학생**은 서버를 위한 Back-End 부분을 Python Flask 를 이용하여 개발한다.
## 설계 내용 
### 1. 개요
- 적용 데이터셋 : AI Hub 에서 제공하는 ‘피트니스 자세 이미지 데이터’<br>
    <img width="476" alt="스크린샷 2023-02-08 오전 1 49 20" src="https://user-images.githubusercontent.com/103736987/217309661-86824f94-49c1-40e5-b350-e8998f8f2ede.png">

    - 동작 : 30종의 헬스 운동 동작(5개의 운동상태)
    - 수집 피사체 : 성별, 체형, 키 크기 등 다양한 형태
    - 촬영 Clip : 200,000 만 Clip (5 개 Multiview 로 40,000 만 Clip 수집) 
    - 기본 정보 : COCO 17 Skeleton keypoint
    - 주요 특징 : 정자세와 오류자세를 구분
- 데이터 전처리 과정<br>
    아래 그림 3) 에서 보이는 바와 같이, 차별화된 데이터 전처리를 위한 자작 툴 제작 후 사용

    <img width="626" alt="스크린샷 2023-02-08 오전 1 53 05" src="https://user-images.githubusercontent.com/103736987/217310708-06b23155-51d7-44dd-a44f-dacb9139032a.png">
 
- 스쿼트를 타겟으로 어플리케이션을 제작했다. 스쿼트를 수행하는데 필수적인 자세(피드백)를 논문에 근거하여 4 가지로 분류했다.
    1) 고개는 정면을 응시한다.
    2) 무릎은 발끝 방향과 맞아야 한다.
    3) 뒤꿈치가 뜨지 않아야 한다.
    4) 엉덩이가 무릎보다 내려가는 풀 스쿼트를 수행해야한다.<br><br>
  자세 4가지 중 1~3번 자세는 데이터 수집, 데이터 전처리, 데이터분석, 모델링 , 평가 및 적용까지 전 과정을 수행하며 머신 러닝 모델을 (Tensorflow 를 통해) 구현한다. 나머지 4 번 자세는 ‘Mediapipe’를 통해 알고리즘을 구현한다.

### 2. 자세 1~3 알고리즘 설계<br><br>
   <img width="725" alt="스크린샷 2023-02-08 오전 2 04 10" src="https://user-images.githubusercontent.com/103736987/217313454-416e5378-b956-4cd8-9832-dcd0bd5acdf7.png">


   카메라로 사용자의 운동 영상을 촬영한 후, 서버에서 머신 러닝을 기반으로 한 자세 분석을 통해 사용자 의 모바일 화면에 피드백을 보여준다.<br>
   우선, 잘못된 자세를 탐지하는데 시간적 특성이 필요하지 않음으로 동영상을 이미지로 분할 하여 모델을 수행한다.
   
   <img width="448" alt="스크린샷 2023-02-08 오전 2 06 48" src="https://user-images.githubusercontent.com/103736987/217314122-3cb0c205-6d33-40ac-ba90-8139f80af846.png">


 
   CNN 은 이미지의 특징을 추출하기 위하여 Input Data 를 Fileter 가 순회하여 합성곱을 계산하고, 그 계산 결과를 활용하여 Feature Map 을 만든다. Convolution Layer 는 Padding 적용 여부,Filter 의 크기, Stride, Max Pooling 크기에 따라서 출력 데이터의 Shape 이 변경된다.<br>
   한 이미지에서 잘못된 자세가 2 개 이상 나올 수 있음으로 multi-label classification 을 진행한다.
   
   <img width="423" alt="스크린샷 2023-02-08 오전 2 13 38" src="https://user-images.githubusercontent.com/103736987/217315870-414f91dc-0d02-499a-a878-eee607ddf30d.png">

   각 output에서 위에서 말한 자세 중 틀린 자세를 이진 분류로 판단하게 된다.<br>
   이미지 불균형을 해소하기 위해서 8 만장중 학습에는 37000 장을 사용했다. 학습시킨 모델은 resnet 과 Inception-v3 을 학습시켜 성능이 더 좋았던 Inception-v3 을 사용했다. 인셉션 모델의 특징은 인셉션 모듈안에 있는 1by1 conv 를 통해 학습 파라미터를 줄여 학습 시간을 단축시키는 장점이 있다. 모델을 설계하면서 overfitting 을 방지하기 위해서 dropout, data augmentation 과 early-stopping 을 사용했다. 이렇게 하여 학습시킨 정확도는 밑과 같이 84% ~ 89%의 정확도가 나왔다.

   <img width="804" alt="스크린샷 2023-02-08 오전 2 14 40" src="https://user-images.githubusercontent.com/103736987/217316105-1904e53e-2e41-4450-9e0c-5ad90bb65a09.png">
   
   <img width="613" alt="스크린샷 2023-02-08 오전 2 15 24" src="https://user-images.githubusercontent.com/103736987/217316276-7c96e6e1-c7f3-4134-a111-c6a4e0c25252.png">



### 3. 자세4 알고리즘 설계 과정
- 본 Opensource API MediaPipe 는 Google 에서 기계학습까지 마친 상태로 제공하는 서비스이다. 다양한 프로그램에서 사용하기 편하게 라이브러리 형태로 모듈화되어 제공되고, 사용방법 또한 풍 부하게 제공되기 때문에 몇가지 간단한 단계로 미디어파이프에서 제공하는 AI 기능을 탑재한 응용 프로그램개발이 가능하다.
- 아래 그림 14 에서 보이는 바와 같이, 신체 중 머리~발 까지의 신체를 특징점(feature point)으로 표현 하여 특히 작은 신체부위의 관절까지 포함한 스켈레톤을 데이터로 추출한다.

   <img width="583" alt="스크린샷 2023-02-08 오전 2 16 58" src="https://user-images.githubusercontent.com/103736987/217316634-6c03d5df-8380-41ac-82f3-f22be85fca49.png">


- 위 그림 15에서 보이는 바와 같이, (카메라가 오른쪽 방향을 향할 때 예시) 오른쪽 무릎의 스켈레톤 좌표와 오른쪽 엉덩이 좌표의 y 좌표를 비교하여 각 프레임 사진 별로 결과값을 리스트에 저장한다.

   <img width="610" alt="스크린샷 2023-02-08 오전 2 17 40" src="https://user-images.githubusercontent.com/103736987/217316808-44d86b17-ddfe-4805-bc13-b1a26ef330a0.png">

### 4. 백엔드 설계 과정<br>

   <img width="395" alt="스크린샷 2023-02-08 오전 2 19 56" src="https://user-images.githubusercontent.com/103736987/217317348-6d0743e7-1792-4a01-bea4-bc055580a32f.png">



- Python Flask 를 이용하여 Rest API Server 구축
    - 가상환경 생성 – 패키지 간 충돌을 방지하고 다른 환경에서 작업하게 되더라도 필요한 패키지만 동일한 버전으로 설치할 수 있게 가상환경을 생성해주었다. Python 에 내장되어 있는 모듈인 venv 를 사용하였고 가상환경에서 설치한 패키지들은 requirements.txt 파일로 저장해 두었다.
    - 간단한 엔드포인트 구현 – 먼저 Python Flask 를 사용하여 API 서버와 필요한 간단한 라우트를 구현해 보았다. 포트번호는 8000 으로 설정해주었고 메인 라우트에서는 ‘Hello World!’라는 문장을 보여준다. 이후 딥러닝 모델로 이미지를 분석할 (‘/predict’) 라우트와 분석한 결과를 프론트엔드로 보내줄 (‘/feedback’) 라우트도 미리 구현해보았다.
    <img width="387" alt="스크린샷 2023-02-08 오전 2 21 26" src="https://user-images.githubusercontent.com/103736987/217317696-7d2b7468-ffa4-432e-b7d0-6caf86c03ee4.png">


- 서버 내 동영상 프레임 추출 알고리즘 구현
    - 스쿼트 자세 분석 모델을 수행할 때, 시간적 요소를 고려하지 않아도 되므로 동영상을 이미지로 처리하여 사용할 것이다. 클라이언트가 동영상 업로드 요청을 앞서 구축한 Flask API 서버로 보내면 영상을 프레임 단위로 나누어 이미지 파일로 저장하고 저장한 파일로 스쿼트 자세 분석 모델을 수행하게 된다. 동영상을 이미지로 변환 시 주의해야 할 점을 생각해보았다.<br><br>
    1. 동영상의 프레임 간격을 너무 짧게 추출하는 경우, 모델 수행 횟수가 늘어나 속도 면에서 성능이 저하 될 수 있다.
    2. 동영상의 프레임 간격을 너무 길게 추출하는 경우, 잘못된 자세를 잡아내지 못하여 정확도가 떨어질 수 있다.<br><br>
    - 동영상마다 FPS 값이 다르므로 동영상의 FPS 값을 변수로 지정하여 저장하였다. 스쿼트 1 회 수행 시 평균 3 초 정도의 시간이 소요된다고 가정하고, 1 초에 1 프레임만 추출하여 이미지로 저장하는 알고리 즘을 구현하였다.

   <img width="509" alt="스크린샷 2023-02-08 오전 2 22 42" src="https://user-images.githubusercontent.com/103736987/217318179-8dcd94a3-2e87-431e-8d85-230ebb1c8ccb.png">


    - 동영상의 프레임 추출과 이미지 저장이 끝나면 while문을 빠져나와 동영상을 사용하느라 잡아 두었던 메모리를 해제해주었다. FPS 값은 round 함수를 이용해 반올림 처리하여 정수 형태로 만들어주었다. 이 외에도 그림 7)과 그림 10)의 코드들을 서버 내에서 실행하여 Return 값을 프론트엔드 입력단에 전달하였다.
 
## 5. 프론트엔드 설계 과정
Android와 IOS 두 운영체제에서 구동이 가능한 멀티 플랫폼 어플리케이션을 제작하기 위해 React- Native 프레임워크를 사용하였다.

### 1. 홈 화면<br>
<img width="584" alt="스크린샷 2023-02-08 오전 2 27 45" src="https://user-images.githubusercontent.com/103736987/217319473-e6f1a479-f562-40fc-8b10-c63c4fbf0b22.png">


- 홈 화면에는 최근 피드백, 운동 기록하기, 초기화 버튼, 운동 명언 기능이 있다. 
- 최근 피드백은 말 그대로
제일 최근에 받은 피드백을 표시하여 사용자가 터치하면 최근 피드백에 대한 상세 내용을 볼 수 있다. 최근 피드백을 구현하기 위해서 매번 홈 화면에 포커스가 될 때 마다 피드백들이 저장되어 있는 내부 저장소에서 피드백을 받아오게 하였다. 그러기 위해서 리액트 컴포넌트가 렌더링 될 때 마다 특정 작업을 실행할 수 있게 해주는 React Native Hook인 ‘useEffect’ 함수를 사용하였다. useEffect 함수의 두번째 인자에 component를 넣으면, 그 컴퍼넌트가 업데이트가 될 때마다 useEffect가 실행되게 할 수 있다. 그 component에 화면이 포커스가 되었는지 확인해주는 isFocused 라이브러리를 이용하여 화면이 포커스 될 때 마다 useEffect 내 함수들이 실행되게 하여 항상 최근 피드백을 받아올 수 있게 하였다. <br><br>
<img width="148" alt="스크린샷 2023-02-08 오전 2 29 13" src="https://user-images.githubusercontent.com/103736987/217319838-6e3c955e-b9bc-4a9f-a890-36f64b962e81.png"><img width="329" alt="스크린샷 2023-02-08 오전 2 29 24" src="https://user-images.githubusercontent.com/103736987/217319875-444a1eb1-1e77-4c54-9a7d-b12d52d0a024.png">
<br>

- 그 다음 운동 기록하기 기능은 말 그대로 오늘의 운동 시간을 기록할 수 있게 하는 기능이다. 목표 시간을 설정하여 알람을 받게 할 수도 있으며 저장된 기록들은 ‘캘린더’ 탭에 날짜 별로 저장된다. 같은 날짜에 여러 번 운동 시간이 기록된 경우 운동 기록 시간이 더해져서 저장되게 하기 위해 useEffect에 내부 저장소에서 운동 기록을 가져오는 함수를 추가하여, 기록이 저장될 때 기존 기록에서 날짜를 확인하여 더해지는 식으로 구현하였다.<br>
- 다음 초기화 버튼에 대해 설명하기 앞서 useState라는 리액트 네이티브 Hook에 대해 간단하게 설명하겠다. useState로 선언된 변수는 set메소드를 통해 그 변수의 값이 변하는 순간 자동으로 리액트 네이티 브가 재 렌더링되게 한다.<br>
이 프로젝트 내에서 값이 변경될 때 마다 화면이 동적으로 변하게 하기 위해 많은 useState 변수들을 사용하였는데, 그 예시 중 하나가 초기화 버튼이다.<br>
초기화 버튼은 내부 저장소를 clear 한 다음 useState로 선언된 변수를 업데이트 시켜 자동으로 재 렌더링 되게 만들어 초기화된 상태를 즉각 화면에 반영시킬 수 있게 만들었다.<br><br>
<img width="530" alt="스크린샷 2023-02-08 오전 2 31 29" src="https://user-images.githubusercontent.com/103736987/217320359-4e0633c5-5fb0-4f36-b5f6-5d8a84b1a2f5.png">

- 또한, 사용자가 어플을 자주 사용할 수 있게 운동 명언을 볼 수 있게 만들었다.


### 2. 자세 교정 화면<br>
<img width="605" alt="스크린샷 2023-02-08 오전 2 34 26" src="https://user-images.githubusercontent.com/103736987/217321040-1e69577a-d854-4f03-82db-52e7cca66a4e.png">

         
   그림 26~29에서 보이는 바와 같이, 자세 교정 화면에서는 사용자가 운동 영상을 찍거나 영상을 선택하여 서버로 보내게 된다. 우선 영상 촬영에 대한 가이드가 있으며, 영상을 바로 촬영하거나 영상을 업로드 하는 버튼이 있다. 영상 촬영의 경우 expo-camera 라이브러리를 사용하여 버튼 클릭 시 바로 카메라를 띄울 수 있게 하였고, 영상 업로드의 경우 React-native-image-picker 라이브러리를 사용하 여 영상을 선택할 수 있게 하였다.<br><br>

<img width="598" alt="스크린샷 2023-02-08 오전 2 35 16" src="https://user-images.githubusercontent.com/103736987/217321222-772f3fc9-cf19-4c8c-bf4e-a88828e7e89d.png">

   그림 31) 에서 보이는 바와 같이, 선택된 영상은 서버로 보내지기 위해 base64 로 인코딩되어 보내지며, 서버로 영상을 보낸 다음 서버에서 처리된 피드백을 fetchNews() 함수를 통해 받아온다. 피드백을 받아 와 이를 내부 저장소에 저장하는데, 만약 기존에 받은 피드백 객체가 내부 저장소에 존재한다면 방금 받아온 피드백을 기존 객체에 추가하여 다시 내부 저장소로 덮어씌운다. 즉 내부 저장소에는 지금까지 받아온 모든 피드백들이 저장되는 것이다.<br>
그 다음 서버에서 보낸 잘못된 자세 이미지를 받아온 다음, 받은 피드백의 상세 페이지를 띄워준다.
이 모든 과정은 동기 처리 함수인 async 와 await를 이용하여 동기적으로 이루어지게 하였다. 때문에 사용자가 피드백을 받을 때까지 조금 기다릴 수 있으므로 이를 보완하기 위해 사용자가 기다리는 동안 사람 캐릭터가 스쿼트를 하고 있는 gif파일을 포함한 페이지를 띄워 지루함을 덜었다.


### 3. 피드백 화면<br>
<img width="338" alt="스크린샷 2023-02-08 오전 2 37 32" src="https://user-images.githubusercontent.com/103736987/217321723-279f13a3-5e8d-4420-919e-3ee06061f942.png">


   다음으로 그림35) 에서 보이는 바와 같이, ‘피드백’ 창에서는 react-native-flatlist 라이브러리를 이용해 사용자가 지금까지 받은 모든 피드백을 리스트로 날짜 순서로 볼 수 있게 하였으며, 각 피드백 터치 시 그 당시 받은 피드백의 상세 페이지로 넘어간다. 피드백들은 앞서 언급한 useEffect 와 isFocused 를 통해 항상 최신의 정보들을 내부 저장소로부터 가져와 확인 할 수 있게 하였다.

### 4. 캘린더 화면<br>
<img width="370" alt="스크린샷 2023-02-08 오전 2 38 05" src="https://user-images.githubusercontent.com/103736987/217321835-074d5501-b7e7-4085-bdac-431bc23809cb.png">


마지막으로 ‘캘린더’ 창에서는 react-native-calendar 라이브러리를 이용하여 사용자가 날짜 별로, 그리고 시간 별로 받은 피드백을 볼 수 있게 하였으며, 터치 시 각 피드백의 상세 페이지로 넘어가게 하였다. 또한 각 날짜 별로 기록된 운동 시간도 확인할 수 있게 하였다. 여기서도 피드백과 운동 기록은 useEffect와 isFocused를 통해 항상 최신의 정보들을 내부 저장소로부터 가져와 확인할 수 있게 제작하였다.


## 설계 결과 및 성능 평가

<img width="599" alt="스크린샷 2023-02-08 오전 2 39 05" src="https://user-images.githubusercontent.com/103736987/217322049-5d40d2be-f6b3-4d10-84ac-a9050e96f5ad.png">

 
## 프로젝트 진행 중 발생 문제점 및 해결사항
- 딥러닝 모델 부분
   프로젝트 진행 중 딥러닝 모델에 동영상을 넣어 출력을 하면 생각했던 것보다 값이 틀리게 나오는 경우가 많이 나왔다. 그 문제의 원인을 생각해 보면 정확도가 90%라는 것은 10 장 중 1 장은 잘못 나올 수 있다는 것이다. 그래서 출력 값을 확인해보면 아래와 같이 중간에 값이 잘못 나온다.<br><br>
   <img width="232" alt="스크린샷 2023-02-08 오전 2 42 02" src="https://user-images.githubusercontent.com/103736987/217322669-fa0b37e3-a2a5-4e86-b0ce-d66dc2bfced8.png">

   잘못된 값인 이유는 자세를 수행하면서 연속된 자세가 진행되므로 출력 값도 연속된 값으로 나와야 하기 때문이다. 이 문제를 해결하기 위해 주변의 값들을 이용해 보정을 하기로 했다. 그 방법으로는 슬라이딩 윈도우를 통해 보정을 했다. 주변 5 개의 값을 이용해 과반 투표를 하는 것이다. 만약 85%의 정확도를 가진 모델을 이용해 슬라이딩 윈도우를 통해 값을 올바르게 보정할 확률을 계산해 보면 97%의 확률 계산이 나오고, 만약 90% 모델이라면 99%의 확률 계산이 나온다. 슬라이딩 윈도우를 통해 보정된 결과를 확인해 보면 밑과 같이 나온다. 연속된 값으로 출력을 하게 된다.<br><br>
   <img width="199" alt="스크린샷 2023-02-08 오전 2 42 33" src="https://user-images.githubusercontent.com/103736987/217322768-acd68f98-40ff-4819-9a9c-759cf451ff4e.png">

   
   여기서는 1 과 0 이 아닌 값을 사용하는 이유는 사용자에게 잘못된 자세가 나온 이미지를 선정해 주기 위해 사용한다.

- 프론트엔드 부분
   처음에는 서버에서 피드백에 대한 모든 객체를 보관하고, 서버로부터 모든 데이터를 받아 처리하려고 계획했었다. 하지만 프론트엔드에서 객체에 대한 업데이트가 필요할 때 마다 매번 서버로 접근해서 변경 요청을 해야 했었고, 동기 처리 부분에서 시간적인 문제나 일의 복잡성 측면에서 해결에 대한 어려움이 생겨 결국 내부 저장소를 채택하여 피드백 객체에 대해 더 효율적이고 빠른 접근이 가능하게 되었다. 또한 서버로 동영상을 보낼 때 서버에서 파일을 처리 할 수 없는 문제가 발생했다.
이에 대한 해결 방법을 알아보던 중 서버로 영상을 보낼 때는 base64로 변환해야 한다는 사실을 알게 되었고, 영상을 base64로 인코딩 하여 서버로 보내자 서버에서 제대로 영상을 처리할 수 있게 되었다.
- 백엔드 부분
백엔드 설계 초반 자바스크립트 언어 기반 Node.js 를 사용하여 서버를 구축하고 MongoDB 를 연결하였다. 하지만 프로젝트 진행 중 딥러닝 모델을 수행할 서버가 또 필요하다는 것을 알게 되었고, 서버를 2 개로 구성하면 앱 서비스 로딩 시간이 길어지는 문제점이 생겼다. 이후 서버 구축 방식을 변경하여 Python 언어 기반 Flask 서버를 사용하며 서버를 하나로 통합하고 속도 면에서 성능 문제점을 해결하였다. 서버를 변경할 때 Django, Flask, FastAPI 중 어떤 프레임워크를 사용할지 선택하기 위해 각 프레임 워크의 특성을 알아보았다. 프로젝트 규모가 비교적 작아 Django 를 사용하기에는 사이즈가 부담스러웠다. 성능으로만 본다면 FastAPI 를 선택했어야 하지만, 백엔드 개발이 처음인 만큼 관련 자료가 적은 FastAPI 보다 자료가 많은 Flask 를 선택하였다.
 
## 결론
 
 <img width="322" alt="스크린샷 2023-02-08 오전 2 43 37" src="https://user-images.githubusercontent.com/103736987/217323117-8e753245-7777-434a-9414-a24709816a77.png">
 
## 다운로드
 - h5 모델 : <추후 다시 업로드>
 - 안드로이드 apk 설치 파일 : https://drive.google.com/file/d/1fvwQp5ZoJipbEI0_troT76LbM_iXjBLi/view
<br><br>**로컬 서버를 사용하였기 때문에 홈 화면에서 위 서버 IP 주소 선택을 통해 Flask의 로컬 IP 주소를 바꿔줘야함.**<br>
**main.py와 위 다운로드 받은 모델은 동일 디렉토리에 위치시켜야함.**

## 참고문헌
 
 
- [1] 트렌드모니터 작성, (2020.11.30.), open.ads, “다시 코로나로 멈춰버린 일상, ‘운동’에 대한 갈증을 느끼는 사람도 많아져”
- [2] 김영숙 기자 작성, (2014.05.12.), medipharmhealth, “잘못된 스쿼트 자세,무릎 관절 해쳐” [3] Openpose 공식 문서, https://cmu-perceptual-computinglab.github.io/openpose/web/html/doc/md_doc_02_output.html
- [4] AI Hub, 데이터 유형, 피프니스 자세 이미지, https://aihub.or.kr/aihubdata/data/view.do?currMenu=116&topMenu=100&aihubDataSe=ty&dataSetSn=231
- [5] 미디어파이프, https://google.github.io/mediapipe/solutions/pose.html
- [6] Du Tran , Lubomir Bourdev, Rob Fergus, Lorenzo Torresani, Manohar Paluri, Dartmouth College, Facebook AI Research, "Learning Spatiotemporal Features with 3D Convolutional Networks", 1
 

import React, {Component} from 'react';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {TimePicker} from 'react-native-simple-time-picker';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Button,
  Text,
  View,
  Pressable,
  TouchableHighlight,
  Alert,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { StyleSheet} from 'react-native';
import * as RNFS from 'react-native-fs';

export default function HomeScreen({navigation}) {
    const [FeedbackDatas, setFeedbackDatas] = useState({});
    const isFocused = useIsFocused();
    const [fitletter, setFitletter] = useState('');
    const [prev, setPrev] = useState(0);
  
    //아래는 서버와의 통신을 위한 코드 - 서버에서 갖고 온 데이터가 response.data에 담김
    useEffect(() => {
      loadRecords();
      loadFeedbacks();
      setletter();
      console.log(recordObj);
    }, [isFocused]);

    const setletter = () => {
      const letters = ['자신의 몸에 만족하는 순간\n    더 이상의 발전은 없다.    ', '운동을 위해 시간을 내지 않으면\n 병 때문에 시간을 내야 할 지도 모른다.', '운동은 하루를 짧게하지만\n 인생을 길게해준다.'];
      var RandomNumber = 0
      while(RandomNumber == prev)
        RandomNumber = Math.floor(Math.random() * letters.length) + 0 ; 
      setPrev(RandomNumber)
      setFitletter(letters[RandomNumber]);
    }
  
    const loadFeedbacks = async loading => {
      try {
        const FeedBackDatas = await AsyncStorage.getItem('feedbacks');
        if (FeedBackDatas !== null) {
          const feedbackvalues = JSON.parse(FeedBackDatas || '{}');
          setFeedbackDatas(feedbackvalues);
        } else {
          setFeedbackDatas({});
        }
      } catch (e) {
        console.log(e.message);
      }
    };
  
    //피드백 선택시 detail 창으로 넘어가게 함
    const PressableItem = ({item}: {item: Feedback}) => {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('상세 피드백', {
              id: item.id,
              title: item.title,
              time: item.time,
              body: item.body,
            })
          }>
          <FeedbackCell item={item} />
        </Pressable>
      );
    };
    //받은 피드백이 없을 때 창
    if (Object.keys(FeedbackDatas).length === 0) {
      recentFeedback = (
        <View style={homeStyles.recentFeedbackFalse}>
          <Text style={homeStyles.recentFeedbackFalseText}>
            받은 피드백이 없습니다
          </Text>
        </View>
      );
    } else {
      // 받은 피드백이 있을 때 창
      recentFeedback = (
        <>
            <TouchableHighlight
            style={homeStyles.startRecentContainer}
            underlayColor="#ffd296"
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('상세 피드백', {
                id: FeedbackDatas[0].id,
                title: FeedbackDatas[0].title,
                time: FeedbackDatas[0].time,
                body: FeedbackDatas[0].body,
              })
            }}>
              <>
            <Text style={homeStyles.startRecentTitleText}>
              {FeedbackDatas[0].title}
            </Text>
            <Text style={homeStyles.startRecentTimeText}>
              {FeedbackDatas[0].time}
            </Text>
            </>
          </TouchableHighlight>
          </>
      );
    }
    //스톱워치
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [recordTimer, setRecordTimer] = useState('Button');
    const [recordedTime, setRecordedTime] = useState(0);
    const [checkMin, setCheckMin] = useState(0);
    const [checkHour, setCheckHour] = useState(0);
    const [isSetSelected, setSetSelected] = useState(false);
    const [selectedHours, setSelectedHours] = useState(1);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [curTime, setCurTime] = useState(null);
    const [recordObj, setRecordObj] = useState([]);
    const options = {
      container: {
        backgroundColor: '#fcb456',
        padding: 0,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
      },
      text: {
        fontSize: 32,
        color: '#FFF',
        marginLeft: 7,
      },
    };

    const makeDirectory = async (folderPath) => {
      await RNFS.mkdir(folderPath); //create a new folder on folderPath
    };
  
    const [records, setRecords] = useState({});
    function toStringByFormatting(source, delimiter = '-') {
      const year = source.getFullYear();
      const month = leftPad(source.getMonth() + 1);
      const day = leftPad(source.getDate());
  
      return [year, month, day].join(delimiter);
    }
  
    const _addRecord = async () => {
      let today = new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .split('T')[0];
      const countPrev = []
      const Dates = today;
      for (i = 0; i < recordObj.length; i++) {
        if (recordObj[i].date === Dates) {
          countPrev.push(i)
        }
      }
  
      if (countPrev.length != 0) {
        //HHmmSS
        let hour,
          sec,
          min = 0;
          countPrev.forEach(function (i) {
            hour =
              parseInt(recordObj[i].recordedTimes.split(':')[0]) +
              parseInt(recordedTime.split(':')[0]);
            min =
              parseInt(recordObj[i].recordedTimes.split(':')[1]) +
              parseInt(recordedTime.split(':')[1]);
            sec =
              parseInt(recordObj[i].recordedTimes.split(':')[2]) +
              parseInt(recordedTime.split(':')[2]);
  
            if (sec >= 60) {
              min = min + 1;
              sec = sec - 60;
            }
            if (min >= 60) {
              hour = hour + 1;
              min = min - 60;
            }
            if (hour < 10) {
              hour = '0' + hour;
            }
            if (min < 10) {
              min = '0' + min;
            }
            if (sec < 10) {
              sec = '0' + sec;
            }
            var HHmmSS = hour + ':' + min + ':' + sec;
            recordObj.splice(i,1);
  
            recordObj.push({
              date: Dates,
              recordedTimes: HHmmSS.toString(),
            });
        })
  
        try {
          await AsyncStorage.setItem('records', JSON.stringify(recordObj));
        } catch (e) {
          console.error(e);
        }
      } else {
        recordObj.push({
          date: Dates,
          recordedTimes: recordedTime.toString(),
        });
        try {
          await AsyncStorage.setItem('records', JSON.stringify(recordObj));
        } catch (e) {
          console.error(e);
        }
      }
    };
  
    const loadRecords = async Dates => {
      try {
        const loadedRecords = await AsyncStorage.getItem('records');
        if (loadedRecords !== null) {
          const value = JSON.parse(loadedRecords || '{}');
          setRecordObj(value);
        } else {
          setRecordObj([]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    deleteRecordAlert = () =>
      Alert.alert(
        '모든 운동 기록들이 삭제됩니다.',
        '정말 삭제하시겠습니까?',
        [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              AsyncStorage.clear();
              const extension = Platform.OS === 'android' ? 'file://' : '';
              const path = `${extension}${RNFS.CachesDirectoryPath}/ImagePicker`
              console.log(path);
              RNFS.unlink(path)
              .then(() => {
                const mkpath = `${extension}${RNFS.CachesDirectoryPath}/ImagePicker`
                makeDirectory(mkpath)
                .then((success) => {
                  console.log('FILE WRITTEN!');
                })
                .catch((err) => {
                  console.log(err.message);
                });
              })
              .catch((err) => {
                console.log(err.message);
              });
              loadRecords();
              loadFeedbacks();
              console.log(recordObj);
            },
          },
        ],
        {cancelable: false},
      );
    goAlert = () =>
      Alert.alert(
        '기록을 취소하고 뒤로 돌아가시겠습니까?',
        '',
        [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              setRecordedTime(0);
              setRecordTimer('Button');
            },
          },
        ],
        {cancelable: false},
      );
    saveAlert = () =>
      Alert.alert(
        '아직 목표 시간에 달성하지 못했습니다.',
        '지금까지의 운동 시간만 기록하시겠습니까?',
        [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              _addRecord();
              alert('기록되었습니다.');
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              setRecordedTime(0);
              setRecordTimer('Button');
            },
          },
        ],
        {cancelable: false},
      );
      resetAlert = () =>
      Alert.alert(
        '운동 시간이 초기화됩니다.',
        '리셋 하시겠습니까?',
        [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '네',
            onPress: () => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              setRecordedTime(0);
            },
          },
        ],
        {cancelable: false},
      );
    if (isSetSelected === true && isStopwatchStart === true) {
      if (checkMin === selectedMinutes && checkHour === selectedHours) {
        _addRecord();
        alert('목표 달성! 기록되었습니다.');
        setIsStopwatchStart(false);
        setResetStopwatch(true);
      }
    }
    commonStopWatch = (
      <>
        <Stopwatch
          laps
          start={isStopwatchStart}
          //To start
          reset={resetStopwatch}
          //To reset
          options={options}
          //options for the styling
          getTime={time => {
            recordingTime = time;
            setCheckMin(parseInt(recordingTime.split(':')[1])); // 2 = sec, 1 = min
            setCheckHour(parseInt(recordingTime.split(':')[0]));
            if (isSetSelected === true) setRecordedTime(recordingTime);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
              if (isStopwatchStart === true) setRecordedTime(recordingTime);
            }}>
            <Text style={homeStyles.timerButtonText}>
              {!isStopwatchStart ? 'START' : ' STOP '}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              if(recordedTime !== 0 || isStopwatchStart === true) resetAlert()
              else{
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              setRecordedTime(0);
              }
            }}>
            <Text style={homeStyles.timerButtonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              if (isStopwatchStart === true) alert('먼저 타이머를 멈춰주세요.');
              else if (recordedTime === 0) alert('먼저 타이머를 시작해주세요.');
              else {
                if (isSetSelected === true) {
                  if (recordedTime === '00:00:00') alert('먼저 타이머를 시작해주세요.');
                  else saveAlert();
                }
                else {
                  _addRecord();
                  alert('기록되었습니다.');
                  setIsStopwatchStart(false);
                  setResetStopwatch(true);
                  setRecordedTime(0);
                  setRecordTimer('Button');
                }
              }
            }}>
            <Text style={homeStyles.timerButtonText}> SAVE </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              if (recordedTime !== 0 || isStopwatchStart === true) goAlert();
              else {
                setIsStopwatchStart(false);
                setResetStopwatch(true);
                setRecordedTime(0);
                if (isSetSelected === true) {
                  setSelectedHours(1);
                  setSelectedMinutes(0);
                  setRecordTimer('target');
                } else setRecordTimer('Button');
              }
            }}>
            <Text style={homeStyles.timerButtonText}> BACK </Text>
          </TouchableHighlight>
        </View>
      </>
    );
    //목표 시간 띠울지말지
    if (isSetSelected === false) {
      stopWatch = <View style={homeStyles.timerStopwatch}>{commonStopWatch}</View>;
    } else {
      if (selectedHours === 0) {
        stopWatch = (
          <View style={homeStyles.timerStopwatch}>
            <Text style={homeStyles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedMinutes} 분
            </Text>
            {commonStopWatch}
          </View>
        );
      } else if (selectedHours !== 0 && selectedMinutes === 0) {
        stopWatch = (
          <View style={homeStyles.timerStopwatch}>
            <Text style={homeStyles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedHours} 시간
            </Text>
            {commonStopWatch}
          </View>
        );
      } else {
        stopWatch = (
          <View style={homeStyles.timerStopwatch}>
            <Text style={homeStyles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedHours} 시간 {selectedMinutes} 분
            </Text>
            {commonStopWatch}
          </View>
        );
      }
    }
    //목표시간
    target = (
      <View style={homeStyles.wishTime}>
        <Text style={homeStyles.wishTimeText}>운동 목표 시간을 입력해주세요</Text>
        <TimePicker
          hoursUnit="시간"
          minutesUnit="분"
          selectedHours={selectedHours}
          //initial Hourse value
          selectedMinutes={selectedMinutes}
          //initial Minutes value
          onChange={(hours, minutes) => {
            setSelectedHours(hours['hours']);
            setSelectedMinutes(hours['minutes']);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: -30,
          }}>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              if (selectedHours === 0 && selectedMinutes === 0)
                alert('정확한 시간을 설정해주세요.');
              else {
                setRecordTimer('stopwatch');
              }
            }}>
            <Text style={homeStyles.timerButtonText}> SAVE </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={homeStyles.startResetText}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('Button');
            }}>
            <Text style={homeStyles.timerButtonText}> BACK </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    //화면 설정
    if (recordTimer == 'Button') {
      recordTimerView = (
        <TouchableHighlight
          style={homeStyles.recordStartButton}
          underlayColor="rgba(221,221,221,0.4)"
          activeOpacity={0.8}
          onPress={() => {
            setRecordTimer('select');
          }}>
          <Text style={homeStyles.recordStartText}>운동 기록 시작</Text>
        </TouchableHighlight>
      );
    } else if (recordTimer == 'select') {
      recordTimerView = (
        <><View style={{marginBottom:8}}>
          <TouchableHighlight
            style={homeStyles.recordSelectButton}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('target');
              setSelectedMinutes(0);
              setSelectedHours(1);
              setSetSelected(true);
            }}>
            <Text style={homeStyles.recordSelectText}>목표 시간 설정</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={homeStyles.recordSelectButton}
            underlayColor="rgba(221,221,221,0.4)"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('stopWatch');
              setSetSelected(false);
            }}>
            <Text style={homeStyles.recordSelectText}>목표 설정 없이 기록 시작</Text>
          </TouchableHighlight>
          </View>
        </>
      );
    } else if (recordTimer == 'target') {
      recordTimerView = target;
    } else {
      recordTimerView = stopWatch;
    }
    
  
    return (
      <ScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      onContentSizeChange={this.onContentSizeChange}
    >
      <View style={homeStyles.homeContent}>
        <Text style={homeStyles.tabHeader}>최근 피드백</Text>
        {recentFeedback}
        <Text style={homeStyles.tabHeader}>운동 기록하기</Text>
        {recordTimerView}
        <Text style={homeStyles.tabHeader}>운동 명언</Text>
        <View style={{
          alignItems: 'center',
      }}>
                <TouchableHighlight
          underlayColor="rgba(143, 126, 104,0.8)"
          activeOpacity={0.8}
            style={homeStyles.homeUploadVideo}
            onPress={() => {
              setletter();
            }}>
            <Text style={homeStyles.letter}>{fitletter}</Text>
          </TouchableHighlight>
        </View>
        <Text style={homeStyles.tabHeader}>초기화 버튼</Text>
        <TouchableHighlight
            underlayColor="#faad96"
            activeOpacity={0.8}
            style={homeStyles.homeUploadVideo2}
            onPress={() => {
              deleteRecordAlert();
            }}>
            <Text style={homeStyles.uploadVideoText}>모든 기록 초기화하기</Text>
          </TouchableHighlight>
      </View>
      </ScrollView>
    );
  }

const homeStyles = StyleSheet.create({
    recentFeedbackFalse: {
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 0,
      padding: 11,
      marginBottom: 20,
      color: 'white',
      backgroundColor: 'rgba(252, 180, 86,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentFeedbackFalseText: {
      fontSize: 20,
      margin: 7,
      fontWeight: 'bold',
      color: 'white',
    },
    startRecentContainer:{
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 0,
      padding: 11,
      marginBottom: 20,
      color: "white",
      backgroundColor: "#fcb456",
      justifyContent:'center',
      alignItems:'center'
    },
    startRecentTitleText:{
      color: "white",
      fontSize: 15,
      marginBottom: 5,
    },
    startRecentTimeText:{
      color: "white",
      fontSize: 13,
    },
    startResetText: {
      margin: 10,
      marginBottom: -5,
      marginTop: 20,
      borderRadius: 10,
    },
    timerButtonText: {
      borderRadius: 10,
      padding: 5,
      borderColor: '#fcb456',
      color: '#fcb456',
      borderWidth: 1,
      fontSize: 20,
    },
    recordStartButton: {
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 0,
      padding: 81,
      marginBottom: 20,
      color: 'white',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordStartText: {
      fontSize: 30,
      color: '#fcb456',
      fontWeight: '500',
    },
    recordSelectButton: {
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 0,
      padding: 32.5,
      marginBottom: 10,
      color: 'white',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordSelectText: {
      fontSize: 25,
      color: '#fcb456',
      fontWeight: '500',
    },
    tabHeader: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      color: 'gray',
    },
    homeContent: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
      marginBottom: -20,
    },
    homeUploadVideo: {
      width: '100%',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 15,
      marginBottom: 15,
      color: 'white',
      backgroundColor: '#8c7c68',
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerStopwatch: {
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 28,
      color: 'white',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 19.8,
    },
    wishTimeTextInStopWatch: {
      fontSize: 21,
      marginTop: -15,
      marginBottom: 10,
      color: '#fcb456',
      fontWeight: 'bold',
    },
    wishTime: {
      // height:'32%',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 28,
      color: 'white',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 1,
      marginBottom:20,
    },
    wishTimeText: {
      fontSize: 20,
      color: '#fcb456',
      fontWeight: 'bold',
    },
    uploadVideoText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      margin: 5,
    },
    letter:{
      fontSize: 16,
      margin:-3,
      color: 'white',
      textAlignVertical: "center",
      textAlign: "center",
    },
    homeUploadVideo2: {
      width: '100%',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 15,
      marginBottom: 15,
      color: 'white',
      backgroundColor: '#fc7d56',
      // backgroundColor: '#947469',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
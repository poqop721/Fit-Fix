function HomeScreen({navigation}) {
    const [FeedbackDatas, setFeedbackDatas] = useState({});
    const isFocused = useIsFocused();
  
    //아래는 서버와의 통신을 위한 코드 - 서버에서 갖고 온 데이터가 response.data에 담김
    useEffect(() => {
      loadRecords();
      loadFeedbacks();
      console.log(recordObj);
    }, [isFocused]);
  
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
        <View style={styles.recentFeedbackFalse}>
          <Text style={styles.recentFeedbackFalseText}>
            받은 피드백이 없습니다
          </Text>
        </View>
      );
    } else {
      // 받은 피드백이 있을 때 창
      recentFeedback = (
        <>
            <TouchableHighlight
            style={styles.startRecentContainer}
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
            <Text style={styles.startRecentTitleText}>
              {FeedbackDatas[0].title}
            </Text>
            <Text style={styles.startRecentTimeText}>
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
        padding: 5,
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
            style={styles.startResetText}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
              if (isStopwatchStart === true) setRecordedTime(recordingTime);
            }}>
            <Text style={styles.timerButtonText}>
              {!isStopwatchStart ? 'START' : ' STOP '}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.startResetText}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              if(recordedTime !== 0 || isStopwatchStart === true) resetAlert()
              else{
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              setRecordedTime(0);
              }
            }}>
            <Text style={styles.timerButtonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableHighlight
            style={styles.startResetText}
            underlayColor="#DDDDDD"
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
            <Text style={styles.timerButtonText}> SAVE </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.startResetText}
            underlayColor="#DDDDDD"
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
            <Text style={styles.timerButtonText}> BACK </Text>
          </TouchableHighlight>
        </View>
      </>
    );
    //목표 시간 띠울지말지
    if (isSetSelected === false) {
      stopWatch = <View style={styles.timerStopwatch}>{commonStopWatch}</View>;
    } else {
      if (selectedHours === 0) {
        stopWatch = (
          <View style={styles.timerStopwatch}>
            <Text style={styles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedMinutes} 분
            </Text>
            {commonStopWatch}
          </View>
        );
      } else if (selectedHours !== 0 && selectedMinutes === 0) {
        stopWatch = (
          <View style={styles.timerStopwatch}>
            <Text style={styles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedHours} 시간
            </Text>
            {commonStopWatch}
          </View>
        );
      } else {
        stopWatch = (
          <View style={styles.timerStopwatch}>
            <Text style={styles.wishTimeTextInStopWatch}>
              목표 시간 : {selectedHours} 시간 {selectedMinutes} 분
            </Text>
            {commonStopWatch}
          </View>
        );
      }
    }
    //목표시간
    target = (
      <View style={styles.wishTime}>
        <Text style={styles.wishTimeText}>운동 목표 시간을 입력해주세요</Text>
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
            style={styles.startResetText}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              if (selectedHours === 0 && selectedMinutes === 0)
                alert('정확한 시간을 설정해주세요.');
              else {
                setRecordTimer('stopwatch');
              }
            }}>
            <Text style={styles.timerButtonText}> SAVE </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.startResetText}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('Button');
            }}>
            <Text style={styles.timerButtonText}> BACK </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
    //화면 설정
    if (recordTimer == 'Button') {
      recordTimerView = (
        <TouchableHighlight
          style={styles.recordStartButton}
          underlayColor="#DDDDDD"
          activeOpacity={0.8}
          onPress={() => {
            setRecordTimer('select');
          }}>
          <Text style={styles.recordStartText}>운동 기록 시작</Text>
        </TouchableHighlight>
      );
    } else if (recordTimer == 'select') {
      recordTimerView = (
        <><View style={{marginBottom:8}}>
          <TouchableHighlight
            style={styles.recordSelectButton}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('target');
              setSelectedMinutes(0);
              setSelectedHours(1);
              setSetSelected(true);
            }}>
            <Text style={styles.recordSelectText}>목표 시간 설정</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.recordSelectButton}
            underlayColor="#DDDDDD"
            activeOpacity={0.8}
            onPress={() => {
              setRecordTimer('stopWatch');
              setSetSelected(false);
            }}>
            <Text style={styles.recordSelectText}>목표 설정 없이 기록 시작</Text>
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
      <View style={styles.homeContent}>
        <Text style={styles.tabHeader}>최근 피드백</Text>
        {recentFeedback}
        <Text style={styles.tabHeader}>운동 기록하기</Text>
        {recordTimerView}
        <Text style={styles.tabHeader}>초기화 버튼</Text>
        <View style={{
          alignItems: 'center',
      }}>
          <TouchableHighlight
            underlayColor="#faad96"
            activeOpacity={0.8}
            style={styles.homeUploadVideo}
            onPress={() => {
              deleteRecordAlert();
            }}>
            <Text style={styles.uploadVideoText}>모든 기록 초기화하기</Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.tabHeader}>운동 명언</Text>
        <View style={styles.homeUploadVideo2}>
          <Text style={styles.letter}>자신의 몸에 만족하는 순간{'\n'}    더 이상의 발전은 없다.    </Text>
        </View>
      </View>
      </ScrollView>
    );
  }
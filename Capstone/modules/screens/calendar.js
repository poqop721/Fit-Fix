import React, {Component} from 'react';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { StyleSheet} from 'react-native';


LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

export default function CalendarScreen({navigation}) {
    const [calendarView, setcalendarView] = useState('noData');
    const isFocused = useIsFocused();
    const [records, setRecords] = useState('2022. 10. 30.');
    const [recordValues, setRecordValues] = useState({});
    const [FeedbackDatas, setFeedbackDatas] = useState({});
    const [fixedFeedbackDatas, setFixedFeedbackDatas] = useState({});
    const [newSelectDate, setNewSelectedDate] = useState('');
    const [rvCount, setRvCount] = useState([]);
    const [selectCount, setSelectCount] = useState(null);
  
    useEffect(() => {
      loadFeedbacks();
      loadRecords();
      setRvCount([]);
      console.log(FeedbackDatas)
    }, [isFocused]);
  
    const loadFeedbacks = async isFocused => {
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
    //하단 내용
  
    const loadRecords = async () => {
      try {
        const loadedRecords = await AsyncStorage.getItem('records');
        if (loadedRecords !== null) {
          const value = JSON.parse(loadedRecords || '{}');
          setRecordValues(value);
        } else {
          setRecordValues({});
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    //캘린더
    const markedDates = Object.values(recordValues).reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
      acc[formattedDate] = {marked: true};
      return acc;
    }, {});
    var replacedFeedbacks = {};
    var referenceFeedbacks = {};
    var count = 0;
    const markedDatesFeedback = Object.values(FeedbackDatas).reduce(
      (acc, current) => {
        replacedFeedbacks = {};
        count++;
        replacedFeedback = current.title.toString().replace('년 ', '-');
        replacedFeedback = replacedFeedback.toString().replace('월 ', '-');
        replacedFeedback = replacedFeedback.toString().replace('일', '');
        replacedFeedbacks['title'] = replacedFeedback;
        referenceFeedbacks[count] = replacedFeedback;
  
        const formattedDate = format(
          new Date(replacedFeedbacks.title),
          'yyyy-MM-dd',
        );
        acc[formattedDate] = {marked: true};
        return acc;
      },
      {},
    );
  
    const [selectedDate, setSelectedDate] = useState(
      format(new Date(), 'yyyy-MM-dd'),
    );
    const markedSelectedDates = {
      ...markedDates,
      ...markedDatesFeedback,
      [selectedDate]: {
        selected: true,
        marked: markedDates[selectedDate]?.marked,
        marked: markedDatesFeedback[selectedDate]?.marked,
      },
    };
    const convertTo_ = () => {
      var newSelectedDate;
      var Year = selectedDate.split('-')[0];
      var Month = selectedDate.split('-')[1];
      var Day = selectedDate.split('-')[2];
      setNewSelectedDate(Year + '년 ' + Month + '월 ' + Day + '일');
    };
  
    const retrunRecord = ()=> {
      try{return( 
        <View style={calendarStyles.calendarContentTime}>
        <Text style={calendarStyles.calendarContentTimeText}>
          총 운동 시간 : {recordValues[selectCount].recordedTimes}
        </Text>
      </View>)
      }
      catch{return ""}
    }
    //화면구성
    useEffect(() => {
      try {
        if (
          markedSelectedDates[selectedDate].marked === true ||
          markedDates[selectedDate].marked === true
        ) {
          setcalendarView('dataYes');
          convertTo_();
          for(i=0;i<recordValues.length;i++){
            rvCount.push(recordValues[i].date)
            if(recordValues[i].date === selectedDate)
              setSelectCount(i)
          }
        }
      } catch {
        setcalendarView('noData');
      }
    });
    if (calendarView === 'noData') {
      CalendarContent = (
        <>
          <View style={calendarStyles.calendarContentNodata}>
            <Text style={calendarStyles.calendarContentText}>운동 데이터 없음</Text>
          </View>
        </>
      );
    } else if (calendarView === 'dataYes') {
      if (
        rvCount.includes(selectedDate) == true &&
        Object.values(referenceFeedbacks).includes(selectedDate) == true
      ) {
        const feedbackViews = [];
        const countTime = [];
        for (i = 0; i < FeedbackDatas.length; i++) {
          if (FeedbackDatas[i].title == newSelectDate) {
            countTime.push(i);
          }
        }
        countTime.reverse();
        countTime.forEach(function (j) {
          feedbackViews.push(
            <TouchableHighlight
              style={calendarStyles.calendarContentFeedback}
              underlayColor="#ffd296"
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('상세 피드백', {
                  id: FeedbackDatas[j].id,
                  title: FeedbackDatas[j].title,
                  time: FeedbackDatas[j].time,
                  body: FeedbackDatas[j].body,
                })
              }}>
              <Text style={calendarStyles.calendarContentFeedbackText}>
                {FeedbackDatas[j].time} 피드백
              </Text>
            </TouchableHighlight>,
          );
        });
        CalendarContent = (
          <>
            <ScrollView>
              <View style={calendarStyles.calendarContent}>
                {retrunRecord()}
                {feedbackViews}
              </View>
            </ScrollView>
          </>
        );
      } else if (
        rvCount.includes(selectedDate) == true &&
        Object.values(referenceFeedbacks).includes(selectedDate) == false
      ) {
        CalendarContent = (
          <>
            <ScrollView>
              <View style={calendarStyles.calendarContent}>
                {retrunRecord()}
              </View>
            </ScrollView>
          </>
        );
      } else if (
        rvCount.includes(selectedDate) == false &&
        Object.values(referenceFeedbacks).includes(selectedDate) == true
      ) {
        const feedbackViews = [];
        const countTime = [];
        for (i = 0; i < FeedbackDatas.length; i++) {
          if (FeedbackDatas[i].title == newSelectDate) {
            countTime.push(i);
          }
        }
        countTime.reverse();
        countTime.forEach(function (j) {
          feedbackViews.push(
            <TouchableHighlight
              style={calendarStyles.calendarContentFeedback}
              underlayColor="#ffd296"
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('상세 피드백', {
                  id: FeedbackDatas[j].id,
                  title: FeedbackDatas[j].title,
                  time: FeedbackDatas[j].time,
                  body: FeedbackDatas[j].body,
                })
              }}>
              <Text style={calendarStyles.calendarContentFeedbackText}>
                {FeedbackDatas[j].time} 피드백
              </Text>
            </TouchableHighlight>,
          );
        });
        CalendarContent = (
          <>
            <ScrollView>
              <View style={calendarStyles.calendarContent}>{feedbackViews}</View>
            </ScrollView>
          </>
        );
      }
    }
    return (
      <>
        <Calendar
          style={calendarStyles.calendar}
          markedDates={markedSelectedDates}
          initialDate={selectedDate}
          theme={{
            selectedDayBackgroundColor: '#fcb456',
            arrowColor: '#fcb456',
            dotColor: '#fcb456',
            selectedDotColor: '#FFFFFF',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#fcb456',
            // selectedDayBackgroundColor: '#009688',
            // arrowColor: '#009688',
            // dotColor: '#009688',
            // todayTextColor: '#009688',
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
        />
        {CalendarContent}
      </>
    );
  }


  const calendarStyles = StyleSheet.create({
    calendarContentTime: {
      width: '90%',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 17,
      marginTop: 15,
      color: 'white',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarContentTimeText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'gray',
    },
    calendarContentNodata: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendarContentText: {
      fontSize: 16,
      color: 'gray',
    },
    calendarContentFeedback: {
      width: '90%',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 0,
      padding: 18,
      marginTop: 15,
      color: 'white',
      backgroundColor: '#fcb456',
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarContentFeedbackText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    calendarContent: {
      flex: 1,
      alignItems: 'center',
      marginBottom:15,
    },
    calendar: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
  });
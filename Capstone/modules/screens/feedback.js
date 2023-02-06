import React, {Component} from 'react';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  Pressable,
  AsyncStorage,
} from 'react-native';
import { StyleSheet} from 'react-native';
import FeedbackCell from '../component/FeedbackCell';
import Feedback from '../component/Feedback';

export default function FeedBackScreen({navigation}) {
    const [FeedbackDatas, setFeedbackDatas] = useState({});
    const isFocused = useIsFocused();
  
    useEffect(() => {
      loadFeedbacks();
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
      return (
        <View style={feedbackStyles.feedbackContainerFalse}>
          <Text style={feedbackStyles.tabHeader}>받은 피드백이 없습니다</Text>
        </View>
      );
    } else {
      // 받은 피드백이 있을 때 창
      return (
        <View style={feedbackStyles.feedbackContainer}>
          <Text style={feedbackStyles.tabHeader}>받은 피드백 목록</Text>
          {/* flatlist를 사용하여 받은 피드백 전부 보여줌 */}
          <FlatList
            data={FeedbackDatas}
            renderItem={PressableItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
  }


const feedbackStyles = StyleSheet.create({
    feedbackContainerFalse: {
      padding: 20,
      marginBottom: -20,
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabHeader: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      color: 'gray',
    },
    feedbackContainer: {
      padding: 20,
      marginBottom: -20,
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
  });
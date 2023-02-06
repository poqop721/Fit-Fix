import React, {Component} from 'react';
// import {useIsFocused} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {StyleSheet} from 'react-native';
import * as RNFS from 'react-native-fs';
import {useState} from 'react';
import Dialog from 'react-native-dialog';
import {useIsFocused} from '@react-navigation/native';
import Unorderedlist from 'react-native-unordered-list';

//Detail 창에 표시하기 위해 미리 정의
export type DetailParams = {
  route: {
    params: {
      id: number,
      title: string,
      time: string,
      body: string,
    },
  },
};

//feedback - pressable 에서 값을 받아 detail 창에 표시함
export type Navigation = NativeStackHeaderProps & DetailParams;
export default function DetailsScreen({route, navigation}) {
  const [visible, setVisible] = useState(false);
  const [iskey, setIsKey] = useState('');
  const [subVisible, setSubVisible] = useState(false);
  const isFocused = useIsFocused();
  var imgName = 'img' + route.params.id + route.params.title;
  const extension = Platform.OS === 'android' ? 'file://' : '';
  const path = `${extension}${RNFS.CachesDirectoryPath}/ImagePicker/${imgName}.jpg`;

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showDetail = () => {
    if (subVisible) setSubVisible(false);
    else setSubVisible(true);
  };

  return (
    <>
      <ScrollView>
        <View style={detailStyles.detailBox}>
          <View style={{    alignItems: 'center',
    justifyContent: 'center',}}>
          <Text style={detailStyles.detailTitle}>
            {route.params.title} 피드백
          </Text>
          <Text style={detailStyles.detailTime}>{route.params.time}</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {Platform.OS === 'ios' ? (
              <>
                <ImageModal
                  swipeToDismiss={true}
                  style={detailStyles.testIMG}
                  source={{
                    uri: `${path}`,
                  }}
                />
              </>
            ) : (
              <>
                <TouchableOpacity onPress={showDialog}>
                  <Image
                    style={detailStyles.testIMG}
                    source={{
                      uri: `${path}`,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          </View>
          <View style={{marginTop: 10,}}>
            {Object.keys(route.params.body).length === 0 ? <Text style={{alignSelf:'center', fontSize:20, color:'gray', fontWeight:'bold', marginTop:30,marginBottom:20}}>완벽한 스쿼트 자세입니다!</Text>
             :Object.keys(route.params.body).map(key => {
              return (
                <>
                  <View style={{marginTop: 10,}}>
                    <View >
                      <Text style={detailStyles.detailBody}>{key}</Text>
                      <TouchableOpacity
                      style={{marginTop: 5}}
                      onPress={event => {
                        if (key === iskey) {
                          setSubVisible(false);
                          setIsKey('');
                        } else {
                          setIsKey(key);
                          setSubVisible(true);
                          console.log(Object.keys(route.params.body).length)
                        }
                      }}>
                      <Text style={{color:'gray', fontSize:15,alignSelf:'center',}}>
                        {subVisible
                          ? key === iskey
                            ? '접기 ▲'
                            : '더보기..▼'
                          : '더보기..▼'}
                      </Text>
                    </TouchableOpacity>
                    </View>
                    {subVisible && iskey === key && (
                      <View
                        style={{
                          borderWidth: 0.5,
                          padding: 8,
                          borderRadius: 10,
                          borderColor: 'gray',
                          marginTop: 5,
                        }}>
                        <Text style={detailStyles.detailBodySub}>
                          {route.params.body[key]}
                        </Text>
                      </View>
                    )}
                  </View>
                </>
              );
            })}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor="#ffd296"
            activeOpacity={0.8}
            style={detailStyles.uploadVideo}
            onPress={() => {
              navigation.navigate('Camera');
            }}>
            <Text style={detailStyles.uploadVideoText}>
              {Object.keys(route.params.body).length === 0 ? '새로운 운동 영상 촬영하기' : '피드백을 토대로 다시 촬영해보기'}
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Image
          style={detailStyles.androidCautionImage}
          source={{
            uri: `${path}`,
          }}
        />
        <Dialog.Button label="확인" onPress={handleCancel} />
      </Dialog.Container>
    </>
  );
}

const detailStyles = StyleSheet.create({
  detailBox: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 15,
    margin: 20,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  detailTitle: {
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailTime: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailBody: {
    fontSize: 17,
    color: 'gray',
    alignSelf:'center',
    fontWeight:'bold'
  },
  detailBodySub: {
    lineHeight:21,
    fontSize: 15,
    color: 'gray',
  },
  testIMG: {
    width: 220,
    height: 300,
    borderRadius: 10,
  },
  startResetText: {
    margin: 10,
    marginBottom: -5,
    marginTop: 20,
    borderRadius: 10,
  },
  uploadVideo: {
    width: '90%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0,
    padding: 11,
    marginBottom: 15,
    color: 'white',
    backgroundColor: '#fcb456',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadVideoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
  },
  androidCautionImage: {
    width: '100%',
    height: '88%',
    borderRadius: 5,
  },
});

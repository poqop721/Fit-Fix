import React, {Component} from 'react';
import * as FS from 'expo-file-system';
import AppLoading from 'expo-app-loading';
import {useState, useEffect} from 'react';
import {Audio, Video} from 'expo-av';
import {Camera, CameraType} from 'expo-camera';
import ImageModal from 'react-native-image-modal';
import * as ImagePicker from 'expo-image-picker';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Button,
  ScrollView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import axios from 'axios';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import Dialog from 'react-native-dialog';

import {DetailParams, Navigation} from './detail';
import {CameraScreen} from './camera';
import changedUrl from '../../App';

var istimer;

export function StartCorrectionScreen({route, navigation}) {
  const [status, setStatus] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const isFocused = useIsFocused();
  const defaulturl = 'http://192.168.1.11:8000';
  const [myurl, setmyurl] = useState(defaulturl);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  useEffect(() => {
    if (loading) {
      istimer = setTimeout(
        //★★★  30초뒤에 waitingEmail값을 true로 바꾼다
        () => {
          {
            if (loading) {
              console.log(loading);
              setLoading(false);
              alert('서버 응답 시간 초과. \n 다시 시도해주세요.');
            }
          }
        },
        100000,
      );
    } else clearTimeout(istimer);
  }, [loading]);

  useEffect(() => {
    getUrl();
  }, [isFocused]);

  const getUrl = async () => {
    var goturl = await AsyncStorage.getItem('url');
    if (goturl === null) setmyurl(defaulturl);
    else setmyurl(goturl);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={require('Capstone/test/loading.gif')} // first way (local)
          // source={{uri: 'http://www.clicktorelease.com/code/gif/1.gif'}} // second way (http)
          width={2000}
          height={2000}
        />
        <Text style={{fontSize: 20}}>
          {'\n'}동영상 분석 중입니다...{'\n'}
        </Text>
        <TouchableHighlight
          underlayColor="rgba(252, 180, 86,0.4)"
          activeOpacity={0.8}
          onPress={() => {
            setLoading(false);
          }}
          style={{
            backgroundColor: '#fcb456',
            padding: 10,
            paddingRight: 15,
            paddingLeft: 15,
            borderRadius: 7,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>취소</Text>
        </TouchableHighlight>
      </View>
    );
  }

  uriToBase64 = async uri => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);
    if (result.type == 'image') {
      await this.toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    } else {
      console.log(123);
      let base64 = await this.uriToBase64(result.uri);
      setLoading(true);
      await this.toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  };

  const fetchNews = async () => {
    let loadedRecords = {};
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);

      const response = await axios.get(
        //'http://uri_주소'
        myurl + '/feedback',
      );

      let responseData = {...response.data};
      console.log(response.data);

      responseData = response.data.reduce(function (object, value) {
        object = value;
        return object;
      }, {});
      try {
        loadedRecords = await AsyncStorage.getItem('feedbacks');
        if (loadedRecords !== null) {
          loadedRecords = JSON.parse(loadedRecords);
          loadedRecords = loadedRecords.reverse();
          loadedRecords.push(responseData);
          loadedRecords = loadedRecords.reverse();
        } else {
          loadedRecords = response.data;
        }
        await AsyncStorage.setItem('feedbacks', JSON.stringify(loadedRecords));
      } catch (e) {
        clearTimeout(istimer);
        if(loading) alert('문제가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
        console.log(e.message);
      }
      // 데이터는 response.data 안에 들어있다.
    } catch (e) {
      clearTimeout(istimer);
      if(loading) alert('문제가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
      setError(e);
    }

    //이미지 저장
    var imgName = 'img' + loadedRecords[0].id + loadedRecords[0].title;
    const extension = Platform.OS === 'android' ? 'file://' : '';
    const path = `${extension}${RNFS.CachesDirectoryPath}/ImagePicker/${imgName}.jpg`;

    const downloadFile = async(uri: string, path: string) => {
      await RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
      }).promise.then(
        afterDown()
      );
    };
    downloadFile(myurl + '/feedbackImg', path);

    // loading 끄기
    function afterDown (){
      clearTimeout(istimer);
      setLoading(false);
      navigation.navigate('상세 피드백', {
        id: loadedRecords[0].id,
        title: loadedRecords[0].title,
        time: loadedRecords[0].time,
        body: loadedRecords[0].body,
      });
    }
  };

  toServer = async mediaFile => {
    let type = mediaFile.type;
    let route = ':';
    let content_type = '';
    type === 'image'
      ? ((route = '/image'), (content_type = 'image/jpeg'))
      : ((route = '/predict'), (content_type = 'video/mp4'));
    url = myurl + route;

    try {
      let response = await FS.uploadAsync(url, mediaFile.uri, {
        headers: {
          'content-type': content_type,
        },
        httpMethod: 'POST',
        uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
      });

      console.log(response.headers);
      console.log(response.body);
      fetchNews();
    } catch (e) {
      if(loading) alert('서버 IP 주소가 옳바르지 않습니다.');
      setLoading(false);
      clearTimeout(istimer);
    }
  };

  function showDialog1() {
    setVisible1(true);
  }

  function showDialog2() {
    setVisible2(true);
  }

  const handleCancel1 = () => {
    setVisible1(false);
  };

  const handleCancel2 = () => {
    setVisible2(false);
  };

  return (
    <>
      <ScrollView>
        <View style={correctionStyles.content}>
          <View style={correctionStyles.CorrectionTipContainer}>
            <Text style={correctionStyles.correctionCautionTitle}>
              자세 교정 가이드{'\n'}
            </Text>
            <Text style={correctionStyles.correctionCautionSubTitle}>
              정확한 자세 피드백을 받기 위해 영상을 촬영하시기 전 아래
              주의사항을 꼭 읽으신 후 촬영해주세요.{'\n'}
            </Text>
            <Unorderedlist>
              <Text style={correctionStyles.correctionCautionContent}>
                영상을 촬영하실 때 아래 그림과 같은 구도로 촬영될 수 있게 카메라
                각도를 조절해주세요.
              </Text>
            </Unorderedlist>
            <View
              style={{
                flexDirection: 'row',
                margin: -10,
              }}>
              {Platform.OS === 'ios' ? (
                <>
                  <ImageModal
                    swipeToDismiss={true}
                    style={correctionStyles.correctionCautionImage}
                    source={require('Capstone/test/reference1.jpg')}
                  />
                  <ImageModal
                    swipeToDismiss={true}
                    style={correctionStyles.correctionCautionImage}
                    source={require('Capstone/test/reference2.jpg')}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={showDialog1}>
                    <Image
                      style={correctionStyles.correctionCautionImage}
                      source={require('Capstone/test/reference1.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showDialog2}>
                    <Image
                      style={correctionStyles.correctionCautionImage}
                      source={require('Capstone/test/reference2.jpg')}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={correctionStyles.bottomcaution}>
              <Unorderedlist style={correctionStyles.Unorderedlist}>
                <Text style={correctionStyles.correctionCautionContent}>
                  '스쿼트' 1세트에 대한 영상을 촬영해주세요. {'\n'}('지금 동영상
                  촬영하기') 를 통해 카메라에 접근하실 수 있습니다.{'\n'}
                </Text>
              </Unorderedlist>
              <Unorderedlist style={correctionStyles.Unorderedlist}>
                <Text style={correctionStyles.correctionCautionContent}>
                  촬영하신 영상을 아래 '미디어에서 동영상 불러오기'를 통해
                  업로드 해주세요.
                </Text>
              </Unorderedlist>
              <Unorderedlist style={correctionStyles.Unorderedlist2}>
                <Text style={correctionStyles.correctionCautionContent}>
                  받으신 모든 피드백은 '피드백' 섹션에 저장됩니다.
                </Text>
              </Unorderedlist>
            </View>
          </View>
          <TouchableHighlight
            style={correctionStyles.startResetText}
            underlayColor="#ffd296"
            activeOpacity={0.8}
            style={correctionStyles.uploadVideo}
            onPress={() => navigation.navigate('Camera')}>
            <Text style={correctionStyles.uploadVideoText}>
              지금 동영상 촬영하기
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={correctionStyles.startResetText}
            underlayColor="#ffd296"
            activeOpacity={0.8}
            style={correctionStyles.uploadVideo}
            onPress={() => {
              pickImage();
              console.log(myurl);
            }}>
            <Text style={correctionStyles.uploadVideoText}>
              운동 영상 보내기
            </Text>
          </TouchableHighlight>
          {/* {video && <Image source={{ uri: video }} style={{ width: 200, height: 200 }} />} */}
        </View>
      </ScrollView>
      <Dialog.Container visible={visible1}>
        <Image
          source={require('Capstone/test/reference1.jpg')}
          style={correctionStyles.androidCautionImage}
        />
        <Dialog.Button label="확인" onPress={handleCancel1} />
      </Dialog.Container>
      <Dialog.Container visible={visible2}>
        <Image
          source={require('Capstone/test/reference2.jpg')}
          style={correctionStyles.androidCautionImage}
        />
        <Dialog.Button label="확인" onPress={handleCancel2} />
      </Dialog.Container>
    </>
  );
}

const correctionStyles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CorrectionTipContainer: {
    margin: 15,
    padding: 20,
    flex: 1,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  correctionCautionTitle: {
    color: 'gray',
    fontSize: 27,
    fontWeight: 'bold',
  },
  correctionCautionSubTitle: {
    color: 'gray',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -15,
  },
  correctionCautionContent: {
    color: 'gray',
    fontSize: 14.5,
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
  correctionCautionImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    margin: 20,
  },
  androidCautionImage: {
    width: '100%',
    height: '85%',
    borderRadius: 5,
  },
  Unorderedlist: {
    marginBottom: 30,
  },
  bottomcaution: {
    width: '100%',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  modalcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

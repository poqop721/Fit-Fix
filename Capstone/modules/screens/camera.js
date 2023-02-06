import React, {Component} from 'react';
import * as FS from 'expo-file-system';
import AppLoading from 'expo-app-loading';
import {useState, useEffect} from 'react';
import { Audio,Video} from 'expo-av';
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

var istimer;

export default function CameraScreen({navigation}) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMicPermission, setHasMicPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [recording, setRecording] = useState(false);
    const [result, setResult] = useState(null);
    const [curView, setCurView] = useState('camera');
    const [flashMode, setFlashMode] = React.useState(Camera.Constants.FlashMode.off)
    
    //
    const [status, setStatus] = React.useState({});
    const [error, setError] = React.useState(null);
    const isFocused = useIsFocused();
    const defaulturl = 'http://192.168.1.11:8000';
    const [myurl, setmyurl] = useState(defaulturl);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
  
    
  
    useEffect(() => {
      if (curView === 'loading') {
        istimer = setTimeout(
          //★★★  30초뒤에 waitingEmail값을 true로 바꾼다
          () => {
            {
              if (curView === 'loading') {
                console.log(curView);
                setCurView('video');
                alert('서버 응답 시간 초과. \n 다시 시도해주세요.');
              }
            }
          },
          100000,
        );
      } else clearTimeout(istimer);
    }, [curView]);
  
    useEffect(() => {
      getUrl()
    }, [isFocused]);
  
    const getUrl = async () => {
        var goturl = await AsyncStorage.getItem('url')
        if (goturl === null) setmyurl(defaulturl);
        else setmyurl(goturl);
    }
  
    uriToBase64 = async uri => {
      console.log('uriToBase64 Called')
      let base64 = await FS.readAsStringAsync(uri, {
        encoding: FS.EncodingType.Base64,
      });
      return base64;
    };
  
    const sendVideo = async () => {
        console.log('sendvideoCalled')
        let base64 = await this.uriToBase64(result);
        setCurView('loading');
        await this.toServer({
          type: 'video',
          base64: base64,
          uri: result,
        });
      }
  
    const fetchNews = async () => {
        console.log('fetchNews Called')
      let loadedRecords = {};
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
  
        // loading 상태를 true 로 바꿉니다.
  
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
          if(curView === 'loading') alert('문제가 발생했습니다. 다시 시도해주세요.');
          clearTimeout(istimer);
          setCurView('video');
          console.log(e.message);
        }
        // 데이터는 response.data 안에 들어있다.
      } catch (e) {
        if(curView === 'loading') alert('문제가 발생했습니다. 다시 시도해주세요.');
        clearTimeout(istimer);
        setCurView('video');
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
        }).promise.then(afterDown());
      };
      downloadFile(myurl + '/feedbackImg', path);
  
      // loading 끄기
      function afterDown (){
        clearTimeout(istimer);
        setCurView('video');
        navigation.navigate('상세 피드백', {
            id: loadedRecords[0].id,
            title: loadedRecords[0].title,
            time: loadedRecords[0].time,
            body: loadedRecords[0].body,
        });
      }
    };
  
    toServer = async mediaFile => {
        console.log('toServer Called')
      let type = mediaFile.type;
      let route = ':';
      let content_type = 'video/mp4';
      type === 'image'
        ? ((route = '/image'), (content_type = 'image/jpeg'))
        : ((route = '/predict'), (content_type = 'video/mp4'));
      url = myurl + route;
  
      try{
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
        if(curView === 'loading')alert('서버 IP 주소가 옳바르지 않습니다.');
        setCurView('video');
        clearTimeout(istimer);
      }
    };
  
    //
    
    useEffect(() => {
      (async () => {
        const camStatus = await Camera.requestCameraPermissionsAsync();
        if (camStatus.granted){
          setHasCameraPermission(true)
      }
        const micStatus = await Audio.requestPermissionsAsync();
        if (micStatus.granted){
          setHasMicPermission(true);}
      })();
    }, []);
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false && hasMicPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    const handleFlashMode = () => {
      if (flashMode === Camera.Constants.FlashMode.torch) {
        setFlashMode(Camera.Constants.FlashMode.off)
      } else if (flashMode === Camera.Constants.FlashMode.off) {
        setFlashMode(Camera.Constants.FlashMode.torch)
      }
    }
  
    if(curView === 'camera'){
      return (<><View style={{flex: 1}}>
        <Camera
          style={{flex: 1}}
          type={type}
          ref={ref => {
            setCameraRef(ref);
          }}
          flashMode={flashMode}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.11,
                  alignSelf: 'flex-end',
                  marginBottom: 5,
                }}
                onPress={() => {
                  handleFlashMode()
                }}>
               <Icon
                  name={type === Camera.Constants.Type.back ? flashMode === Camera.Constants.FlashMode.torch  ? 'flash-off' :'flash-on' : 'flash-off'}
                  size={40}
                  color={type === Camera.Constants.Type.back ? "white" : "gray"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={async () => {
                  if(!recording){
                    setRecording(true);
                    let video = await cameraRef.recordAsync();
                    console.log('video', video);
                    setResult(video.uri)
                    } else {
                      cameraRef.stopRecording();
                      setRecording(false);
                      setCurView('video');
                    }
                }}>
                <View
                  style={{
                    borderWidth: 5,
                    borderRadius: 25,
                    borderColor: 'white',
                    height: 50,
                    width: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {!recording? 
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 25,
                      borderColor: 'red',
                      height: 35,
                      width: 35,
                      backgroundColor:'red',
                    }}></View> : <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 3,
                      borderColor: 'red',
                      height: 23.5,
                      width: 23.5,
                      backgroundColor: 'red',
                    }}></View>
                  }
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.11,
                  alignSelf: 'flex-end',
                  marginBottom: 5,
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'flip-camera-ios'
                      : 'flip-camera-android'
                  }
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
      </>);
    } else if (curView === 'video'){
      return (<>
        <View style={correctionStyles.videoContainer}>
  <Video
  style={correctionStyles.video}
  source={{
    uri: result
  }}
  resizeMode="contain"
  useNativeControls={true}
  />
  </View>
  <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position:'relative',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 15,
        }}>
              <TouchableOpacity
          style={{
            flex: 0.22,
            alignSelf: 'flex-end',
            position:'relative',
            left:-70,
          }}
          onPress={() => {
            setCurView('camera');
          }}>
          <Text style={{color:'white',fontSize:18, fontWeight:'bold'}}>다시 찍기</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            flex: 0.22,
            alignSelf: 'flex-end',
            position:'relative',
            right:-100,
          }}
          onPress={() => {
            setCurView('loading')
            sendVideo()
          }}>
          <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>보내기</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>);
    }else {
      return(      <View
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
        <Text style={{fontSize: 20}}>{'\n'}동영상 분석 중입니다...{'\n'}</Text>
        <TouchableHighlight
          underlayColor="rgba(252, 180, 86,0.4)"
          activeOpacity={0.8}
          onPress={() => {
            setCurView('video');
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
      </View>);
    }
  }

const correctionStyles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      },
      video: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
      },
});
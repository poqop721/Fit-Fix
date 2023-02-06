import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LogBox, TextInput, AsyncStorage, TouchableOpacity} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import Dialog from 'react-native-dialog';

import HomeScreen from './modules/screens/home';
import {StartCorrectionScreen} from './modules/screens/startCorrection';
import FeedBackScreen from './modules/screens/feedback';
import CalendarScreen from './modules/screens/calendar';
import DetailsScreen from './modules/screens/detail';
import CameraScreen from './modules/screens/camera';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();
function HomeStackScreen() {
  const HomeStack = createStackNavigator();
  const defaulturl = 'http://192.168.1.11:8000';
  const [visible, setVisible] = useState(false);
  const [rootTitle, setRootTitle] = useState(defaulturl);
  const input = React.createRef();

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  function DialogTag({navigation}) {
    const [title, setTitle] = useState(rootTitle);
    React.useEffect(() => {
      if (visible) {
        input.current.focus();
      }
    }, [visible]);
    return (
      <>
        <HomeScreen />
        <Dialog.Container visible={visible}>
          <Dialog.Title>IP주소 변경</Dialog.Title>
          <Dialog.Description>
            서버와 연결하실 IP 주소를 입력해주세요.
          </Dialog.Description>
          <TextInput
            value={title}
            onChangeText={text => setTitle(text)}
            returnKeyType="next"
            style={{textAlign: 'center', marginBottom: 20}}
            ref={input}
          />
          <Dialog.Button label="취소" onPress={handleCancel} />
          <Dialog.Button
            label="기본값"
            onPress={() => {
              AsyncStorage.setItem('url', defaulturl);
              setRootTitle(defaulturl);
              alert('ip주소가 ' + defaulturl + ' 로 변경되었습니다.');
              handleDelete();
            }}
          />
          <Dialog.Button
            label="변경"
            onPress={() => {
              AsyncStorage.setItem('url', title);
              setRootTitle(title);
              alert('ip주소가 ' + title + ' 로 변경되었습니다.');
              handleDelete();
            }}
          />
        </Dialog.Container>
      </>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="홈"
        component={visible ? DialogTag : HomeScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                showDialog();
              }}
              style={{marginRight: 10}}>
              <Icon name="multiple-stop" size={30} color="#fcb456" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

function StartCorrectionStackScreen() {
  const StartCorrectionStack = createStackNavigator();
  const FeedBackStack = createStackNavigator();

  return (
    <StartCorrectionStack.Navigator>
      <StartCorrectionStack.Screen
        name="자세 교정"
        component={StartCorrectionScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <StartCorrectionStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <FeedBackStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </StartCorrectionStack.Navigator>
  );
}

function CameraStackScreen() {
  const CameraStack = createStackNavigator();

  return (
    <CameraStack.Navigator>
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <CameraStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </CameraStack.Navigator>
  );
}

//피드백 창에 쓰일 스택들 정의
function FeedBackStackScreen() {
  const FeedBackStack = createStackNavigator();
  return (
    <FeedBackStack.Navigator>
      <FeedBackStack.Screen
        name="피드백"
        component={FeedBackScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <FeedBackStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </FeedBackStack.Navigator>
  );
}

function CalendarStackScreen() {
  const CalendarStack = createStackNavigator();
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="캘린더"
        component={CalendarScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <CalendarStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <CalendarStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </CalendarStack.Navigator>
  );
}

function DetailStackScreen() {
  const DetailStack = createStackNavigator();

  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <DetailStack.Screen
        name="상세 피드백"
        component={DetailsScreen}
        options={{
          headerTintColor: '#fcb456',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </DetailStack.Navigator>
  );
}

export default function App() {
  const [mode, setMode] = useState('Main');
  let content = null;
  let stat = null;
  let nav = null;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (mode === 'Main') {
    return (content = (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            tabBarActiveTintColor: '#fcb456',
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              title: '홈',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Correction"
            component={StartCorrectionStackScreen}
            options={{
              title: '자세 교정',
              tabBarIcon: ({color, size}) => (
                <Icon name="video-call" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Feedback"
            component={FeedBackStackScreen}
            options={{
              title: '피드백',
              tabBarIcon: ({color, size}) => (
                <Icon name="fact-check" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={CalendarStackScreen}
            options={{
              title: '캘린더',
              tabBarIcon: ({color, size}) => (
                <Icon name="calendar-today" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    ));
  }
  return <>{content}</>;
}

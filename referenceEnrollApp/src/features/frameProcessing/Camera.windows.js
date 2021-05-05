import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  UIManager,
  findNodeHandle,
} from 'react-native';
import Enrollment from './Enrollment';
import {WindowsCamera} from 'react-native-windows-uwp-camera';

export default function Camera(props) {
  const [startEnroll, setStartEnroll] = useState(false);
  let cameraRef = React.useRef(null);

  console.log('WINDOWS');

  function onInitialized() {
    console.log('camera ready');
    setStartEnroll(true);
  }

  async function takeBase64Picture() {
    try {
      var frame = await cameraRef.current.TakeColorPictureAsync();
      return frame;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <View style={styles.root}>
      <WindowsCamera
        ref={cameraRef}
        onCameraInitialized={onInitialized}></WindowsCamera>
      <Enrollment
        onCompleted={props.onCompleted}
        takePicture={takeBase64Picture}
        beginEnrollment={startEnroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});

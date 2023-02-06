import React, {useState} from "react";
import {View, StyleSheet, Text, Vibration} from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import {Timing} from './Timing'
import {ProgressBar} from 'react-native-paper';
import {spacing, fontSizes} from '../utils/sizes';
import {colors} from '../utils/colors';
import {Countdown} from '../components/Countdown';
import {RoundedButton} from '../components/RoundedButton';



export const Timer = ({focusSubject, clearSubject, onTimerEnd}) =>{
  useKeepAwake();
  const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
      4 * ONE_SECOND_IN_MS,
      5 * ONE_SECOND_IN_MS,
    ];
  const [isStarted, setIsStarted] = useState(false);
  const [progress,setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd=(reset)=>{
    Vibration.vibrate(PATTERN);
    setProgress(1);
    setIsStarted(false);
    reset();
    onTimerEnd(focusSubject)
  };

  return(
    <View style = {styles.container}>
      <View style= {styles.countdown}>
        <Countdown  
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={setProgress} 
          onEnd= {onEnd}
        />
        <View style={{paddingTop: spacing.xxl}}>
          <Text style={styles.title}>focusing on: </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar
          color={colors.progressBar}
          style={{height: spacing.sm}}
          progress={progress}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime = {setMinutes}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted?
          <RoundedButton title="start" onPress={() =>{setIsStarted(true)}}/>
        :
          <RoundedButton title="pause" onPress={() =>{setIsStarted(false)}}/>
        }
      </View>
      <View style={styles.cleatSubjectWrapper}>
      <RoundedButton size={fontSizes.xxl} title="-" onPress={clearSubject}/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    

  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md, 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0,
    
  },
  task: {
    color: colors.white,
    textAlign: 'center'
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl, 
  },
  cleatSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
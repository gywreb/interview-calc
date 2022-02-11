import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculatorMain = () => {
  const [stringOfCalc, setStringOfCalc] = useState('');
  const [calcRes, setCalcRes] = useState('');
  const [resultArr, setResultArr] = useState([]);

  const saveAsyncStorage = async (resultArr: []) => {
    try {
      await AsyncStorage.setItem('res', JSON.stringify(resultArr));
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const handlePressCalBtn = (content: string) => {
    if (!(content === 'C' || content === '<X' || content === '=')) {
      setStringOfCalc(prev => (prev += content));
    } else {
      switch (content) {
        case '=': {
          setCalcRes(eval(stringOfCalc));
          setResultArr(prev => [
            ...prev,
            {op: stringOfCalc, value: eval(stringOfCalc)},
          ]);
          saveAsyncStorage([
            ...resultArr,
            {op: stringOfCalc, value: eval(stringOfCalc)},
          ]);
          break;
        }
        case 'C': {
          setCalcRes('');
          setStringOfCalc('');
          break;
        }
        case '<X': {
          setStringOfCalc(prev =>
            prev
              .split('')
              .splice(prev.split('').length - 1, 1)
              .join(''),
          );
          break;
        }
      }
    }
  };

  const calcFunction = [
    {title: 'C'},
    {title: '%'},
    {title: '/'},
    {title: 'X'},
    {title: '7'},
    {title: '8'},
    {title: '9'},
    {title: '-'},
    {title: '4'},
    {title: '5'},
    {title: '6'},
    {title: '+'},
    {title: '1'},
    {title: '2'},
    {title: '3'},
    {title: '<X'},
    {title: '0'},
    {title: '.'},
    {title: '='},
  ];
  const renderCalButton = (content: string) => {
    return (
      <TouchableOpacity
        style={styles.calcBtn}
        onPress={() => handlePressCalBtn(content)}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.grid}>
      <View style={styles.calcScreen}>
        <Text style={{textAlign: 'left', fontSize: 20}}>{stringOfCalc}</Text>
        <Text style={{textAlign: 'left', fontSize: 28, fontWeight: 'bold'}}>
          {calcRes}
        </Text>
      </View>
      <View style={styles.calcFuncScreen}>
        {calcFunction.map(item => renderCalButton(item.title))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  calcScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 7,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  calcFuncScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
  },
  calcBtn: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: Dimensions.get('window').width / 4 - 20,
    height: 80,
    backgroundColor: 'gray',
    // flex: 0.25,
  },
});

export default CalculatorMain;

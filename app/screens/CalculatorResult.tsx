import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalculatorResult() {
  const [data, setdata] = useState([]);
  const getAsyncStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('res');
      return data ? JSON.parse(data) : [];
    } catch (error) {}
  };
  useEffect(() => {
    const getData = async () => {
      const data = await getAsyncStorage();
      setdata(data);
    };
    getData();
  }, []);
  return (
    <View>
      {data.map(item => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Dimensions.get('window').width,
          }}>
          <Text>{item.op}</Text>
          <Text>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

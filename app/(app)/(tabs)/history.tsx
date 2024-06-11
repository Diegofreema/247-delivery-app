import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { HeaderComponent } from '../../../components/Header';
import { useHistory } from '../../../libs/queries';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../constants/Colors';
import { useStoreId } from '../../../hooks/useAuth';
import { HistoryType } from '../../../types';
import { defaultStyle } from '../../../constants';
import { EmptyBag } from '../../../components/EmptyBag';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { format, parseISO } from 'date-fns';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Input } from '@rneui/themed';
import { MyButton } from '../../../components/Mybutton';

const targetDate = '2023-10-24';
const parsedDate = parseISO(targetDate);
const unixTimestamp = parsedDate.getTime();
const secondDate = '2024-12-17';
const parsedSecond = parseISO(secondDate);
const unixSecond = parsedSecond.getTime();
const history = () => {
  const { profile } = useStoreId();
  const [lowerDate, setLowerDate] = useState('11-24-2023');
  const [finalLastDate, setFinalLastDate] = useState('11-24-2023');
  const [higherDate, setHigherDate] = useState('12-17-2024');
  const [finalHigherDate, setFinalHigherDate] = useState('12-17-2024');
  const [firstDate, setFirstDate] = useState(new Date(unixTimestamp));
  const [secondDate, setSecondDate] = useState(new Date(unixSecond));

  const { data, isError, isPaused, refetch, isPending, isRefetching } =
    useHistory(profile?.id, finalLastDate, finalHigherDate);

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }
  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size={100} color={colors.btnColor} />
      </View>
    );
  }

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    type: 'lower' | 'higher'
  ) => {
    const currentDate = selectedDate;
    if (!currentDate) return;
    const finalDate = format(currentDate, 'MM-dd-yyyy');
    if (event.type !== 'dismissed') {
      if (type === 'lower') {
        setLowerDate(finalDate);
        setFirstDate(currentDate);
      } else {
        setHigherDate(finalDate);
        setSecondDate(currentDate);
      }
    }
  };

  const showMode = (type: 'lower' | 'higher') => {
    DateTimePickerAndroid.open({
      value: type === 'lower' ? firstDate : secondDate,
      onChange: (event, date) => onChange(event, date, type),
      mode: 'date',
      is24Hour: true,
      display: 'spinner',
    });
  };

  const onFilter = () => {
    setFinalLastDate(lowerDate);
    setFinalHigherDate(higherDate);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={[
          defaultStyle.container,
          { flex: 1, paddingTop: 20, backgroundColor: 'white' },
        ]}
      >
        <HeaderComponent>Previous Deliveries</HeaderComponent>
        <View style={{ gap: 5, flexDirection: 'row', width: '100%' }}>
          <Pressable
            onPress={() => showMode('lower')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              width: '50%',
            })}
          >
            <Input
              value={lowerDate}
              editable={false}
              labelStyle={{ fontFamily: 'Poppins' }}
              containerStyle={{ width: '100%' }}
            />
          </Pressable>
          <Pressable
            onPress={() => showMode('higher')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              width: '50%',
            })}
          >
            <Input
              value={higherDate}
              editable={false}
              labelStyle={{ fontFamily: 'Poppins' }}
              containerStyle={{ width: '100%' }}
            />
          </Pressable>
        </View>
        <View style={{ marginBottom: 15, marginTop: -25 }}>
          <MyButton
            disabled={isRefetching || isPending}
            title="Filter history"
            onPress={onFilter}
            color={colors.btnColor}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <HistoryItem history={item} index={index} />
          )}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={<EmptyBag text="Nothing history yet!!!" />}
          contentContainerStyle={{ gap: 10, paddingBottom: 50 }}
        />
      </View>
    </View>
  );
};

export default history;

const HistoryItem = ({
  history,
  index,
}: {
  history: HistoryType;
  index: number;
}) => {
  const AnimationDirection = index % 2 === 0 ? SlideInLeft : SlideInRight;
  return (
    <Animated.View
      entering={AnimationDirection.delay(500).springify()}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.productCard,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: 'black', fontSize: 13, fontFamily: 'Poppins' }}>
        {history?.datex}
      </Text>
      <Text style={{ color: 'black', fontSize: 13, fontFamily: 'Poppins' }}>
        {history?.deliverycost}
      </Text>
      <Text style={{ color: 'black', fontSize: 13, fontFamily: 'Poppins' }}>
        {history.Location}
      </Text>
    </Animated.View>
  );
};

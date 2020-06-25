import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    if (action === DatePickerAndroid.dateSetAction) {
      const selectDate = new Date(year, month, day);

      onChange(selectDate);

      console.tron.log(selectDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
};

DateInput.defaultProps = {
  date: new Date(),
};

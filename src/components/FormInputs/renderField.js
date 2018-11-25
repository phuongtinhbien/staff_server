import React from 'react';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Radio from './Radio';
import CustomSelect from './Select';
import DateInput from './DateInput';
import TimeInput from './Time';

const renderField = (props) => (
  <div>
    { (props.type === 'email' ||
       props.type === 'password' ||
       props.type === 'text' ||
       props.type === 'file' ||
       props.type === 'number') &&
      <TextInput {...props} />
    }
    { props.type === 'checkbox' && <Checkbox {...props} /> }
    { props.type === 'radio' && <Radio {...props} /> }
    { props.type === 'select' && <CustomSelect {...props} /> }
    { props.type === 'date' && <DateInput {...props} /> }
    { props.type === 'time' && <TimeInput {...props} /> }
  </div>
);

export default renderField;
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, CustomInput } from 'reactstrap';

const RadioButton = (props) => {
  const { id, valid, dataSource, checked, inline, changeListener, label, dataValue, dataName, simpleArray } = props;
  return (
    <FormGroup>
      {label && <Label for="city">{label}</Label>}
      {valid === false && <p className='invalid-msg'> *required</p>}
      <div>
        {
          dataSource.map((data, index) => {
            return (
              <CustomInput
                id={!simpleArray ? `${id}_${data[dataValue]}` : data}
                name={data[dataValue]}
                key={index}
                label={!simpleArray ? data[dataName] : data}
                type='radio'
                invalid={!valid && valid !== null}
                checked={!simpleArray ? checked === data[dataValue] : checked === data}
                inline={inline}
                onChange={() => changeListener(data[dataValue])} />
            )
          })
        }
      </div>
    </FormGroup>
  );
}

RadioButton.defaultProps = {
  valid: null,
  checked: null,
  inline: true,
  changeListener: null,
  simpleArray: false,
  dataValue: 'value',
  dataName: 'name',
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  simpleArray: PropTypes.bool,
  valid: PropTypes.bool,
  inline: PropTypes.bool,
  dataValue: PropTypes.string,
  dataName: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.any,
  dataSource: PropTypes.arrayOf(PropTypes.any).isRequired,
  changeListener: PropTypes.func,
}

export default RadioButton;
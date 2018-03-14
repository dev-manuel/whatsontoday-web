import React from 'react'
import {Form} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import log from 'loglevel'

import './dateSelectFormField.less'

export class DateSelector extends React.Component{
    render(){
        const {label, plHolder, onClick, value} = this.props;
        log.debug('DateSelector#plHolder', plHolder);
        log.debug('DateSelector#value', value);
        return (
            <Form.Input
                error={this.props.error}
                className="DateSelectFormField_FormInput"
                onClick={onClick}
                value={value===''?'':`${value} Uhr`}
                placeholder={plHolder}
                label={label}
            />
        )
    }
}
    
export default ({selected, onChange, placeholder, label, timeCaption, minDate, locale, error}) => {
    return(
        <DatePicker
            minDate={minDate}
            selected={selected}
            onChange={onChange}
            customInput={<DateSelector plHolder={placeholder} label={label}  error={error}/>}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat='ddd DD MMM YYYY - HH:mm'
            timeCaption={timeCaption}
            calendarClassName="DateSelectFormField_DatePicker"
            locale={locale}
        />
    )
}
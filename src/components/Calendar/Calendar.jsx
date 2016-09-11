import React, { Component, PropTypes as pt } from 'react'
import cx from 'classnames'
import moment from 'moment'

import styles from './Calendar.styl'

const getMonday = date => {
  return date.startOf('isoweek')
}

const dateFromYearWeekDay = (year, week, weekDay) => {
  const startYearDate = getMonday(moment(`${year}-01-01`))
  const weekFirstDay = startYearDate.add(week - 1, 'week')
  const date = weekFirstDay.add(weekDay - 1, 'day')
  return date
}

export default class Calendar extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    holidays: pt.object,
    year: pt.string,
    country: pt.string
  };
  static defaultProps = {
    mode: 'default',
    holidays: {},
    year: '2013',
    country: 'RU'
  };
  renderDay = weekDay => {
    const { holidays } = this.props
    const currentDate = weekDay.format('YYYY-MM-DD')
    const found = holidays[currentDate]
    const title = found && found.length ? found[0].name : ''
    return (
      <div className={styles.dayCell} key={weekDay.format('LL')}>
        {weekDay.format(weekDay.format('D') === '1' ? 'LL' : 'D')}
        {title &&
          <div className={styles.title}>
            {title}
          </div>
        }
      </div>
    )
  };
  renderWeek = (year, week) => {
    const weekDays = [1, 2, 3, 4, 5, 6, 7]
    const weekDates = weekDays.map(weekDay => {
      return dateFromYearWeekDay(year, week, weekDay)
    })
    return (
      <div className={styles.weekRow} key={`${year}-${week}`}>
        {weekDates.map(this.renderDay)}
      </div>
    )
  };
  renderCalendar = () => {
    const { year } = this.props
    const calendar = []
    for (let i = 1; i < (365 / 7) * 3; i++) {
      calendar.push(
        this.renderWeek(year, i)
      )
    }
    return calendar
  };
  render() {
    const { mode } = this.props
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], styles.calendarWrapper)
        }
      >
        <div className={styles.calendar}>
          {this.renderCalendar()}
        </div>
      </div>
    )
  }
}

module.exports = ( createdAt, { monthTitle = 'abbr' } = {}) => {
    let months;
    if (monthTitle === 'abbr') {
      months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      };
    } 
    else {
      months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
    }


    const dateData = new Date(createdAt);
    const monthTitleStyle = months[dateData.getMonth()];


    let dateNumb;{
        dateNumb = dateData.getDate();
    }


    const year = dateData.getFullYear();


    let hour;
    if (dateData.getHours > 12) {
      hour = Math.floor(dateData.getHours() / 2);
    }
    else {
      hour = dateData.getHours();
    }
    if (hour === 0) {
      hour = 12;
    }


    const minute = dateData.getMinutes();


    let AMPM;
    if (dateData.getHours() >= 12) {
        AMPM = 'pm';
    }
    else {
        AMPM = 'am';
    }


    const timeStamp = `On: ${monthTitleStyle} ${dateNumb}, ${year} at ${hour}:${minute} ${AMPM}`;
    return timeStamp;
  };
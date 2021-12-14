import moment from 'moment';

function isNaN(v) {
    // eslint-disable-next-line
    return v !== v;
}

function hasDot(v) {
    return v.toString().indexOf('.') > -1;
}

const numberTool = {
    /**
     * 将秒数格式化为时间形式
     * @param  {string | number} value 输入数据
     * @param  {string} defaultAcc 精确度输入数据（如：
     * 精确度为second,则当小时，和分钟上都没有数据时，则只显示
     * 如25.当分钟上有数据时，则显示01：25而当精确度为minute时，
     * 则为 04：45
     * @return {string}       格式化后的时间字符串
     */
    toTime: function (value, defaultAcc = 'minute') {
        value = parseInt(value, 10);
        // let result = '-';
        let resultStr = '';
        if (value >= 0) {
            let second = value % 60;
            let secondS = second < 10 ? '0' + second : second;
            let minute = parseInt(value / 60, 10);
            let hour = parseInt(minute / 60, 10);
            minute = minute % 60;
            let minuteS = minute < 10 ? '0' + (minute % 60) : minute % 60;
            let hourS = hour < 10 ? '0' + hour : hour;
            switch (defaultAcc) {
                case 'second':
                    if (hour && minute) {
                        resultStr = hourS + ':' + minuteS + ':' + secondS;
                    }
                    else if (!hour && minute) {
                        resultStr = minuteS + ':' + secondS;
                    }
                    else {
                        resultStr = secondS;
                    }
                    break;
                case 'minute':
                    if (hour) {
                        resultStr = hourS + ':' + minuteS + ':' + secondS;
                    }
                    else {
                        resultStr = minuteS + ':' + secondS;
                    }
                    break;
                case 'hour':
                    resultStr = hourS + ':' + minuteS + ':' + secondS;
                    break;
                default:
                    resultStr = hourS + ':' + minuteS + ':' + secondS;
                    break;
            }
        }
        return resultStr;
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @return {string}           格式化后的日期字符串
     */
    toHour: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hour().toString();
            if (hour.length === 1) {
                hour = '0' + hour;
            }
            return hour + ':00';
        }
        return '-';
    },

    /**
     * 格式化时间
     * @param  {number | string} value     时间的秒数形式
     * @return {string}           格式化后的时间字符串
     */
    toHourMinute: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hour().toString();
            let min = moment.unix(+value).minute().toString();
            if (hour.length === 1) {
                hour = '0' + hour;
            }
            if (min.length === 1) {
                min = '0' + min;
            }
            return hour + ':' + min;
        }
        return '-';
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @return {string}           格式化后的日期字符串
     */
    toHourRange: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hours();
            return hour + '时-' + (hour + 1) + '时';
        }
        return '-';
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @param  {string} formatter 期望格式化的形式
     * @return {string}           格式化后的日期字符串
     */
    toDateString: function (value, formatter = 'YYYY-MM-DD') {
        return (value !== null && +value >= 0) ? moment.unix(+value).format(formatter) : '-';
    },

    /**
     * 格式化日期时间
     * @param  {number | string} value     日期的秒数形式
     * @param  {string} formatter 期望格式化的形式
     * @return {string}           格式化后的日期时间字符串
     */
    toDateTimeString: function (value, formatter = 'YYYY-MM-DD h:mm:ss a') {
        return (value !== '' && value !== undefined && value !== null && +value >= 0)
            ? moment(+value * 1000).format(formatter)
            : '-';
    },

    /**
     * 计算时间差
     * @param  {number | string} eTime 起始时间的秒数形式
     * @param  {number | string} sTime 结束时间的秒数形式
     * @return {object}       {days: 'xx', hours: 'xx'}
     */
    hoursToX: function (eTime, sTime) {
        sTime = sTime ? moment.unix(+sTime) : moment();
        const duration = moment.unix(+eTime).diff(sTime, 'hours');
        return {
            days: parseInt(duration / 24, 10),
            hours: duration % 24
        };
    },

    /**
     * 格式化为百分比形式，支持负数
     * @param  {string | number} value  输入数据
     * @param  {number}         digit 小数点后保留位数
     * @return {string}               格式化后的百分比字符串
     */
    toPercent: function (value, digit = 2) {
        if (value !== null && typeof +value === 'number' && !isNaN(+value)) {
            return (+value * 100).toFixed(digit) + '%';
        }
        return '-';
    },

    /**
     * 格式化为百分比形式(不带百分号)，支持负数
     * @param  {string | number} value  输入数据
     * @param  {number}         digit 小数点后保留位数
     * @return {string}               格式化后的百分比字符串
     */
    toPercentNumber: function (value, digit = 2) {
        if (value !== null && typeof +value === 'number' && !isNaN(+value)) {
            return (+value * 100).toFixed(digit);
        }
        return '-';
    },

    /**
     * 将数字转换为千分撇形式
     * @param  {string | number} value 输入数据
     * @return {string}      格式化后的字符串
     */
    toComma: function (value) {
        if (value !== null && +value >= 0) {
            value = value.toString();
            let numberRE = /(\d+)(\d{3})/g;
            let num = value.split('.');
            value = num[0];
            let decimal = num[1];
            while (numberRE.test(value)) {
                value = value.replace(numberRE, '$1' + ',' + '$2');
            }

            if (decimal) {
                decimal = decimal.substring(0, 2);
                value += '.' + decimal;
            }
            return value;
        }
        return '-';
    },

    toUnit: function (value) {
        if (value !== null && +value >= 0) {
            if (value > 10000) {
                value = value.toFixed(0);
                let numberRE = /(\d+)(\d{3})/g;
                let units = [{ name: '亿', value: 99999999 }, { name: '万', value: 99999 }];
                let numberUnit = '';
                let unit = {};
                for (let i = 0; i < units.length; i++) {
                    unit = units[i];
                    if (+value > unit.value) {
                        if (unit.name === '万') {
                            numberUnit = ((+value) / (unit.value - 90000 + 1)).toFixed(1) + '';
                        }
                        else {
                            numberUnit = ((+value) / (unit.value + 1)).toFixed(1) + '';
                        }
                        numberUnit = numberUnit.replace(/\.0$/, '') + unit.name;
                        return numberUnit;
                    }
                }
                while (numberRE.test(value)) {
                    value = value.replace(numberRE, '$1' + ',' + '$2');
                }
                return value;
            }

            value = value.toString();
            let num = value.split('.');
            value = num[0];
            let decimal = num[1];
            if (decimal) {
                decimal = decimal.substring(0, 2);
                value += '.' + decimal;
            }
            return value;
        }
        return '-';
    },

    toTel: function (phone) {
        if (!phone) {
            return '-';
        }
        let phoneReg = /^1[3-9]\d{9}$/;
        // eslint-disable-next-line
        let areaReg = /(^10|^2\d|^(3[1-5]|37|39|4[1-3]|4[5-8]|5[1-9]|63|66|69|7[0-7]|79|8[1-3]|85|8[7-9]|90|91|9[3-5]|97|99)[0-9])/;
        let tel = String(phone) || '';
        tel = tel.replace(/^\+?0086|^\+86/, '');
        tel = phoneReg.test(tel) ? tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
            : tel.replace(areaReg, '0$1 ').replace(/(\d{4})$/, ' $1');
        return tel;
    },

    /**
     * 将秒转成 00：00：00
     * @param  {string | number} input 秒为单位
     * @param  {string | number} msFormat msFormat 单位为毫秒/msFormat  如为毫秒，则msFormat为1000
     * @return {string}      格式化后的字符串
     */
    toTimeRange: function (input, msFormat = 1) {
        if (!(input >= 0)) {
            return input;
        }

        msFormat = parseInt(msFormat, 10);
        input = parseInt(input, 10);
        if (!isNaN(msFormat)) {
            input = input / msFormat;
        }

        let result = '-';
        if (input >= 0) {
            let second = input % 60;
            if (hasDot(second)) {
                second = second.toFixed(3);
            }
            let secondS = second < 10 ? '0' + second : second;
            let minute = parseInt(input / 60, 10);
            let hour = parseInt(minute / 60, 10);
            minute = minute % 60;
            let minuteS = minute < 10 ? '0' + (minute % 60) : minute % 60;
            let hourS = hour < 10 ? '0' + hour : hour;
            result = hourS + ':' + minuteS + ':' + secondS;
        }
        return result;
    },

    /**
     * 报表默认格式 小数转换为两位精度
     * @param  {string | number} value 默认数字
     * @return {string}      格式化后的字符串
     */
    toDefault: function (value) {
        function ForDight(Dight, How) {
            Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
            return Dight;
        }

        if (value !== '' && !isNaN(Number(value))) {
            value = '' + value;
            return value.indexOf('.') < 0
                ? value
                : ForDight(value, 2);
        }
        else if (value === '') {
            // 此处和shumin沟通，账户中心报表如果出现数据为空的情况，默认为上游录入侧，输入数据为空或者空格，统一显示「-」
            return '-';
        }
        return value;
    },

    /**
     * 将指定毫秒数转换为易读字符串
     * @param {number} ms 时间长度，单位毫秒
     * @return {string}
    */
    toDuration: function (ms) {
        if (!(ms >= 0)) {
            return ms;
        }
        let r = [];
        let seconds = Math.ceil(ms / 1e3);
        // 是否超过一天
        if (seconds > 86400) {
            let day = Math.floor(seconds / 86400);
            if (day > 0) {
                r.push(day + ' 天');
            }
            seconds %= 86400;
        }

        if (seconds > 3600) {
            let hour = Math.floor(seconds / 3600);
            if (hour > 0) {
                r.push(hour + ' 时');
            }
            seconds %= 3600;
        }
        if (seconds > 60) {
            let minute = Math.floor(seconds / 60);
            if (minute > 0) {
                r.push(minute + ' 分');
            }
            seconds %= 60;
        }
        if (seconds || ms === 0) {
            r.push(seconds + ' 秒');
        }
        // 注意，最多取两部分，比如  1 天 3 时，或 3 时 22 分，或 23 分 1 秒
        r = r.slice(0, 2);
        return r.join(' ');
    },

    /**
     * 将输入转化为字符串
     * @param  {*} value 输入
     * @return {string}      格式化后的字符串
     */
    toStr: function (value) {
        return '' + value;
    },

    toCustom: function (value, formatter = '') {
        return formatter || value;
    },
};
export default numberTool;

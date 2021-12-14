import classof from '@/utils/classof';
import numberTool from '@/utils/numberTool';
/* eslint-disable */
export let assembleUrlGroup = function (options) {
    // 组装组件请求列表
    let urls = [];
    let urlSet = {};
    options.tabGroup.forEach(group => {
        group.tabs.forEach(tab => {
            tab.levelOne && tab.levelOne.forEach(field => {
                if (!urlSet['default' + field.url]) {
                    field.url && urls.push({
                        kind: 'default',
                        url: field.url
                    });
                    urlSet['default' + field.url] = 'default' + field.url;
                }
            });
            tab.levelTwoColumns && tab.levelTwoColumns.forEach(levelTwo => {
                levelTwo.fields && levelTwo.fields.forEach(field => {
                    if (!urlSet['default' + field.url]) {
                        field.url && urls.push({
                            kind: 'default',
                            url: field.url
                        });
                        urlSet['default' + field.url] = 'default' + field.url;
                    }
                    if (field.child) {
                        field.child.levelThreeFields && field.child.levelThreeFields.forEach(field3 => {
                            if (!urlSet['default' + field3.url]) {
                                field3.url && urls.push({
                                    kind: 'default',
                                    url: field3.url
                                });
                                urlSet['default' + field3.url] = 'default' + field3.url;
                            }
                            field3.levelFour && field3.levelFour.forEach(field4 => {
                                if (!urlSet['default' + field4.url]) {
                                    field4.url && urls.push({
                                        kind: 'default',
                                        url: field4.url
                                    });
                                    urlSet['default' + field4.url] = 'default' + field4.url;
                                }
                            });
                        });
                        field.child.levelThreeChart && field.child.levelThreeChart.forEach(field3C => {
                            if (!urlSet[field3C.type + field3C.url]) {
                                field3C.url && urls.push({
                                    kind: field3C.type,
                                    url: field3C.url
                                });
                                urlSet[field3C.type + field3C.url] = field3C.type + field3C.url;
                            }
                        });
                    }
                });
            });
            tab.levelTwoChart && tab.levelTwoChart.forEach(LevelTwoC => {
                if (!urlSet[LevelTwoC.type + LevelTwoC.url]) {
                    LevelTwoC.url && urls.push({
                        kind: LevelTwoC.type,
                        url: LevelTwoC.url
                    });
                    urlSet[LevelTwoC.type + LevelTwoC.url] = LevelTwoC.type + LevelTwoC.url;
                }
            });
            tab.levelThree && tab.levelThree.forEach(field => {
                if (!urlSet['default' + field.url]) {
                    field.url && urls.push({
                        kind: 'default',
                        url: field.url
                    });
                    urlSet['default' + field.url] = 'default' + field.url;
                }
                field.levelFour && field.levelFour.forEach(field4 => {
                    if (!urlSet['default' + field4.url]) {
                        field4.url && urls.push({
                            kind: 'default',
                            url: field4.url
                        });
                        urlSet['default' + field4.url] = 'default' + field4.url;
                    }
                });
            });
            tab.levelThreeChart && tab.levelThreeChart.forEach(levelThreeC => {
                if (!urlSet[levelThreeC.type + levelThreeC.url]) {
                    levelThreeC.url && urls.push({
                        kind: levelThreeC.type,
                        url: levelThreeC.url
                    });
                    urlSet[levelThreeC.type + levelThreeC.url] = levelThreeC.type + levelThreeC.url;
                }
            });
        });
    });
    return urls;
}

export let valueFormatter = function (value, format, formatter) {
    let _formatter = formatter || (classof(numberTool[`to${format}`]) === 'Function'
        ? numberTool[`to${format}`]
        : undefined);
    if (_formatter) {
        return _formatter(value);
    }
    return value || '-';
}

export let computeData = function (args, rulesOptions) {
    let tableData = {};
    Object.keys(args).forEach(key => {
        tableData[key] = args[key][0];
    });
    if (rulesOptions.length) {
        rulesOptions.forEach(key => {
            let result = {};
            // 对应的计算规则
            if (tableData[key]) {
                switch (key) {
                    case 'tb':
                        tableData.records ? Object.keys(tableData.records).forEach(key => {
                            tableData['tb'][key] ? result[key] = (
                                (tableData['records'][key] - tableData['tb'][key]) / tableData['tb'][key] * 100
                            ).toFixed(2) : result[key] = undefined;
                        }) : '';
                        tableData['result-' + key] = result;
                        break;
                    case 'hb':
                        tableData.records ? Object.keys(tableData.records).forEach(key => {
                            tableData['hb'][key] ? result[key] = (
                                (tableData['records'][key] - tableData['hb'][key]) / tableData['hb'][key] * 100
                            ).toFixed(2) : result[key] = undefined;
                        }) : '';
                        tableData['result-' + key] = result;
                        break;
                    default:
                        console.log('未进行过定义的规则');
                }
            }
            else {
                switch (key) {
                    case 'tb':
                        tableData['result-' + key] = result;
                        break;
                    case 'hb':
                        tableData['result-' + key] = result;
                        break;
                    default:
                        console.log('未进行过定义的规则');
                }
            }
        });
    }
    return tableData;
};

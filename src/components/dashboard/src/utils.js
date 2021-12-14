exports.moreFunc = function (options) {
    let res = [];
    options.forEach((item, index) => {
        res.push({
            text: item.label,
            value: index
        });
    });
    return res;
};

exports.handleMore = function (val, options) {
    options[val.index].goto && window.open(options[val.index].goto);
    options[val.index].eventName && this.$emit(options[val.index].eventName);
};

exports.defaultColors
    = ['#00D58B', '#4A70FF', '#00B7FF', '#FF9A38', '#FFCD54', '#F75559', '#8257FB', '#25B2B1', '#FF3F8E', '#5976A9'];

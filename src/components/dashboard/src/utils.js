exports.moreFunc = function (options) {
    console.log(options);
    let res = [];
    options.forEach((item, index) => {
        res.push({
            label: item.label,
            key: index
        });
    });
    return res;
};

exports.handleMore = function (val, options) {
    options[val.key].goto && window.open(options[val.key].goto);
    options[val.key].eventName && this.$emit(options[val.key].eventName);
};

exports.defaultColors
    = ['#00D58B', '#4A70FF', '#00B7FF', '#FF9A38', '#FFCD54', '#F75559', '#8257FB', '#25B2B1', '#FF3F8E', '#5976A9'];

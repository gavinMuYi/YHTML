module.exports = function (params) {
    let obj = {};
    for (let i = 1; i < 100; i++) {
        obj['keyindex' + i] = i;
    }
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                total: 200,
                records: [obj, obj, obj, obj, obj]
            },
            msg: 'success'
        }
    };

};

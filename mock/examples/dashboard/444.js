module.exports = function (params) {
    let obj = {};
    for (let i = 1; i < 100; i++) {
        obj['dashboard' + i] = i;
        obj['dashboard'] = `01-1`;
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

module.exports = function (params) {
    let obj = {};
    let objtb = {};
    let objhb = {};
    for (let i = 1; i < 100; i++) {
        objtb['dashboard' + i] = (i * 98);
        objhb['dashboard' + i] = (i * 12);
        obj['dashboard' + i] = (i * 22);
    }
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                total: 200,
                records: [obj],
                tb: [objtb],
                hb: [objhb],
            },
            msg: 'success'
        }
    };

};

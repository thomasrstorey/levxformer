module.exports = function (s, t) {
    var d = [],
        s = ' ' + s,
        t = ' ' + t;

    function min () {
        var m = Infinity;
        for (var i = 0; i <= arguments.length; i++) {
            m = arguments[i] < m ? arguments[i] : m;
        }
        return m;
    }
    
    for (var i = 0; i < t.length; i++) {
        d[i] = [i]
    }

    for (var j = 0; j < s.length; j++) {
        d[0][j] = j;
    }

    for (var j = 1; j < s.length; j++) {
        for (var i = 1; i < t.length; i++) {
            if (s.charAt(j) === t.charAt(i)) {
                d[i][j] = d[i-1][j-1];
            } else {
                d[i][j] = min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + 1);
            }
        }
    }

    return {
        distance: d[t.length - 1][s.length - 1],
        matrix: d,
        getState: function () {
            
        }
    };
};
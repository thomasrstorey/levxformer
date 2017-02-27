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

    function getState (s, t, l, x) {
        var i = d.length - 1;
        var j = d[0].length - 1;
        var state = s;

        function sub (s, t, i, j) {
            return s.slice(0, i) + t.charAt(j) + s.slice(i+1);
        }

        function del (s, i) {
            return s.slice(0, i) + s.slice(i+1);
        }

        function ins (s, t, i, j) {
            if (i === s.length - 1){
                return s + t.charAt(j);
            } else {
                return s.slice(0, i) + t.charAt(j) + s.slice(i);
            }
            
        }

        while (i >= 0 && j >= 0 && x < l) {
            if(s.charAt(j) === t.charAt(i)){
                i -= 1;
                j -= 1;
            } else if (d[i-1][j] + 1 === l) {
                state = ins(state, t, j, i);
                i -= 1;
            } else if (d[i][j-1] + 1 === l) {
                state = del(state, j);
                j -= 1;
            } else if (d[i-1][j-1] + 1 === l) {
                state = sub(state, t, j, i);
                i -= 1;
                j -= 1;
            } else {
                throw Error;
            }
            l = d[i][j];
        }
        return state.slice(1);
    }

    return {
        distance: d[t.length - 1][s.length - 1],
        matrix: d,
        getState: getState.bind(null, s, t, d[t.length - 1][s.length - 1])
    };
};
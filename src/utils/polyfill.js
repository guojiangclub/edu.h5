if ([1, 0].sort((a, b) => a > b).toString() !== '0,1') {
    Array.prototype._sort = Array.prototype.sort;
    Array.prototype.sort = function(callback) {
        if (typeof callback !== 'function') {
            return this._sort();
        } else {
            return this._sort(function() {
                var ret = callback.apply(null, arguments);
                if (ret === true) {
                    ret = 1;
                } else if (ret === false) {
                    ret = -1;
                }

                return ret;
            })
        }
    };
}
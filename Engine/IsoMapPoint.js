var IsoMapPoint = (function () {
    function IsoMapPoint(row, column) {
        if (row !== undefined) {
            this.row = row;
        }
        if (column !== undefined) {
            this.column = column;
        }
    }
    IsoMapPoint.prototype.set = function (row, column) {
        this.row = row;
        this.column = column;
    };
    IsoMapPoint.prototype.get = function () {
        return {
            row: this.row,
            column: this.column
        };
    };
    return IsoMapPoint;
})();

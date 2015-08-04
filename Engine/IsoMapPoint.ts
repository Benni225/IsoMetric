interface IIsoMapPoint {
    row: number;
    column: number;
}

class IsoMapPoint {
    row: number;
    column: number;

    constructor(row?: number, column?: number) {
        if (row !== undefined) {
            this.row = row;
        }

        if (column !== undefined) {
            this.column = column;
        }
    }

    set(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    get(): IIsoMapPoint {
        return {
            row: this.row,
            column: this.column
        };
    }
}
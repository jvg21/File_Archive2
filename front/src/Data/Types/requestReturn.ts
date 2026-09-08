export class RequestReturn {

    private _data: any = []
    private _message: string = ''
    private _status: number = 0


    get data() { return this._data; }
    set data(value: any) {
        if (Array.isArray(value)) {
            this._data = value;
        } else {
            console.warn('RequestReturn.data recebeu valor não-array:', value);
            this._data = [];
        }
    }

    get message() { return this._message; }
    set message(value: string) { this._message = value; }

    get status() { return this._status; }
    set status(value: number) { this._status = value; }
}



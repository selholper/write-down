import { runInAction, makeAutoObservable } from 'mobx';
import { Response } from 'utils/http';

export type Rule = (s: string) => string

class FormField {
    private _value = '';
    private _isValid = false;
    private _errorMsg = '';

    constructor(private rules: Rule[]) {
        makeAutoObservable(this);
    }

    public get value(): string { return this._value; }

    public get isValid(): boolean { return this._isValid; }

    public get errorMsg(): string { return this._errorMsg; }

    private set errorMsg(value: string) {
        this._isValid = !value;
        this._errorMsg = value;
    }

    public update(value: string): void {
        this._value = value;
        for (const rule of this.rules) {
            const errorMsg = rule(value);
            if (errorMsg) {
                this.errorMsg = errorMsg;
                return;
            }
        }
        this.errorMsg = '';
    } 
}

export default class FormStore {
    private _fields: Record<string, FormField> = { };
    private _alertText = '';

    constructor(
        rulesById: Record<string, Rule[]>,
        private _submitFunc: (data: object) => Promise<Response<string>>) {
        for (const [id, rules] of Object.entries(rulesById))
            this._fields[id] = new FormField(rules);
        
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public get fields(): Record<string, FormField> { return this._fields; }

    public get alertText(): string { return this._alertText; }

    public get allValid(): boolean {
        for (const [, field] of Object.entries(this._fields))
            if (!field.isValid)
                return false;
        return true;
    }

    public onFieldChange(id: string, value: string): void {
        this._fields[id].update(value);
    }

    public async submit(data: object): Promise<void> {
        const res = await this._submitFunc(data);
        runInAction(() => this._alertText = res.success ? '' : res.message);
    }

    public resetAlertText(): void {
        this._alertText = '';
    }
}
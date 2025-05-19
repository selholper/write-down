import { runInAction, makeAutoObservable } from 'mobx';
import { request, Response } from 'utils/http';

export default class AuthStore {
    private readonly BASE_URL = 'user/';
    private _isAuthorized = false;
    private _isInitializing = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.auth().then(() => runInAction(() => this._isInitializing = false));
    }

    public get isAuthorized(): boolean { return this._isAuthorized; }

    public get isInitializing(): boolean { return this._isInitializing; }

    public async signIn(data: object): Promise<Response<string>> {
        return await this._updateStatus('sign-in', data);
    }

    public async signUp(data: object): Promise<Response<string>> {
        return await this._updateStatus('sign-up', data);
    }

    public async auth(): Promise<Response<string>> {
        return await this._updateStatus('auth', {});
    }

    public async signOut(): Promise<Response<string>> {
        return await this._updateStatus('sign-out', {}, true);
    }

    private async _updateStatus(url: string, data: object, flip=false): Promise<Response<string>> {
        const res = await request<string>(this.BASE_URL + url, 'post', data);
        runInAction(() => this._isAuthorized = flip ? !res.success : res.success);
        return res;
    }
}
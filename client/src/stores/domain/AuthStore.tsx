import { runInAction, makeAutoObservable } from 'mobx';
import { request, Response } from 'utils/http';

export interface UserInfo {
    name: string;
}

export default class AuthStore {
    private readonly BASE_URL = 'user/';
    private _isAuthorized = false;
    private _isInitializing = true;
    private _userInfo: UserInfo | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.auth().then(() => runInAction(() => this._isInitializing = false));
    }

    public get isAuthorized(): boolean { return this._isAuthorized; }

    public get isInitializing(): boolean { return this._isInitializing; }
    
    public get userInfo(): UserInfo | null { return this._userInfo; }

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

    private async _updateStatus(url: string, data: object, flip=false): Promise<Response<any>> {
        const res = await request<any>(this.BASE_URL + url, 'post', data);
        runInAction(() => {
            this._isAuthorized = flip ? !res.success : res.success;
            if (res.success && res.message && typeof res.message === 'object' && res.message.name) {
                this._userInfo = { name: res.message.name };
            } else if (!res.success) {
                this._userInfo = null;
            }
        });
        return res;
    }
}
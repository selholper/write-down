import AuthStore from './AuthStore';
import NotesStore from './NotesStore';

export default class AppStore {
    public readonly authStore: AuthStore;
    public readonly notesStore: NotesStore;

    constructor() {
        this.authStore = new AuthStore();
        this.notesStore = new NotesStore(this);
    }
}
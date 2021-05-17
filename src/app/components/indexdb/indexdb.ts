import { UserData } from '../../models/user-data';

export class Indexdb {
  public DBOpenReq: IDBOpenDBRequest;

  public db: IDBDatabase | undefined;

  private objectStore: IDBObjectStore | undefined;

  constructor() {
    this.DBOpenReq = indexedDB.open('YuriyL-Git', 1);

    this.DBOpenReq.addEventListener('success', () => {
      this.db = this.DBOpenReq.result;
    });

    this.DBOpenReq.addEventListener('upgradeneeded', () => {
      this.db = this.DBOpenReq.result;
      if (!this.db.objectStoreNames.contains('MathGameStore')) {
        this.objectStore = this.db.createObjectStore('MathGameStore', {
          autoIncrement: true,
        });
        this.objectStore.createIndex('email', 'email', { unique: true });
      }
    });
  }

  add(value: UserData, callbackResult: (m: string) => void): void {
    const transaction = this.db?.transaction(['MathGameStore'], 'readwrite');
    const objectStore = transaction?.objectStore('MathGameStore');
    const request = objectStore?.add(value);

    request?.addEventListener('success', () => {
      callbackResult('');
    });

    transaction?.addEventListener('error', event => {
      event.preventDefault();
      callbackResult('Email is already present in the base!');
    });
  }
}

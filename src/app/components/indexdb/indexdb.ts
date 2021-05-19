import { User } from '../../models/user';

interface Transaction {
  transaction: IDBTransaction | undefined;
  objectStore: IDBObjectStore | undefined;
}

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

  getTransaction(): Transaction {
    const transaction = this.db?.transaction('MathGameStore', 'readwrite');
    const objectStore = transaction?.objectStore('MathGameStore');
    return { transaction, objectStore };
  }

  addRecord(value: User, callbackResult: (m: string) => void): void {
    const { transaction, objectStore } = this.getTransaction();
    const request = objectStore?.add(value);

    request?.addEventListener('success', () => {
      callbackResult('');
    });

    transaction?.addEventListener('error', event => {
      event.preventDefault();
      callbackResult('Email is already present in the base!');
    });
  }

  updateRecord(value: User): void {
    const { objectStore } = this.getTransaction();

    const indexEmail = objectStore?.index('email');
    const getKeyRequest = indexEmail?.getKey(value.email);
    getKeyRequest?.addEventListener('success', () => {
      objectStore?.put(value, getKeyRequest.result);
    });
  }

  async getTopPlayers(): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      const { transaction, objectStore } = this.getTransaction();
      const playersRequest = objectStore?.getAll();
      playersRequest?.addEventListener('success', () => {
        resolve(
          playersRequest?.result
            .sort((a: User, b: User) => b.score - a.score)
            .slice(0, 10),
        );
      });

      transaction?.addEventListener('error', error => {
        reject(error);
      });
    });
  }
}

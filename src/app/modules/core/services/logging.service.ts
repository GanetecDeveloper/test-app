import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

  static db;

  constructor() {
    this.initIndexedDB();
  }

  /**
   * Metodo para iniciar la base de datos local (indexedDB), crea metodos asincronos onsuccess y
   * onupgradeneeded para crear y actualizar la bd.
   */
  initIndexedDB() {
    const indexedDB = window.indexedDB;

    if(indexedDB) {
      const request = indexedDB.open('logs', 1); // DB name and version
      request.onsuccess = () => {
        LoggingService.db = request.result;
        console.debug('# CORE - LoggingService: open', LoggingService.db);
      }

      request.onupgradeneeded = () => {
        LoggingService.db = request.result;
        console.debug('# CORE - LoggingService: create', LoggingService.db);
        const objectStore = LoggingService.db.createObjectStore('log', {
          autoIncrement: true
        });
      }

      request.onerror = (error) => {
        console.error("# CORE - LoggingService: request onError", error)
      }
    }
  }
  /**
   * Método para añadir campos a las tablas.
   * @param data JSON con los datos que queremos añadir a la BD.
   */
  addData(message) {
    const transaction = LoggingService.db.transaction(['log'], 'readwrite');
    const objectStore = transaction.objectStore('log');
    objectStore.add({
      date: this.getCurrentDate(),
      message: message,
    });
    // console.debug('# [CORE - ERROR (LoggingService)] Added log');
  }
  
  logDebug(message: string) {
    const logEntry = this.createLogStatement('debug', message)
    console.debug(logEntry);
    return logEntry;
  }

  logError(message: string, stack?: string) {
    const logEntry = this.createLogStatement('error', message)
    console.error(logEntry);
    this.addData(message);
    return logEntry;
  }

  logWarn(message: string)  {
    const logEntry = this.createLogStatement('warning', message)
    console.warn(logEntry);
    return logEntry;
  }

  logInfo(message: string) {
    const logEntry = this.createLogStatement('info', message)
    console.info(logEntry);
    return logEntry;
  }

  private createLogStatement (level, message) {
    const date = this.getCurrentDate();
    return `# [CORE - ERROR (LoggingService)] [${level}][${date}] ${message}`;
  }

  private getCurrentDate () {
    return new Date().toLocaleString();
  }
}
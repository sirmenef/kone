import { Contact } from './../models/contact-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  formData: Contact;
  readonly apiURI = "https://localhost:5001/api/contacts/";

  getContactList(): Observable<Contact[]> {

    return this.httpClient.get<Contact[]>(this.apiURI);

  }

  addContact(cont: Contact) {

    return this.httpClient.post(this.apiURI, cont, { responseType: 'text' });
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  deleteContact(id: number) {
    return this.httpClient.delete(this.apiURI + id)
  }

  editContact(cont: Contact) {
    return this.httpClient.put(this.apiURI + cont.id, cont)
  }

  getContact(id: number) {
    return this.httpClient.get(this.apiURI + id);
  }
}

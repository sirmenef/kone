import { UserDetails } from '../models/user-model';
import { LoginDetails } from '../models/login-model';
import { Contact } from '../models/contact-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  readonly apiURI = "https://localhost:5001/api/contacts/";
  readonly loginUri = "https://localhost:5001/api/";

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  formData: Contact;

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

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

  login(username, password) {
    return this.httpClient.post<{ username, password }>(this.loginUri, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user) {
    return this.httpClient.post(this.loginUri + "create", user)
  }




}

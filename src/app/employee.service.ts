
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiUrl = 'http://localhost:3000/employees';
  private loggedInEmployeeId: number | null = null;
  private refreshListSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get employee details by ID
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(url);
  }

  // Add a new employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  // Update employee by ID
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, employee);
  }

  // Delete employee by ID
  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.delete(url);
  }

  // Notify subscribers to refresh the employee list
  notifyRefreshList(): void {
    this.refreshListSubject.next();
  }

  // Subscribe to this method in components to get notified when the list needs to be refreshed
  onRefreshList(): Observable<void> {
    return this.refreshListSubject.asObservable();
  }

  getEmployeeDetailsByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any[]>(url);
  }
  

  // Set the logged-in employee ID
    setLoggedInEmployeeId(employeeId: number | null): void {
    this.loggedInEmployeeId = employeeId;
  }

  // Get the logged-in employee ID
  getLoggedInEmployeeId(): number | null {
    return this.loggedInEmployeeId;
  }



}

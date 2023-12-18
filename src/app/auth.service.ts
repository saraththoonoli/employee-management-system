// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private hrCredentials = { username: 'hr', password: 'hrpassword' };
  private employeeCredentials: any[] = [];
  private loggedInEmployeeId: number | null = null;
  constructor(private http: HttpClient) {
    // Fetch employee credentials from the server (db.json)
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(employees => {
      this.employeeCredentials = employees.map(employee => ({
        id: employee.id,
        username: employee.username,
        password: employee.password
      }));
    });
  }

  login(username: string, password: string): boolean {
    // Check HR credentials
    if (username === this.hrCredentials.username && password === this.hrCredentials.password) {
      localStorage.setItem('role', 'hr');
      return true;
    }
  
    // Check employee credentials
    const employee = this.employeeCredentials.find(cred => cred.username === username && cred.password === password);
  
    if (employee) {
      localStorage.setItem('role', 'employee');
      localStorage.setItem('employeeId', employee.id.toString());
      this.loggedInEmployeeId = employee.id; // Store the logged-in employee ID
      return true;
    }
    console.log('Authentication failed. Returning false.');
    return false;
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
    this.loggedInEmployeeId = null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }

  setLoggedInEmployeeId(employeeId: string): void {
    localStorage.setItem('employeeId', employeeId);
  }

  getLoggedInEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }

  clearLoggedInEmployeeId(): void {
    localStorage.removeItem('employeeId');
  }

  // Add the following methods
  setLoggedInEmployeeDetails(details: any): void {
    localStorage.setItem('employeeDetails', JSON.stringify(details));
  }

  getLoggedInEmployeeDetails(): any | null {
    const details = localStorage.getItem('employeeDetails');
    return details ? JSON.parse(details) : null;
  }

  clearLoggedInEmployeeDetails(): void {
    localStorage.removeItem('employeeDetails');
  }
  
}

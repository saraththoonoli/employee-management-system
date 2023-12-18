
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:3000/leaveRequests';

  constructor(private http: HttpClient) {}

  applyLeave(employeeId: number, leaveDetails: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const leaveRequest = { employeeId, ...leaveDetails, status: 'pending' };
    return this.http.post(url, leaveRequest);
  }

  getEmployeeLeaveRequests(employeeId: number): Observable<any[]> {
    const url = `${this.apiUrl}?employeeId=${employeeId}`;
    return this.http.get<any[]>(url);
  } 
}

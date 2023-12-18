import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrLeaveService {

  private apiUrl = 'http://localhost:3000/leaveRequests';
  private leaveDetailsUrl = 'http://localhost:3000/leaveDetails';

  constructor(private http: HttpClient) {}

  getPendingLeaveRequests(): Observable<any[]> {
    const url = `${this.apiUrl}?status=pending`;
    return this.http.get<any[]>(url);
  }

  approveLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.put(url, { status: 'approved' });
  }

  rejectLeave(leaveRequestId: number): Observable<any> {
    const url = `${this.apiUrl}/${leaveRequestId}`;
    return this.http.put(url, { status: 'rejected' });
  }

  
}

// Import the Location service from @angular/common
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeId: any;
  employee: any = {};

  // Inject the Location service in the constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private location: Location  // Make sure Location is injected here
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.loadEmployeeDetails();
    });
  }

  loadEmployeeDetails(): void {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  updateEmployee(): void {
    this.employeeService
      .updateEmployee(this.employeeId, this.employee)
      .subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee details updated successfully.',
            icon: 'success',
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the employee details.',
            icon: 'error',
          });
        }
      );
  }
  

  goBack(): void {
    this.location.back();
  }
}

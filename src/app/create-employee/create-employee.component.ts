import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  employee: any = {
    name: '',
    email: '',
    phone: '',
    age: null,
    dob: null,
    image: '',
    bloodGroup: '',
    gender: '',
    leaveDetails: ''
  };

  constructor(private employeeService: EmployeeService , private location: Location) {}

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully.',
          icon: 'success',
        });
        console.log('Employee added successfully.');
        // Optionally, navigate to the employee list or perform other actions
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the employee.',
          icon: 'error',
        });
        console.error('Error adding employee:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}

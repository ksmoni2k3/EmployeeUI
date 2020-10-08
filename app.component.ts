import { Component } from '@angular/core';
import { EmployeeService } from '../SharedService/app-data-service';
import { EmployeeDetails } from '../modals/modal';
import { API_END_POINT } from '../app-constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'emp-main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmployeeServiceUI';
  public arrEmpDetails: Array<EmployeeDetails>;
   public editDet = new EmployeeDetails();

  constructor(private dataService: EmployeeService, public httpService: HttpClient) {
    this.arrEmpDetails = [];
  }

  GetEmployeeDetails() {
    this.arrEmpDetails = [];
    console.log("test GetEmployeeDetails");
    this.httpService.get(API_END_POINT + 'GetEmployeeDetails').subscribe((empDetails: any[]) => {
      for (var i = 0; i < empDetails.length; i++) {
        let emp = new EmployeeDetails();
        emp.UserId = empDetails[i].userId;
        emp.FirstName = empDetails[i].firstName;
        emp.LastName = empDetails[i].lastName;
        emp.EmailId = empDetails[i].email;
        emp.Phone = empDetails[i].phoneNumber;
        emp.DOB = empDetails[i].dateOfBirth;
        this.arrEmpDetails.push(emp);
        console.log("Array Emp length :" + this.arrEmpDetails.length);
      }
    });
  }

  EditEmployeeDetails(event: any, itemDet: any) {
    this.editDet = new EmployeeDetails();
    this.editDet.UserId = itemDet.UserId;
    this.editDet.FirstName = itemDet.FirstName;
    this.editDet.LastName = itemDet.LastName;
    this.editDet.EmailId = itemDet.EmailId;
    this.editDet.Phone = itemDet.Phone;
    this.editDet.DOB = itemDet.DOB;
    console.log(itemDet);
  }

  UpdateDetails(editDet: any) {
    console.log(editDet);
    let selectedCategory = this.arrEmpDetails.filter(item => item.Phone.replace(/\s/g, "") == editDet.Phone.replace(/\s/g, ""))[0];
    if (selectedCategory?.Phone != null) {
      alert("Phone Number already exists")
    }
    else {
      this.arrEmpDetails.splice(editDet.UserId - 1, 1, this.editDet);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {BaseService} from './shared/base.service';
import {AppService} from './app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from './notify.service';
import {CustomValidatorDirective} from './custom-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  form: FormGroup;
  error: Array<any> = [];
  qualifications: Array<any> = [];
  employeeList: Array<any> = [];
  editState = false;
  loading = false;
  id: any;
  positions: Array<any> = [];
  constructor(private baseService: BaseService,
              private fb: FormBuilder,
              private notify: NotifyService,
              private service: AppService) {
  }

  // component initialization
  ngOnInit(): void {
    this.getAll();
    this.getPositions();
    this.form = this.fb.group({
      emp_Code: [null],
      emp_Name: [null, [Validators.required, CustomValidatorDirective.nameValidator, CustomValidatorDirective.lengthValidator]],
      doJ: [null, Validators.required],
      position_Code: [null, Validators.required]
    });
    this.getID();
  }

  // add qualification row
  addRow() {
    this.qualifications = [...this.qualifications, {
      num: this.qualifications.length + 1,
      qualification: null,
      completed_year: new Date(),
      grade: null
    }];
  }

  // remove row from qualification
  removeRow(id) {
    this.qualifications.splice(this.qualifications.findIndex(u => u.num === id), 1);
    this.qualifications = [...this.qualifications];
  }

  // save or edit employee information based on the edit state
  save() {
    if (this.editState) {
      this.edit();
    } else {
      this.add();
    }
  }

  // get all employees
  getAll() {
    this.loading = true;
    this.service.getAll().subscribe(u => {
      this.loading = false;
      this.employeeList = u.data;
    });
  }

  // get all positions
  getPositions() {
    this.service.getAllPositions().subscribe(u => {
      this.positions = u.data;
    });
  }

  // get the next employee ID eg: ECOM0003
  getID() {
    this.service.getNextIDs().subscribe(u => {
      this.form.get('emp_Code').setValue(u.data);
    });
  }

  // save employee information
  add() {
    const data = {
      basicInfo: this.form.value,
      qualifications: this.qualifications
    };

    this.loading = true;
    this.service.add(data).subscribe(u => {
      this.loading = false;
      if (u.status === 200) {
        this.getAll();
        this.clearForm();
        this.notify.createNotification('success', '', u.message);
      } else {
        this.notify.createNotification('error', '', u.message);
      }
    });
  }

  // edit employee information
  edit() {
    const data = {
      basicInfo: this.form.value,
      qualifications: this.qualifications
    };

    this.loading = true;
    this.service.edit(data, this.id).subscribe(u => {
      this.loading = false;
      if (u.status === 200) {
        this.editState = false;
        this.getAll();
        this.clearForm();
        this.notify.createNotification('success', '', u.message);
      } else {
        this.notify.createNotification('error', '', u.message);
      }
    });
  }

  delete(id) {
    this.loading = true;
    this.service.delete(id).subscribe(u => {
      this.loading = false;
      if (u.status === 200) {
        this.editState = false;
        this.getAll();
        this.clearForm();
        this.notify.createNotification('success', '', u.message);
      } else {
        this.notify.createNotification('error', '', u.message);
      }
    });
  }

  // get employee information
  getEmployee(item) {
    this.loading = true;
    this.service.getOne(item.emp_ID).subscribe(u => {
      this.loading = false;
      if (u.status === 200) {
        this.editState = true;
        const data = u.data;
        this.id = data.emp_ID;
        this.form.patchValue({
          emp_Code: data.emp_Code,
          emp_Name: data.emp_Name,
          doJ: data.doJ,
          position_Code: data.position_Code
        });
        this.qualifications = [...data.qualifications];
      } else {
        this.notify.createNotification('error', '', u.message);
      }
    });
  }

// clear form
  clearForm() {
    this.form.reset();
    this.editState = false;
    this.id = null;
    this.qualifications = [];
    this.qualifications = [...this.qualifications];
    this.getID();
  }
}

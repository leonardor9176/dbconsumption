import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config/config.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  public fields: any
  public columns: any[] = []
  public eeProps: any[] = []

  constructor(
    public config: ConfigService,

  ) {
    this.fields = config.config.formComponent.form
    this.columns = Object.keys(this.fields.text)
    this.eeProps = Object.keys(this.fields.field)
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config/config.service';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  public form: FormGroup
  public name: AbstractControl
  public document: AbstractControl
  public dob: AbstractControl
  public gender: AbstractControl
  public phone: AbstractControl
  public email: AbstractControl
  public salary: AbstractControl
  public searchForm: FormGroup
  public search: AbstractControl
  public sub = false
  public employees: any[] = []
  public newEmployee = {}
  public selectedId = ''
  public searchedDoc = ''
  public searchedEe: any
  private defaultGender = 'm'
  public fields: any
  public columns: any[] = []
  public eeProps: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    public config: ConfigService,
    private employeeService: EmployeeService
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        document: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['m', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        salary: ['', Validators.required],
      })

    this.searchForm = this.formBuilder.group(
      {
        search: ['', Validators.required],
      })

    this.name = this.form.controls['name']
    this.document = this.form.controls['document']
    this.dob = this.form.controls['dob']
    this.gender = this.form.controls['gender']
    this.phone = this.form.controls['phone']
    this.email = this.form.controls['email']
    this.salary = this.form.controls['salary']
    this.search = this.searchForm.controls['search']
    this.fields = config.config.formComponent.form
    this.columns = Object.keys(this.fields.text)
    this.eeProps = Object.keys(this.fields.field)
    


    this.list()
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }

  validate() {
    this.sub = true
    if (this.form.invalid) {
      return
    }
    else {
      console.log('Formulario validado')
      this.addEmployee()
    }
  }

  addEmployee() {
    if (this.selectedId) {
      // console.log('to commit')
      this.commitId()
    }
    else {
      this.newEmployee = {
        name: this.form.controls['name'].value,
        document: this.form.controls['document'].value,
        dob: this.form.controls['dob'].value,
        gender: this.form.controls['gender'].value,
        phone: this.form.controls['phone'].value,
        email: this.form.controls['email'].value,
        salary: this.form.controls['salary'].value,
      }
      this.employeeService.create(this.newEmployee).subscribe({
        next: (res: any) => {
          if (res.status) {
            console.log('Empleado registrado')
          }
          else {
            window.alert(res.msg);
            // console.log(res)
          }
        },
        complete: () => { this.list() }, // completeHandler
        error: () => {
          console.log('Error creating user')
        }    // errorHandler 
      })
      this.employees.push(this.newEmployee)
      // console.log(this.employees)
    }

    this.reset()
    this.sub = false
  }

  reset() {
    this.form.reset()
    this.form.get('gender')?.setValue(this.defaultGender)
  }

  list() {
    this.employeeService.list().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.employees = res.data
        }
      },
      complete: () => { console.log('Empleados listados') }, // completeHandler
      error: () => { console.log('Error listando los empleados') }    // errorHandler 
    })
  }

  edit(ee: any) {
    this.searchForm.reset()
    this.searchedEe = undefined
    for (let i in this.fields.field) {
      if (this.fields.field[i] == 'dob') {
        this.form.get(this.fields.field[i])?.setValue(ee[this.fields.field[i]].toString().split('T')[0])
      }
      else {
        this.form.get(this.fields.field[i])?.setValue(ee[this.fields.field[i]])
      }
    }
    this.selectedId = ee._id
    // console.log(this.selectedId)
  }

  commitId() {
    // console.log(this.selectedId)
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i]._id == this.selectedId) {
        // console.log(this.employees[i])
        // this.employees[i].user = this.form.controls['user'].value

        this.employeeService.update(
          {
            id: this.selectedId,
            employee: {
              name: this.form.controls['name'].value,
              document: this.form.controls['document'].value,
              dob: this.form.controls['dob'].value,
              gender: this.form.controls['gender'].value,
              phone: this.form.controls['phone'].value,
              email: this.form.controls['email'].value,
              salary: this.form.controls['salary'].value,
            }
          }).subscribe({
            next: (res: any) => {
              if (res.status) {
                // this.employees[i].user = this.form.controls['user'].value
                console.log('Usuario Actualizado')
              }
              else {
                window.alert(res.msg);
                // console.log(res)
              }
            },
            complete: () => { this.list() }, // completeHandler
            error: () => { console.log('Error creating user') }    // errorHandler 
          })
      }
    }
    this.selectedId = ''
  }

  delete(ee: any) {
    // this.form.get('user')?.setValue(ee.user)
    // this.selectedId = ee._id
    // console.log(ee._id)
    this.employeeService.delete(ee._id).subscribe({
      next: (res: any) => {
        if (res.status) {
          // this.employees[i].user = this.form.controls['user'].value
          console.log('Empleado eliminado')
        }
        else {
          window.alert(res.msg);
          // console.log(res)
        }
      },
      complete: () => { this.list() }, // completeHandler
      error: () => { console.log('Error eliminando el empleado') }    // errorHandler 
    })
    // this.list()
  }
  find(){
    this.searchedDoc= this.searchForm.controls['search'].value
    this.employeeService.searchGet(this.searchedDoc).subscribe({
      next: (res: any) => {
        if (res.status) {
          // this.employees[i].user = this.form.controls['user'].value
          this.searchedEe = res.data;
          console.log(this.searchedEe)
        }
        else {
          window.alert(res.msg);
          // console.log(res)
        }
      },
      complete: () => { this.list() }, // completeHandler
      error: () => { console.log('Error eliminando el empleado') }    // errorHandler 
    })
  }
}

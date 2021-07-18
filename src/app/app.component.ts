import { Component } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'Ictprojet';

  

  constructor(private fb:FormBuilder){}
  
    registerForm=this.fb.group({

      Facultyid:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phonenumber:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9,%+]+@[a-z0-9.-]+ \.[a-z]{2,4}$')]],
      password:['',Validators.required],
      reenterpassword:['',Validators.required]
    })
  
  



  }
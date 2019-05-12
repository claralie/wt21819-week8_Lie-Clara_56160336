import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
function NumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
      const valid = /^d+$/.test(control.value)
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } }
}
export interface Faculty {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    facultys: Faculty[] = [
      {value: 'binus-0', viewValue: 'Binus'},
      {value: 'KKG-1', viewValue: 'KKG'}
    ];
  //untuk template driven
  formModel = {
    nama: "",
    email: "",
    nim: 0
  };

  //untuk reactive form
  myReactiveForm: FormGroup;

  form;

  ngOnInit() {
    console.log("initialize");

    this.myReactiveForm = new FormGroup({
      nama: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      nim: new FormControl('', [Validators.required, NumberValidator]),
      check: new FormControl(null, [Validators.requiredTrue])
    });

    this.myReactiveForm.valueChanges.subscribe(form => {
      this.form = form;
    });
  }

  get nama() {
    return this.myReactiveForm.get("nama");
  }

  get email() {
    return this.myReactiveForm.get("email");
  }

  get nim() {
    return this.myReactiveForm.get("nim");
  }

  get check() {
    return this.myReactiveForm.get("check");
  }
}

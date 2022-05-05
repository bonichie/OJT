import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'firebase/auth';
import { concatMap, switchMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';
@UntilDestroy()
@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css']
})
export class PersonalInfoFormComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$

  ProfileFrom = new FormGroup({
    uid: new FormControl('', ),
    employeeId: new FormControl('',),
    email: new FormControl('', ),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl('',),
    nameExtension: new FormControl(''),
    dateOfBirth: new FormControl(''),
    age: new FormControl('', Validators.required),
    placeOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('',),
    civilStatus: new FormControl('', ),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    bloodType: new FormControl('', ),
    gsis: new FormControl('', ),
    pagibig: new FormControl('', ),
    philhealth: new FormControl('', ),
    sss: new FormControl('', ),
    tin: new FormControl('', ),
    citezenship: new FormControl('', Validators.required),
    houseBlockResident: new FormControl(''),
    streetResident: new FormControl(''),
    subdivisionResident: new FormControl(''),
    barangayResident: new FormControl('', Validators.required),
    municipalityResident: new FormControl('', Validators.required),
    provinceResident: new FormControl('', Validators.required),
    zipCodeResident: new FormControl('', Validators.required),
    houseBlockPermanent: new FormControl(''),
    streetPermanent: new FormControl(''),
    subdivisionPermanent: new FormControl(''),
    barangayPermanent: new FormControl('', Validators.required),
    municipalityPermanent: new FormControl('', Validators.required),
    provincePermanent: new FormControl('', Validators.required),
    zipCodePermanent: new FormControl('', Validators.required),
    telephoneNo: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    alternateEmail: new FormControl('', Validators.required),
    
  })

  constructor(private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private router: Router,) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.ProfileFrom.patchValue({ ...user })
    })
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        success: 'Image Uploaded',
        loading: 'Uploading...',
        error: 'There was an error in uploading',

      }), concatMap((photoURL) => this.usersService.updateUser({ uid: user.uid, photoURL }))
    ).subscribe()
  }

  saveProfile() {

    if (!this.ProfileFrom.valid) return
    

    const {employeeId, dateOfBirth,  firstname, lastname, email, password } = this.ProfileFrom.value
   
  

   // alert(dateOfBirth.toString())

    const profileData = this.ProfileFrom.value
    
    this.usersService.updateUser(profileData).pipe(

      // switchMap(({ user: { uid } }) => this.usersService.updateUser(
      //   { uid,  dateOfBirth: bday  })
      // ),
      

      this.toast.observe({
        success: 'Data has been updated.',
        loading: 'Updating data... ',
        error: 'There was an error in updating the data.'
      })
    ).subscribe()
      
    
      this.router.navigate(['/work-experience-form'])
    
   }

}
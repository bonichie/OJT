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
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.css']
})
export class WorkExperienceFormComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$

  ProfileFrom = new FormGroup({
    uid: new FormControl('', ),

    nameOfSchoolElem: new FormControl('', ),
    basicEducElem: new FormControl('', ),
    fromElem: new FormControl('', ),
    toElem: new FormControl('', ),
    highestLevelElem: new FormControl('', ),
    yearGraduatedElem: new FormControl('', ),
    scholarElem: new FormControl('', ),

    nameOfSchoolSecondary: new FormControl('', ),
    basicEducSecondary: new FormControl('', ),
    fromSecondary: new FormControl('', ),
    toSecondary: new FormControl('', ),
    highestLevelSecondary: new FormControl('', ),
    yearGraduatedSecondary: new FormControl('', ),
    scholarSecondary: new FormControl('', ),

    nameOfSchoolCollege: new FormControl('', ),
    basicEducCollege: new FormControl('', ),
    fromCollege: new FormControl('', ),
    toCollege: new FormControl('', ),
    highestLevelCollege: new FormControl('', ),
    yearGraduatedCollege: new FormControl('', ),
    scholarCollege: new FormControl('', ),

    nameOfSchoolVocational: new FormControl('', ),
    basicEducVocational: new FormControl('', ),
    fromVocational: new FormControl('', ),
    toVocational: new FormControl('', ),
    highestLevelVocational: new FormControl('', ),
    yearGraduatedVocational: new FormControl('', ),
    scholarVocational: new FormControl('', ),

    nameOfSchoolStudies: new FormControl('', ),
    basicEducStudies: new FormControl('', ),
    fromStudies: new FormControl('', ),
    toStudies: new FormControl('', ),
    highestLevelStudies: new FormControl('', ),
    yearGraduatedStudies: new FormControl('', ),
    scholarStudies: new FormControl('', ),

    
    
  })

  constructor(authService: AuthenticationService,
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
    

    const {employeeId,  firstname, lastname, email, password } = this.ProfileFrom.value

    const profileData = this.ProfileFrom.value
    this.usersService.updateUser(profileData).pipe(

     

      this.toast.observe({
        success: 'Data saved.',
        loading: 'Updating data... ',
        error: 'There was an error in updating the data.'
      })
    ).subscribe()
      
    
      this.router.navigate(['/work-experience-form'])
    
   }

}
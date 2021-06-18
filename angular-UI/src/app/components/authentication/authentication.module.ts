/**
 * Authentication module
 */

import {NgModule} from '@angular/core';
import { AuthenticationService } from '../../components/authentication/authentication.service';
import { HomeService } from '../dashboard/home/home.service'
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../../components/authentication/authentication.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  providers: [AuthenticationService, HomeService],
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    
  ],
  declarations : []

})
export class AuthenticationModule {}

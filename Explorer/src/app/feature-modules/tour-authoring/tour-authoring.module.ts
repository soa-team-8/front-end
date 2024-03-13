import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckpointFormComponent } from './checkpoint-form/checkpoint-form.component';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TourFormComponent } from './tour-form/tour-form.component';
import { TourComponent } from './tour/tour.component';
import { TourDetailsComponent } from './tour-details/tour-details.component';
import { MapObjectComponent } from './map-object/map-object.component';
import { MapObjectFormComponent } from './map-object-form/map-object-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { TourEquipmentComponent } from './tour-equipment/tour-equipment.component';
import { TourTransportFormComponent } from './tour-transport-form/tour-transport-form.component';
import { CheckpointSecretFormComponent } from './checkpoint-secret-form/checkpoint-secret-form.component';
import { PlanYourTripComponent } from './plan-your-trip/plan-your-trip.component';
import { PrivateToursComponent } from './private-tours/private-tours.component';
import { TourBundlesComponent } from './tour-bundles/tour-bundles.component';
import { TourBundleEditComponent } from './tour-bundle-edit/tour-bundle-edit.component';
import { TourStatisticsComponent } from './tour-statistics/tour-statistics.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CheckpointStatisticsComponent } from './checkpoint-statistics/checkpoint-statistics.component';

@NgModule({
  declarations: [
    CheckpointComponent,
    CheckpointFormComponent,
    TourFormComponent,
    TourComponent,
    TourDetailsComponent,
    MapObjectComponent,
    MapObjectFormComponent,
    TourEquipmentComponent,
    TourTransportFormComponent,
    CheckpointSecretFormComponent,
    PlanYourTripComponent,
    PrivateToursComponent,
    TourBundlesComponent,
    TourBundleEditComponent,
    TourStatisticsComponent,
    CheckpointStatisticsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    CanvasJSAngularChartsModule
  ],
  exports: [
    CheckpointComponent,
    CheckpointFormComponent,
    RouterModule,
    TourFormComponent
  ]
})
export class TourAuthoringModule { }

import { Component, OnInit, inject } from '@angular/core';
import { DiagnosisSection } from '../../components/diagnosis-section/diagnosis-section';
import { PrescriptionSection } from '../../components/prescription-section/prescription-section';
import { VitalsSection } from '../../components/vitals-section/vitals-section';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-visits',
  standalone: true,
  imports: [VitalsSection, DiagnosisSection, PrescriptionSection, MatButtonModule,MatStepperModule],
  templateUrl: './visits.html',
  styleUrl: './visits.css'
})
export class Visits {


}
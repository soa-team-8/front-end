import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourAuthoringService } from '../tour-authoring.service';
import { Tour } from '../model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnInit, OnChanges {

  @Output() tourUpdated = new EventEmitter<null>();
  @Input() tour: Tour;
  @Input() shouldEdit = false;

  user: User;
  tags: string[] = [];
  id: number;

  tagForm: FormGroup;
  tourForm: FormGroup;

  constructor(
    private service: TourAuthoringService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tagForm = new FormGroup({
      tag: new FormControl('', { nonNullable: true })
    });

    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      demandignessLevel: new FormControl('Easy'),
      price: new FormControl(0)
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.shouldEdit) {
        this.tags = this.tour.tags;
      } else {
        this.tags = [];
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != 0) {
        this.shouldEdit = true;
        this.getTour(this.id);
        console.log(this.shouldEdit);
      }
    });
  }

  ngOnChanges(): void {
    this.tourForm.reset();
    if (this.shouldEdit) {
      this.tourForm.patchValue(this.tour);
      this.tags = this.tour.tags;
    } else {
      this.tags = [];
    }
  }

  addTour(): void {
    const tour: Tour = {
      name: this.tourForm.value.name || '',
      description: this.tourForm.value.description || '',
      demandignessLevel: this.tourForm.value.demandignessLevel || '',
      price: Number(this.tourForm.value.price) || 0,
      authorId: this.user.id,
      tags: this.tags,
      status: 'Draft',
      equipment: [],
      checkpoints: [],
      tourTimes: [],
      tourRatings: []
    };

    this.service.addTour(tour).subscribe((response: Tour) => {
      this.id = response.id || 0;
      this.tourUpdated.emit();
      this.showEquipment();
    });
  }

  addTag(): void {
    const tagValue = this.tagForm.getRawValue().tag.trim();
    if (tagValue) {
      if (!this.isExistingTag(tagValue)) {
        this.tags.push(tagValue);
        this.tagForm.reset();
      }
    }
  }

  isExistingTag(tag: string): boolean {
    return this.tags.some(element => element.toLowerCase() === tag.toLowerCase());
  }

  updateTour(): void {
    const tour: Tour = {
      name: this.tourForm.value.name || '',
      description: this.tourForm.value.description || '',
      demandignessLevel: this.tourForm.value.demandignessLevel || '',
      price: Number(this.tourForm.value.price) || 0,
      authorId: this.user.id,
      tags: this.tour.tags,
      status: this.tour.status,
      equipment: this.tour.equipment,
      checkpoints: this.tour.checkpoints,
      tourTimes: this.tour.tourTimes,
      tourRatings: this.tour.tourRatings
    };

    tour.id = this.tour.id;
    tour.checkpoints = this.tour.checkpoints;

    this.service.updateTour(tour).subscribe(() => {
      this.tourUpdated.emit();
      this.showEquipment();
    });
  }

  removeTag(tag: string): void {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  showEquipment(): void {
    this.router.navigate([`tour-equipment/${this.id}`]);
  }

  getTour(id: number): void {
    this.service.get(id).subscribe((result: Tour) => {
      this.tour = result;
      this.tourForm.patchValue(this.tour);
      this.tags = this.tour.tags;
    });
  }

  showTours(): void {
    this.router.navigate([`tour`]);
  }
}

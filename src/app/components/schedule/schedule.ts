import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Schedule, ScheduleService, CreateScheduleRequest } from '../../services/schedule';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  imports: [FormsModule, DatePipe],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class ScheduleComponent implements OnInit {

  schedules: Schedule[] = [];
  error = '';
  success = '';

  newSchedule: CreateScheduleRequest = {
    employeeName: '',
    date: '',
    startTime: '09:00:00',
    endTime: '17:00:00',
    note: ''
  };

  constructor(
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules(): void {
    this.scheduleService.getAll().subscribe({
      next: (data) => {
        this.schedules = [...data];
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Erreur lors du chargement'
    });
  }

  createSchedule(): void {
    this.error = '';
    this.success = '';
    this.scheduleService.create(this.newSchedule).subscribe({
      next: () => {
        this.success = 'Planning ajouté !';
        this.newSchedule = { employeeName: '', date: '', startTime: '09:00:00', endTime: '17:00:00', note: '' };
        this.loadSchedules();
      },
      error: () => this.error = 'Erreur lors de l\'ajout'
    });
  }

  deleteSchedule(id: number): void {
    if (confirm('Supprimer ce planning ?')) {
      this.scheduleService.delete(id).subscribe({
        next: () => this.loadSchedules(),
        error: () => this.error = 'Erreur lors de la suppression'
      });
    }
  }
}
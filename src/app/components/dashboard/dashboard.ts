import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardData, DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  data: DashboardData | null = null;
  error = '';
  selectedPeriod = 'all';

  periods = [
    { label: "Aujourd'hui", value: 'today' },
    { label: 'Cette semaine', value: 'week' },
    { label: 'Ce mois', value: 'month' },
    { label: 'Total', value: 'all' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.error = '';
    this.dashboardService.getDashboard(this.selectedPeriod).subscribe({
      next: (data) => {
        this.data = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Accès refusé ou erreur serveur'
    });
  }

  selectPeriod(period: string): void {
    this.selectedPeriod = period;
    this.loadDashboard();
  }
}
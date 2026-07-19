import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardData, DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  data: DashboardData | null = null;
  error = '';

  constructor(
    private dashboardService: DashboardService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.data = data;
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Accès refusé ou erreur serveur'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  async logout() {
    let url:string = "http://localhost:3000/logout"
    window.open(url,'_self');

    await this.keycloakService.logout();
    this.keycloakService.clearToken();
    
  }


}

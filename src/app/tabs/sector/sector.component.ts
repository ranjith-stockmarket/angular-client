import { Component, OnInit } from '@angular/core';
import {SectorService} from "../../service/sector/sector.service";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface Sector {
  id: number
  name: string
  brief: string
}

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {

  sectorForm = this.formBuilder.group({
    name: '',
    brief: ''
  });

  sectorList: Sector[] = [];
  displayedColumns: string[] = ['id','name','brief'];

  constructor(private sectorService:SectorService,
              private formBuilder:FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sectorService.getAll().subscribe( data => this.sectorList=<Sector[]>data);
  }


  onSubmit(): void {
    this.sectorService.addSector(this.sectorForm.value)
      .subscribe(response => {
        let res:any = response;
        if(res.hasOwnProperty("id")){
          this.sectorList.push(res)
          this.snackBar.open("Added Successfully","Close",{
            duration: 2000,
          });
        }
        else{
          this.snackBar.open("Error Occurred","Close",{
            duration: 2000,
          });
        }
      });
    this.sectorForm.reset();
  }

}

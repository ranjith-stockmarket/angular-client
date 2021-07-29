import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompanyService} from "../../service/company/company.service";
import {SectorService} from "../../service/sector/sector.service";
import {Sector} from "../sector/sector.component";

export interface Company {
  id: number
  name: string
  ceo: string
  boardOfDirectors: string
  sector: string
  brief: string
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companyForm = this.formBuilder.group({
    name: '',
    ceo: '',
    boardOfDirectors: '',
    sectorId: null,
    brief: ''
  });

  sectorList: Sector[] = [];
  companyList: Company[] = [];
  displayedColumns: string[] = ['id','name','ceo','boardOfDirectors','sector','brief'];

  constructor(private companyService:CompanyService,
              private sectorService:SectorService,
              private formBuilder:FormBuilder,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe( data => this.companyList=<Company[]>data);
    this.sectorService.getAll().subscribe( data => this.sectorList=<Sector[]>data);
  }

  onSubmit(): void {
    this.companyService.addCompany(this.companyForm.value)
      .subscribe(response => {
        let res:any = response;
        if(res.hasOwnProperty("id")){
          this.companyList.push(res)
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
    this.companyForm.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import {ApiCallsService} from "../../shared/services/apiCalls.service";
import moment = require("moment");

/**
*	This class represents the lazy loaded HomeComponent.
*/

interface ApiCalls {
  hour:number,
  count:number
}
interface ApiUsers {
  user:string,
  count:number
}

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private apiCallsService:ApiCallsService){}
  numUsers:number=0;
  petAPI:number=0;
  apiUsers:ApiUsers[];

  ngOnInit() {
    this.apiCallsService.getApiCalls().subscribe(
      data => {
        this.petAPI = data['count'];
        this.createGraph(data['hours']);
      }
    );
    this.apiCallsService.getUsersCalls().subscribe(
      (data:ApiUsers[]) => {
        this.apiUsers = data;
        this.numUsers = data.length;
        this.createGraphUsers();
      }
    );
  }

  createGraph(data:ApiCalls[]){
    //noinspection TypeScriptValidateTypes
    var offset = moment.parseZone().utcOffset()/60;
    var series:any[] = [];
    for(let i = 0; i< data.length;i++){
      series.push([data[i]['hour'] + offset, data[i]['count']]);
    }
    var graphCalls:any = $('#graphCalls');
    graphCalls.highcharts({
      chart:{
        type:'spline'
      },
      title: {
        text: 'Llamadas a la API'
      },
      tooltip:{
        formatter: function (){
          //noinspection TypeScriptUnresolvedVariable
          return '<br>'+this.x+'h: '+ this.y + ' petitions';
        }
      },
      xAxis: {
        title: {
          text:'Hora'
        },
        min:7,
        max: 21
      },
      yAxis:{
        title: {
          text: 'Llamadas'
        },
        min: 0
      },
      series:[
        {
          data:series
        }
      ]
    })
  }

  createGraphUsers(){
    var graphUsers:any = $('#graphUsers');
    graphUsers.highcharts({
      chart:{
        type:'column'
      },
      xAxis:{

        categories: this.apiUsers.map((v)=> { return v['user'] })
      },
      yAxis:{
        min:0,
          title:{
          text:'# Count'
        }
      },
      tooltip:{
        formatter: function (){
          //noinspection TypeScriptUnresolvedVariable
          return '<br>'+this.key+'<br>Count: '+ this.y
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series:[{
        data: this.apiUsers.map((v)=> { return v['count']})
      }]
    })
  }

}

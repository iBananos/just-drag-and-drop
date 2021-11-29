import React from 'react';
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart as ChartJS } from 'chart.js';
import parse from "csv-parse/lib/es5";
import * as utils from "../Utils";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

ChartJS.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
  

const AnalyseView = () => {

    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        const FileFromURL : any = params.get('url'); 
        console.log(FileFromURL)
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/analyze/downloadAnalyze', JSON.stringify({"path":FileFromURL}), callbackDownload);
    }

    function callbackDownload(response:any){
        var file = JSON.parse(response).file;
        var list1 : any = [];
            var list2 : any = [];
        parse(file, {},(err, data) => {
            // when all countries are available,then process the first one
            // note: array element at index 0 contains the row of headers that we should skip
            
            data.forEach((el :any) =>{
                list1.push(el[0].replace(/\s\s+/g, ' ').split(" ")[1]);
                list2.push(el[0].replace(/\s\s+/g, ' ').split(" ")[2]);
            });
            console.log("end");
                
        })
        createChart("scatter",list2,"label",list1,"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)")
    }

    function createChart(type:any,labels:any,label:any,data:any,backgroundColor:any,borderColor:any){
        var canvas : HTMLCanvasElement = document.createElement("canvas");
        canvas.id='mychart';
        canvas.className='myChart';
        canvas.style.width = "400"
        canvas.style.height= "400"
        var chart :HTMLElement = (document.getElementById('myChart') as HTMLElement)
        chart.appendChild(canvas);
        
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new ChartJS(ctx , {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
            
        });
        myChart.update();
    }

    return (
        <div id="AnalyseView" className="AnalyseView">
            <div className="view" id="view">
            <div className="Chart">
            
                <canvas className="myChart" id="myChart" width="400" height="400"></canvas>
            </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    );
};

export default AnalyseView;
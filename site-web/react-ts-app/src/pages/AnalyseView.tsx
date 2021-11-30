import React from 'react';
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart as ChartJS } from 'chart.js';
import parse from "csv-parse";
import * as utils from "../Utils";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

ChartJS.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
  

const AnalyseView = () => {
    var TypeRequest : any;
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        const FileFromURL : any = params.get('url'); 
        TypeRequest = params.get('type'); 
        console.log(FileFromURL +" "+ TypeRequest)
        utils.default.sendRequestWithToken('POST', 'http://localhost:4000/api/analyze/downloadAnalyze', JSON.stringify({"type":TypeRequest,"path":FileFromURL}), callbackDownload);
    } 

    function callbackDownload(response:any){
        var file = JSON.parse(response).file;
        var dataLine : any = [];
        var dataCloud : any = [];
        
        if(TypeRequest === "prediction"){
            parse.parse(file, {},async (err, data) => {
                data.forEach((el :any) =>{
                    dataLine.push(parseFloat(el[0].replace(/\s\s+/g, ' ').split(" ")[1]));
                    dataCloud.push(parseFloat(el[0].replace(/\s\s+/g, ' ').split(" ")[2]));
                });
                dataCloud = dataCloud.slice(1)
                dataLine = dataLine.slice(1)
                var min = dataLine[0];
                var max = dataLine[Object.keys(dataLine).length-1];
                console.log(dataCloud, dataLine)
                createChart(dataCloud,dataLine,"label",[min,max],"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)");
            })
        }else{
            var dataColoration : any = [];
            parse.parse(file, {},async (err, data) => {
                data.forEach((el :any) =>{
                    dataLine.push(parseFloat(el[0].replace(/\s\s+/g, ' ').split(" ")[1]));
                    dataCloud.push(parseFloat(el[0].replace(/\s\s+/g, ' ').split(" ")[2]));
                    dataColoration.push(parseFloat(el[0].replace(/\s\s+/g, ' ').split(" ")[3]));
                });
                dataCloud = dataCloud.slice(1)
                dataLine = dataLine.slice(1)
                dataColoration = dataLine.slice(1)
                var min = dataLine[0];
                var max = dataLine[Object.keys(dataLine).length-1];
                console.log(dataCloud, dataLine)
                createChart2(dataCloud,dataLine,dataColoration,"label","rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)");
            })
            

        }
        
        
    }

    function createChart(dataCloud:any,abscisseData:any,label:any,lineData:any,backgroundColor:any,borderColor:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new ChartJS(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "Prediction",
                    data: dataCloud,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                },{
                    label: "Referrence Line",
                    type: "line",
                    data: abscisseData,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                }],
                labels: abscisseData,
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
        return myChart;
    }


    function createChart2(dataCloud:any,abscisseData:any,dataColoration:any,label:any,backgroundColor:any,borderColor:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new ChartJS(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "DataVisualisation",
                    data: dataCloud,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }],
                labels: abscisseData,
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
        return myChart;
    }
    function refreshChart(chart:ChartJS){
        chart.update();
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
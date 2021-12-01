import React from 'react';
import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
  

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
            file = file.split('\n')
            
            console.log(file)
            file.forEach((el :any) =>{
                    el = el.split(",")
                    dataLine.push(parseFloat(el[0]));
                    dataCloud.push(parseFloat(el[1]));
                });
                console.log(dataCloud,dataLine)
                dataCloud = dataCloud.slice(1)
                dataLine = dataLine.slice(1)
                var min = dataLine[0];
                var max = dataLine[Object.keys(dataLine).length-1];
                createChart(dataCloud,dataLine,"label",[min,max],"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)");
                
        }else{
            
            var dataColoration : any = [];
            file = file.split('\n')
            
            file.forEach((el :any) =>{
                el = el.split(",")
                dataLine.push(parseFloat(el[0]));
                dataCloud.push(parseFloat(el[1]));
                if(el[2]!==undefined){
                    dataColoration.push(el[2].replace(/\r/g,""));
                }
            });
            
                
                dataCloud = dataCloud.slice(1)
                dataLine = dataLine.slice(1)
                dataColoration = dataColoration.slice(1)
                var datas = decomposeDataByThirdColumn(dataLine,dataCloud,dataColoration)
                var datasets = createsDatasets(datas,getThirdColumn(dataColoration))
                dataColoration = getColoration(dataColoration);
                //createChart2bis(dataLine,datasets); 
                var backgroundColor = createColors(dataColoration,0.1);
                var borderColor = createColors(dataColoration,1)
                createChart2(dataCloud,dataLine,backgroundColor,borderColor);
        }
        
        
    }

    function createsDatasets(datas:any,thirdColumn:any){
        var datasets :any = [];
        var backgroundColor = ["rgba(206, 22, 22, 0.1)",
        "rgba(206, 143, 22, 0.1)",
        "rgba(22, 206, 54, 0.1)",
        "rgba(22, 206, 193, 0.1)",
        "rgba(22, 67, 206, 0.1)",
        "rgba(166, 22, 206, 0.1)",
        "rgba(197, 206, 22, 0.1)"]

        var borderColor = ["rgba(206, 22, 22, 1)",
        "rgba(206, 143, 22, 1)",
        "rgba(22, 206, 54, 1)",
        "rgba(22, 206, 193, 1)",
        "rgba(22, 67, 206, 1)",
        "rgba(166, 22, 206, 1)",
        "rgba(197, 206, 22, 1)"]
        for(var i : number = 0 ; i < thirdColumn.length;i++){
            datasets.push({
                type: 'scatter',
                label: thirdColumn[i],
                data: datas[i][1],
                backgroundColor: backgroundColor[i],
                borderColor: borderColor[i],
                borderWidth: 1,
                labels : datas[i][2],
                xAxesID: thirdColumn[i]
            })
        }
        return datasets;
    }

    function getThirdColumn(data:any){
        var newArray : string[] = [];
        data.forEach((el :any) =>{
            if(!newArray.includes(el)){
                newArray.push(el); 
            }
        })
        return newArray
    }

    function decomposeDataByThirdColumn(data1:any,data2:any,data3:any){
        var newArray : string[] = [];
        var datas : any[6][] = [];
        data3.forEach((el :any) =>{
            if(!newArray.includes(el)){
                newArray.push(el); 
                var arrayVoid : any[] = [];
                datas.push(arrayVoid)
            }
        })
        for(var i : number = 0 ; i < data3.length;i++){
            var insert = [data1[i],data2[i],data3[i]];
            datas[newArray.indexOf(data3[i])].push(insert)
        }
        return  datas;
    }

    function createColors(array: any[],opacity:number){
        var newArray : string[] = [];
        array.forEach((el :any) =>{
            var color = el;
            newArray.push("rgba("+color.r+","+color.g+','+color.b+","+opacity+")"); 
            
        })
        return(newArray)
    }

    function getColoration(array: string[]){
        var newArray : string[] = [];
        var coloration : any[] = [];

        var colors = [
        {"r": 206,"g": 22,"b": 22},
        {"r": 206,"g": 143,"b": 22}, 
        {"r": 22,"g": 206,"b": 54},
        {"r": 22,"g": 206,"b": 193},
        {"r": 22,"g": 67,"b": 206},
        {"r": 166,"g": 22,"b": 206},
        {"r": 197,"g": 206,"b": 22}]
        array.forEach((el :any) =>{
            if(!newArray.includes(el)){
                newArray.push(el); 
            }
            coloration.push(colors[newArray.indexOf(el)])
        })
        return coloration
    }

    function createChart(dataCloud:any,abscisseData:any,label:any,lineData:any,backgroundColor:any,borderColor:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
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


    function createChart2(dataCloud:any,abscisseData:any,backgroundColor:any,borderColor:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "Datavisu",
                    data: dataCloud,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }],labels:abscisseData
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                   
                },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    function createChart2bis(abscisseData:any,datasets:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
            type : 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                   
                },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }
    function refreshChart(chart:Chart){
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
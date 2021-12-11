import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { color } from 'chart.js/helpers';

import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip ,MatrixController, MatrixElement);


const AnalyseView = () => {
    var TypeRequest : any;
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        const FileFromURL : any = params.get('url'); 
        TypeRequest = params.get('type'); 
        document.title =FileFromURL;
        utils.default.sendRequestWithToken('POST', '/api/analyze/downloadAnalyze', JSON.stringify({"type":TypeRequest,"path":FileFromURL}), callbackDownload);
    } 

    function callbackDownload(response:any){
        const search = window.location.search;
        const params = new URLSearchParams(search); 
        TypeRequest = params.get('type'); 
        var file = JSON.parse(response).file;
        
        file = file.split('\n')
        if(TypeRequest === "Regression"){
            var data1 : any = [];
            var data2 : any = [];
        
            file.forEach((el :any) =>{
                el = el.split(",")
                data1.push(parseFloat(el[0]));
                data2.push(parseFloat(el[1]));
            });
            data2 = data2.slice(1)
            data1 = data1.slice(1)
            var min = data1[0];
            var max = data1[Object.keys(data1).length-1];
            createChart(data2,data1,"label",[min,max],"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)");
        }else{
            var labels = file[0].split(",");
            var acc = 0 ;
            labels.forEach((el :any) =>{
                acc++
            });
            var data : any = [];
            var maximum :number = 0 ;
            for(var i : number = 1 ; i < acc+1 ; i++){
                var line = file[i].split(",")
                for(var j : number = 0 ; j < acc ; j++){
                  if(parseInt(line[j])>maximum) {
                    maximum = parseInt(line[j]);
                  }
                  var dataline = {'x': labels[i-1], 'y': labels[j], 'v': parseInt(line[j])}
                  data.push(dataline)
                }
            }
            

            createConfusionMatrix(labels,data,"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)",acc,maximum);
            createRefBar(maximum)
        }
    }
    function createRefBar(maximum:any){
      var div = document.getElementById("Chart") as HTMLDivElement;
      var divRef = document.createElement("div");
      divRef.className = "BarRef"

      var p100 = document.createElement("p");
      p100.className = "p100"
      p100.innerHTML = "100%";
      divRef.appendChild(p100)

      var p75 = document.createElement("p");
      p75.className = "p75"
      p75.innerHTML = "75%";
      divRef.appendChild(p75)

      var p50 = document.createElement("p");
      p50.className = "p50"
      p50.innerHTML = "50%";
      divRef.appendChild(p50)

      var p25 = document.createElement("p");
      p25.className = "p25"
      p25.innerHTML = "25%";
      divRef.appendChild(p25)
      
      var p0 = document.createElement("p");
      p0.className = "p0"
      p0.innerHTML = "0%";
      divRef.appendChild(p0)

      div.appendChild(divRef)
    }
    function createConfusionMatrix(labels:any,datas:any,backgroundColor:any,borderColor:any,nbrow:number,maximum:number){

      var div = document.getElementById("Chart") as HTMLDivElement;
      var myChartMatrixDiv = document.createElement("div");
      myChartMatrixDiv.className = "myChartMatrixDiv"
      
      
      var myChartMatrix = document.createElement("canvas") as HTMLCanvasElement;
      myChartMatrix.id= "myChartMatrix";
      myChartMatrix.className= "myChartMatrix";
      myChartMatrixDiv.appendChild(myChartMatrix)
      div.appendChild(myChartMatrixDiv);
      var ctx : any = (document.getElementById('myChartMatrix') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
            type : 'matrix',
            data: {
                datasets: [{
                    type: 'matrix',
                    label: "Matrix Confusion",
                    data: datas,
                    backgroundColor(context) {
                        const value = datas[context.dataIndex].v;
                        var colors  = createRainbowRGB(value, maximum);
                        var colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                        return color(colorString).alpha(0.8).rgbString();
                      },
                      borderColor(context) {
                        const value = datas[context.dataIndex].v;
                        var colors  = createRainbowRGB(value, maximum);
                        var colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                        return color(colorString).alpha(1).rgbString();
                      },
                    borderWidth: 1,
                    width: ({chart}) => (chart.chartArea || {}).width / nbrow - 1,
                    height: ({chart}) =>(chart.chartArea || {}).height / nbrow - 1
                }],
            },
            options: {
                plugins: {
                    legend: false,
                    tooltip: {
                      callbacks: {
                        title() {
                          return '';
                        },
                        label(context: any) {
                          const v = context.dataset.data[context.dataIndex];
                          return ['x: ' + v.x, 'y: ' + v.y, 'v: ' + v.v];
                        }
                      }
                    }
                  } as any,
                scales: {
                    x: {
                      type: 'category',
                      labels: labels,
                      ticks: {
                        display: true
                      },
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      type: 'category',
                      labels: labels,
                      offset: true,
                      ticks: {
                        display: true
                      },
                      grid: {
                        display: false
                      }
                    }
                  },maintainAspectRatio: false,
                animation: {
                    /*onComplete: function() {
                      var a = document.createElement('a');
                        a.href = myChart.toBase64Image();
                        a.download = 'my_file_name.png';

                        // Trigger the download
                        //a.click();
                    }*/
                  }
            }})
        myChart.update();
        
        return myChart;

    }

    function createRainbowRGB(x:any,max:any){
      var percentFade  =  x/max*100;
      if(percentFade<50){
        var rouge = 196 ; 
        var bleu = 33+196*percentFade/100;
      }else{
        var rouge = 33-196*percentFade/100; 
        var bleu = 196 ;
      }
      return [rouge,33,bleu]
  }

    function createChart(data2:any,abscisseData:any,label:any,lineData:any,backgroundColor:any,borderColor:any){
      var myChartLine = document.createElement("canvas") as HTMLCanvasElement;
      myChartLine.id= "myChartLine";
      myChartLine.className= "myChartLine";
      var div = document.getElementById("Chart") as HTMLDivElement;
      div.appendChild(myChartLine);
      var ctx : any = (document.getElementById('myChartLine') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "Prediction",
                    data: data2,
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
                },
                animation: {
                    /*onComplete: function() {
                      var a = document.createElement('a');
                        a.href = myChart.toBase64Image();
                        a.download = 'my_file_name.png';

                        // Trigger the download
                        //a.click();
                    }*/
                  }
            }
            
        });
        myChart.update();
        
        return myChart;
    }

    return (
        <div id="AnalyseView" className="AnalyseView">
            <div className="view" id="view">
            <div className="Chart" id="Chart">
            
                
            </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    );
};

export default AnalyseView;
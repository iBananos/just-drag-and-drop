import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { color } from 'chart.js/helpers';

import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip ,MatrixController, MatrixElement);
var maximum :number = 0 ;

const AnalyseView = () => {
    var TypeRequest : any;
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        const FileFromURL : any = params.get('url'); 
        TypeRequest = params.get('type'); 
        console.log(FileFromURL +" "+ TypeRequest)
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
            console.log(labels);
            var data : any = [];
            
            for(var i : number = 1 ; i < acc+1 ; i++){
                var line = file[i].split(",")
                for(var j : number = 0 ; j < acc ; j++){
                  if(line[j]>maximum) maximum = line[j] ;
                    var dataline = {'x': labels[i-1], 'y': labels[j], 'v': line[j]}
                    console.log(dataline)
                    data.push(dataline)
                }
                console.log(i, j)
            }
            

            createConfusionMatrix(labels,data,"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)",acc)
        }
    }
    function createConfusionMatrix(labels:any,datas:any,backgroundColor:any,borderColor:any,nbrow:number){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        console.log(labels)
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
                        var colorString : string= "rgb("+colors[0]*255+","+colors[1]*255+","+colors[2]*255+")";
                        return color(colorString).alpha(0.5).rgbString();
                      },
                      borderColor(context) {
                        const value = datas[context.dataIndex].v;
                        var colors  = createRainbowRGB(value, maximum);
                        var colorString : string= "rgb("+colors[0]*255+","+colors[1]*255+","+colors[2]*255+")";
                        //console.log( "rgb("+colors[0]*255+","+colors[1]*255+","+colors[2]*255+");");
                        return color(colorString).alpha(1).rgbString();
                      },
                    borderWidth: 1,
                    width: ({chart}) => (chart.chartArea || {}).width / nbrow - 1,
                    height: ({chart}) =>(chart.chartArea || {}).height / nbrow - 1
                }],
            },
            options: {
                maintainAspectRatio: false,
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
                  },
                animation: {
                    onComplete: function() {
                      var a = document.createElement('a');
                        a.href = myChart.toBase64Image();
                        a.download = 'my_file_name.png';

                        // Trigger the download
                        //a.click();
                    }
                  }
            }})
        myChart.update();
        
        return myChart;

    }

    function createRainbowRGB(x:any,max:any){
      var ratio = max/255 
      x = x*ratio;
      let rouge;
      let vert;
      let bleu;
      //if(x<255){
          rouge = 1;
          vert = x/255;
          bleu = 0;
      /*}else if(x<510){
          rouge = (510-x) / 255;
          vert = 1;
          bleu = 0;
      }else if(x<765){
          rouge = 0;
          vert = 1;
          bleu = (x-510)/255;
      }else{
          rouge = 0;
          vert = (1020-x)/255;
          bleu = 1;
      }/*else if(x<1275){
          rouge =  (x-1020) / 255;
          vert = 0;
          bleu = 1;
      }else{
          rouge = 1;
          vert = 0;
          bleu = (1530-x)/255;
      }*/
      return [rouge , vert , bleu];
  }

    function createChart(data2:any,abscisseData:any,label:any,lineData:any,backgroundColor:any,borderColor:any){
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
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
                    onComplete: function() {
                      var a = document.createElement('a');
                        a.href = myChart.toBase64Image();
                        a.download = 'my_file_name.png';

                        // Trigger the download
                        //a.click();
                    }
                  }
            }
            
        });
        myChart.update();
        
        return myChart;
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
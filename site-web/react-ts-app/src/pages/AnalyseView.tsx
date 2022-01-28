import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { color } from 'chart.js/helpers';
import saveIcone from "../assets/save.png";
import downloadIcone from "../assets/download.png";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip ,MatrixController, MatrixElement);


const AnalyseView = () => {
    let TypeRequest : any;
    let demo :any ;
    let FileFromURL : any;
    let fromHistory :any;
    let automatic :any;
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        FileFromURL = params.get('url'); 
        TypeRequest = params.get('type'); 
        fromHistory = params.get('history'); 
        automatic = params.get('auto');
        document.title =FileFromURL;
        demo = params.get('demo'); 
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/analyze/downloadAnalyzeDemo', JSON.stringify({"type":TypeRequest,"path":FileFromURL}), callbackDownload); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/analyze/downloadAnalyze', JSON.stringify({"type":TypeRequest,"path":FileFromURL,"fromHistory":fromHistory}), callbackDownload);
        }
        
    } 

    function callbackDownload(response:any){
        const search = window.location.search;
        const params = new URLSearchParams(search); 
        let file = JSON.parse(response).file;
        let param = JSON.parse(response).param;
        TypeRequest = params.get('type'); 
        let newBoard = document.getElementById('containerGraph') as HTMLDivElement;
        let newIndication = document.createElement("div");
        newIndication.id = "indication";
        newIndication.className = "indication";
        newIndication.innerHTML = "baabbababa";
        
        newBoard.appendChild(newIndication)

        if(demo !== "true" && fromHistory !== "true"){
          let save = document.createElement("img");
          save.src = saveIcone;
          save.id = "save";
          save.alt = "";
          save.className = "saveDash";
          save.onclick  = (ev:any) => {
            let canvas1;
            if(TypeRequest === "Regression"){
              canvas1 = (document.getElementById("myChartLine") as HTMLCanvasElement)
            }else{
              canvas1 = (document.getElementById("myChartMatrix") as HTMLCanvasElement)
            }
              let canvas4 = (document.getElementById("myChartBar") as HTMLCanvasElement)
              let canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
              canvasFinal.width = 1000;
              canvasFinal.height= 500;
              let ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D;
              ctxFinal.drawImage(canvas1, 0, 0,500,500);
              ctxFinal.drawImage(canvas4, 500, 0,500,500);
                let image = canvasFinal.toDataURL("image/jpeg");
                let datasend = JSON.stringify({"image":image,"path":FileFromURL,"param":param,"file":JSON.parse(response).file});
                utils.default.sendRequestWithToken('POST', '/api/analyze/sendPreview', datasend, callbackSend);
          };
          newBoard.appendChild(save);
      }
        let download = document.createElement("img");
            download.src = downloadIcone;
            download.id = "download";
            download.alt = "";
            download.className = "downloadDash";
            download.onclick  = (ev:any) => {
              let canvas1;
              if(TypeRequest === "Regression"){
                canvas1 = (document.getElementById("myChartLine") as HTMLCanvasElement)
              }else{
                canvas1 = (document.getElementById("myChartMatrix") as HTMLCanvasElement)
              }
                let canvas4 = (document.getElementById("myChartBar") as HTMLCanvasElement)
                let canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
                canvasFinal.width = 1000;
                canvasFinal.height= 500;
                let ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D;
                ctxFinal.drawImage(canvas1, 0, 0,500,500);
                ctxFinal.drawImage(canvas4, 500, 0,500,500);
                let link = document.createElement('a');
                link.download = "RESULT.png";
                link.href = canvasFinal.toDataURL("image/png").replace("image/png", "image/octet-stream");
                link.click();
                utils.default.doAlert("success","Downloaded !");
            };

            newBoard.appendChild(download);
        
        
        
        file = file.split('\n')
        
        let score = file[0]
        let message =  "Score : <br>   <p STYLE='padding:0 0 0 20px;'> " + score +"</p> <br>"
        file = file.slice(1)
        if(automatic === "true"){
          let algo = file[0]
          let parametre_auto : any= file[1].replace("{",'').replace("}",'').replace(/'+/g,"").split(",")
          message +=  "Algorithm choosen by the server : <br>   <p STYLE='padding:0 0 0 20px;'> " + algo +"</p> <br> Optimal parameters choosen by the server : <br> <p STYLE='padding:0 0 0 20px;'>  "
          for (let key in parametre_auto) {
               message+=parametre_auto[key] +'<br>';
         }
          message+='</p>'
          file = file.slice(2)
        }
        let indication = document.getElementById('indication') as HTMLElement
          indication.innerHTML =message
        createChartBar(file[0].split(","),file[1].split(","))
        file = file.slice(3)
        if(TypeRequest === "Regression"){
            let data1 : any = [];
            let data2 : any = [];
        
            file.forEach((el :any) =>{
                el = el.split(",")
                data1.push(parseFloat(el[0]));
                data2.push(parseFloat(el[1]));
            });
            data2 = data2.slice(1)
            data1 = data1.slice(1)
            let min = data1[0];
            let max = data1[Object.keys(data1).length-1];
            createChart(data2,data1,"label",[min,max],"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)");
        }else{
            let labels = file[0].split(",");
            let acc = 0 ;
            labels.forEach((el :any) =>{
                acc++
            });
            let data : any = [];
            let totalPerColumn :number[] = [] ;
            for(let x : number = 0 ; x < acc ; x++){

              totalPerColumn.push(0)
            }

            for(let i : number = 1 ; i < acc+1 ; i++){
                let line = file[i].split(",")
                for(let j : number = 0 ; j < acc ; j++){
                  totalPerColumn[i-1] += parseFloat(line[j]);
                  let dataline = {'x': labels[i-1], 'y': labels[j], 'v': parseFloat(line[j])}
                  data.push(dataline)
                  
                }
            }
            console.log(totalPerColumn)
            

            createConfusionMatrix(labels,data,"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)",acc,totalPerColumn);
            createRefBar((document.getElementById("myChartBar") as HTMLCanvasElement).style.height)
        }
    }

    function callbackSend(){
      console.log("Analyse sauvegardée");
      utils.default.doAlert("success","Your analysis has been successfully saved ! It is available in History.");
    }

    function createChartBar(labels:any,data:any){
      let div = document.getElementById("ChartBar") as HTMLDivElement;
      
      
      let myChartBar = document.createElement("canvas") as HTMLCanvasElement;
      myChartBar.id= "myChartBar";
      myChartBar.className= "myChartBar";
      div.appendChild(myChartBar);
      let ctx : any = (document.getElementById('myChartBar') as HTMLCanvasElement).getContext('2d');
        
      let myChart = new Chart(ctx , {
        type : 'bar',
        data: {
            labels: labels,
            datasets: [{
                type: 'bar',
                data: data,
                borderWidth: 1,
                backgroundColor: "rgba(187, 164, 34,0.1)",
                borderColor: "rgba(187, 164, 34,1)",
                label:"Feature importance"
            }],
        },
        options: {
          aspectRatio : 1,
          responsive: true,
            animation: {
                /*onComplete: function() {
                  let a = document.createElement('a');
                    a.href = myChart.toBase64Image();
                    a.download = 'my_file_name.png';

                    // Trigger the download
                    //a.click();
                }*/
              }
        }as any})
    myChart.update();
    
    return myChart;

    }
    function createRefBar(height:any){
      let div = document.getElementById("Chart") as HTMLDivElement;
      let divbarre = document.createElement("div")
        divbarre.className = "divBarre"

      let p1 = document.createElement("p")
        p1.innerHTML = "0"
        p1.style.float = "left"
        divbarre.append(p1)
        let barreColor = document.createElement("div");
        barreColor.id = "barreColor";
        barreColor.className = "barreColor"
        divbarre.append(barreColor)
        let p2 = document.createElement("p")
        p2.innerHTML = "1"
        p2.style.float = "left"
        divbarre.append(p2)
        div.appendChild(divbarre)
      
    }
    function createConfusionMatrix(labels:any,datas:any,backgroundColor:any,borderColor:any,nbrow:number,totalPerColumn:number[]){

      let div = document.getElementById("Chart") as HTMLDivElement;
      let myChartMatrixDiv = document.createElement("div");
      myChartMatrixDiv.className = "myChartMatrixDiv"
      
      
      let myChartMatrix = document.createElement("canvas") as HTMLCanvasElement;
      myChartMatrix.id= "myChartMatrix";
      myChartMatrix.className= "myChartMatrix";
      myChartMatrixDiv.appendChild(myChartMatrix)
      div.appendChild(myChartMatrixDiv);
      let ctx : any = (document.getElementById('myChartMatrix') as HTMLCanvasElement).getContext('2d');
  
        let myChart = new Chart(ctx , {
            type : 'matrix',
            data: {
                datasets: [{
                    type: 'matrix',
                    label: "Matrix Confusion",
                    data: datas,
                    backgroundColor(context) {
                        const value = datas[context.dataIndex].v;
                        //console.log(labels.indexOf(datas[context.dataIndex].x),datas[context.dataIndex].x, value, totalPerColumn[labels.indexOf(datas[context.dataIndex].x)])
                        let colors  = createRainbowRGB(value);
                        let colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                        //console.log(colorString)
                        return color(colorString).alpha(0.8).rgbString();
                      },
                      borderColor(context) {
                        const value = datas[context.dataIndex].v;
                        let colors  = createRainbowRGB(value);
                        let colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                        //console.log(colorString)
                        return color(colorString).alpha(1).rgbString();
                      },
                    borderWidth: 1,
                    width: ({chart}) => (chart.chartArea || {}).width / nbrow - 1,
                    height: ({chart}) =>(chart.chartArea || {}).height / nbrow - 1
                }],
            },
            options: {
              aspectRatio : 1,
                responsive: true,
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
                  },maintainAspectRatio: true,
                animation: {
                    /*onComplete: function() {
                      let a = document.createElement('a');
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

    function createRainbowRGB(x:any){
      let percentFade  =  x;
      let rouge ; 
      let bleu ;
      let vert;
      if(percentFade<0.5){
        rouge = 33 + (166*percentFade*3); 
        bleu = 196 - (166*percentFade*3);
        vert = 33;
      }else{
        rouge = 196;
        bleu = 33;
        vert = 33+ (166*(percentFade-0.5)*2);
      }
      return [rouge,vert,bleu]
  }

    function createChart(data2:any,abscisseData:any,label:any,lineData:any,backgroundColor:any,borderColor:any){
      let myChartLine = document.createElement("canvas") as HTMLCanvasElement;
      myChartLine.id= "myChartLine";
      myChartLine.className= "myChartLine";
      let div = document.getElementById("Chart") as HTMLDivElement;
      div.appendChild(myChartLine);
      let ctx : any = (document.getElementById('myChartLine') as HTMLCanvasElement).getContext('2d');
        
        let myChart = new Chart(ctx , {
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
              aspectRatio : 1,
              responsive: true,
                animation: {
                    /*onComplete: function() {
                      let a = document.createElement('a');
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
            <div className='containerGraph' id="containerGraph">

            <div className="Chart" id="Chart"></div>
            <div className="ChartBar" id="ChartBar"></div>
            </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    );
};

export default AnalyseView;
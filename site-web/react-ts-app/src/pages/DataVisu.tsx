import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import help from "../assets/help.png";
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';
import trashIcone from "../assets/trash.png";
import downloadIcone from "../assets/download.png";
import { callback, color } from 'chart.js/helpers';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
let id = 0;
let list : any[]= [];
const DataVisu = () =>  {    

    function requestDatabases(response : any){
        let listData= JSON.parse(response).liste;
        for(let i: number = 0 ; i < listData.length; i++){
            let data= listData[i];
            list.push(data);
            let option = document.createElement("option");
            option.innerHTML = data.name+"."+data.extension;
            option.value = data.name+"."+data.extension;
            document.getElementById("SelectDB")?.appendChild(option);
        }
    }
    let demo : any;
    window.onload= function(){
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        demo = params.get('demo'); 
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/analyze/databasesDemo', "", requestDatabases); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/analyze/databases', "", requestDatabases);
        }
        
    }


    function createSelectorForColonnes(){
        
        let firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        let secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        let thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                let colonnes = list[i].colonnes;
                let colonnesString = list[i].colonnesString;
                firstcolumn.innerHTML = "";
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                let optiondefault = document.createElement("option");
                optiondefault.innerHTML = "Choose a column";
                optiondefault.value = "Choose a column";
                optiondefault.disabled = true;
                optiondefault.defaultSelected = true;
                let optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                let optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a coloration";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                firstcolumn.appendChild(optiondefault);
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if(!colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        let option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        firstcolumn.appendChild(option);
                    }
                }
            }           
        }
        firstcolumn.disabled = false;
        secondcolumn.disabled = true;
        thirdcolumn.disabled = true;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
        
    }

    

    function createSelectorForSecondColonnes(){
        let firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        let secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        let thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                let colonnes = list[i].colonnes;
                let colonnesString = list[i].colonnesString;
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                let optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                let optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && !colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        let option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        secondcolumn.appendChild(option);
                    } 
                }
            }           
        }
        secondcolumn.disabled = false;
        thirdcolumn.disabled = true;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
    }

    function createSelectorForThirdColonnes(){
        let firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        let secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        let thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        let base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(let i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                let colonnes = list[i].colonnesString;
                thirdcolumn.innerHTML = "";
                let optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a coloration";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                
                thirdcolumn.appendChild(optiondefault3);
                let optionNone3 = document.createElement("option");
                optionNone3.defaultSelected = true;
                optionNone3.innerHTML = "None";
                optionNone3.value = "AucuneColoration";
                optionNone3.style.color = 'red';
                thirdcolumn.appendChild(optionNone3);
                for(let y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && secondcolumn.value !== colonnes[y] && colonnes[y]!==""){
                        let option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        thirdcolumn.appendChild(option);
                    } 
                }
            }           
        }
        thirdcolumn.disabled = false;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = false;
    }


    function enableFirstOne(){
        (document.getElementById("advanced") as HTMLButtonElement).disabled = false;
        (document.getElementById("advanced")as HTMLButtonElement).onclick = showAdvanced;
        (document.getElementById("correlationMatrixButton") as HTMLButtonElement).disabled = false;
        (document.getElementById("correlationMatrixButton")as HTMLButtonElement).onclick = printCorrelation;
        (document.getElementById("FullOverview") as HTMLButtonElement).disabled = false;
        (document.getElementById("FullOverview")as HTMLButtonElement).onclick = requestFullOverview;
        createSelectorForColonnes()
    }
    function enableSecondOne(){
        createSelectorForSecondColonnes()
    }
    function enableThirdOne(){
        createSelectorForThirdColonnes()
        enableSubmit()
    }
    
    function enableSubmit(){
        let thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = false;
        if(thirdOne === "AucuneColoration"){
            (document.getElementById("typeChart")as HTMLSelectElement).disabled = false;
        }else{
            (document.getElementById("typeChart")as HTMLButtonElement).disabled = true;
        }
        
        (document.getElementById("boutonSend")as HTMLButtonElement).onclick = sendRequest;
    }

    
    function sendRequest(ev :any){
        let database = (document.getElementById("SelectDB") as HTMLSelectElement).value
        let firstOne = (document.getElementById("firstOne") as HTMLSelectElement).value
        let secondOne = (document.getElementById("secondOne") as HTMLSelectElement).value
        let thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value
        let sample = (document.getElementById("sample") as HTMLInputElement).value
        let date = new Date(Date.now()); 
        let requestAnalyze = JSON.stringify({
                                            "database" : database,
                                            "date":date, 
                                            "firstOne":firstOne,
                                            "secondOne":secondOne,
                                            "thirdOne":thirdOne,
                                            "sample": sample});
                                            
        
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/dataVisu/parametersDemo', requestAnalyze, callbackDownload); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/dataVisu/parameters', requestAnalyze, callbackDownload);
        }
    }

    function callbackDownload(response:any){
        let thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        if(thirdOne === "AucuneColoration"){
            createDashBoard2column(response)
        }else{
            createDashBoard3column(response)
        }
    }

    function createDashBoard2column(response:any){
        id++;
        let file = JSON.parse(response).file;
        file = file.split('\n')
        let newBoard = document.createElement("div");
        newBoard.id = "newBoard_"+id;
        newBoard.className = "DashBoard"

        let newIndication = document.createElement("div");
        newIndication.id = "indication_"+id;
        newIndication.className = "indication";
        let x = file[0].split(',')[0];
        let y = file[0].split(',')[1];
        newIndication.innerHTML = x + " with respect to " +  y
        newBoard.appendChild(newIndication)

        let download = document.createElement("img");
            download.src = downloadIcone;
            download.id = "download_"+id;
            download.alt = "";
            download.className = "downloadDash";
            download.onclick  = (ev:any) => {
                let thisId = ev.path[0].id.split("_")[1]
                let canvas1 = (document.getElementById("scatter_"+thisId) as HTMLCanvasElement)
    
                let canvas4 = (document.getElementById("hBarx_"+thisId) as HTMLCanvasElement)
    
                let canvas5 = (document.getElementById("hBary_"+thisId) as HTMLCanvasElement)
    
                let canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
                canvasFinal.width = 2000;
                canvasFinal.height= 1000;
                let ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D;
                ctxFinal.drawImage(canvas1, 0, 0,1000,1000);
                ctxFinal.drawImage(canvas4, 1000, 0,500,500);
                ctxFinal.drawImage(canvas5, 1500, 0,500,500);
                let link = document.createElement('a');
                link.download = "RESULT.png";
                link.href = canvasFinal.toDataURL("image/png").replace("image/png", "image/octet-stream");
                link.click();
    
            };

            newBoard.appendChild(download);
        let trash = document.createElement("img");
            trash.src = trashIcone;
            trash.id = "trash_"+id;
            trash.alt = "";
            trash.className = "trashDash";
            trash.onclick  = (ev:any) => {
                let dashBoard = (document.getElementById("newBoard_"+ev.path[0].id.split("_")[1]) as HTMLDivElement);
                dashBoard.innerHTML = "";
                dashBoard.style.display = "none";
            }
            newBoard.appendChild(trash);

        let newScatterBoard = document.createElement("div");
        newScatterBoard.id = "scatterBoard_"+id;
        newScatterBoard.className = "scatterBoard"
        newBoard.appendChild(newScatterBoard);

        
        let newhBaryBoard = document.createElement("div");
        newhBaryBoard.id = "hBaryBoard_"+id;
        newhBaryBoard.className = "hBaryBoard2"
        newBoard.appendChild(newhBaryBoard)

        
        let newhBarxBoard = document.createElement("div");
        newhBarxBoard.id = "hBarxBoard_"+id;
        newhBarxBoard.className = "hBarxBoard2"
        newBoard.appendChild(newhBarxBoard)

        

        

        document.getElementById('ChartsRes')?.appendChild(newBoard)
        
        let data1 : any = [];
        let data2 : any = [];
            
        file.forEach((el :any) =>{
            el = el.split(",")
            data1.push(parseFloat(el[0]));
            data2.push(parseFloat(el[1]));
        });
          
        
        data1 = data1.slice(1)
        data2 = data2.slice(1)
        let type  = (document.getElementById("typeChart")as HTMLSelectElement).value;
        let thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        if(thirdOne === "AucuneColoration" && type === "Line"){
            createLine2Column(data1,data2,x,y)
        }
        else{
            createScatter2Column(data1,data2,x,y)
        }
        
        hBarx(data1,x)
        hBary(data2,y)
        
    }

    function createLine2Column(data1:any,data2:any,x:any,y:any){
        let datas = orderData(data1,data2);
        data1 = []
        data2 = []
        for(let i : number = 0 ; i < datas.length ; i++ ){
            data1.push(datas[i].data1)
            data2.push(datas[i].data2)
        }
        let newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        let ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        let myChart = new Chart(ctx , {
            type : 'line',
            data: {
                datasets: [{
                    type: 'line',
                    label: "Datavisu",
                    data: data1,
                    backgroundColor: "rgba(187, 164, 34, 0.5)",
                    borderColor: "rgba(187, 164, 34,1)",
                    borderWidth: 1
                }],labels:data2
            },
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Datavisualisation of ' +x+' with respect to ' +y,
                    }
                  },
                aspectRatio : 1,
                scales: {
                },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    

    function orderData(data1:any,data2:any){
        let datas : any[] = []
        for(let i : number = 0 ; i < data1.length ; i++ ){
            datas.push({"data1" : data1[i], "data2": data2[i]})
        }
        datas.sort(function (a, b) {
            if (a.data2 < b.data2)
                return -1;
            if (a.data2 > b.data2 )
                return 1;
            return 0;
         });
         return datas;
    }

    function createScatter2Column(data1:any,data2:any,x:any,y:any){
        let newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        let ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        let myChart = new Chart(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "Datavisu",
                    data: data1,
                    backgroundColor: "rgba(187, 164, 34, 0.5)",
                    borderColor: "rgba(187, 164, 34,1)",
                    borderWidth: 1
                }],labels:data2
            },
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Datavisualisation of '+x +' with respect to '+y+'.',
                    }
                  },
                aspectRatio : 1,
                scales: {
                },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    
    function createDashBoard3column(response:any){
        id++;
        let file = JSON.parse(response).file;
        file = file.split('\n')
        let newBoard = document.createElement("div") as any;
        newBoard.id = "newBoard_"+id;
        newBoard.className = "DashBoard"
        
        

        let newIndication = document.createElement("div");
        newIndication.id = "indication_"+id;
        newIndication.className = "indication";
        let x = file[0].split(',')[0];
        let y = file[0].split(',')[1];
        let z = file[0].split(',')[2];
        newIndication.innerHTML = x + " with respect to " + y + " sorted by " +  z
        newBoard.appendChild(newIndication)

        let download = document.createElement("img");
            download.src = downloadIcone;
            download.id = "download_"+id;
            download.alt = "";
            download.className = "downloadDash";
            download.onclick  = (ev:any) => {
                let thisId = ev.path[0].id.split("_")[1]
                let canvas1 = (document.getElementById("scatter_"+thisId) as HTMLCanvasElement)
    
                let canvas2 = (document.getElementById("doughnut_"+thisId) as HTMLCanvasElement)
    
                let canvas3 = (document.getElementById("polar_"+thisId) as HTMLCanvasElement)
    
                let canvas4 = (document.getElementById("hBarx_"+thisId) as HTMLCanvasElement)
    
                let canvas5 = (document.getElementById("hBary_"+thisId) as HTMLCanvasElement)
    
                let canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
                canvasFinal.width = 2000;
                canvasFinal.height= 1000;
                let ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D;
                ctxFinal.drawImage(canvas1, 0, 0,1000,1000);
                ctxFinal.drawImage(canvas2, 1000, 0,500,500);
                ctxFinal.drawImage(canvas3, 1500, 0,500,500);
                ctxFinal.drawImage(canvas4, 1000, 500,500,500);
                ctxFinal.drawImage(canvas5, 1500, 500,500,500);
                let link = document.createElement('a');
                link.download = "RESULT.png";
                link.href = canvasFinal.toDataURL("image/png").replace("image/png", "image/octet-stream");
                link.click();
    
            };

            newBoard.appendChild(download);
        let trash = document.createElement("img");
            trash.src = trashIcone;
            trash.id = "trash_"+id;
            trash.alt = "";
            trash.className = "trashDash";
            trash.onclick  = (ev:any) => {
                let dashBoard = (document.getElementById("newBoard_"+ev.path[0].id.split("_")[1]) as HTMLDivElement);
                dashBoard.innerHTML = "";
                dashBoard.style.display = "none";
            }
            newBoard.appendChild(trash);

        let newScatterBoard = document.createElement("div");
        newScatterBoard.id = "scatterBoard_"+id;
        newScatterBoard.className = "scatterBoard"
        newBoard.appendChild(newScatterBoard);

        let newDoughnutBoard = document.createElement("div");
        newDoughnutBoard.id = "doughnutBoard_"+id;
        newDoughnutBoard.className = "doughnutBoard"
        newBoard.appendChild(newDoughnutBoard);

        
        let newPolarBoard = document.createElement("div");
        newPolarBoard.id = "polarBoard_"+id;
        newPolarBoard.className = "polarBoard"
        newBoard.appendChild(newPolarBoard)

        
        let newhBaryBoard = document.createElement("div");
        newhBaryBoard.id = "hBaryBoard_"+id;
        newhBaryBoard.className = "hBaryBoard"
        newBoard.appendChild(newhBaryBoard)

        
        let newhBarxBoard = document.createElement("div");
        newhBarxBoard.id = "hBarxBoard_"+id;
        newhBarxBoard.className = "hBarxBoard"
        newBoard.appendChild(newhBarxBoard)

        document.getElementById('ChartsRes')?.appendChild(newBoard)
        
        let data1 : any = [];
        let data2 : any = [];
        let data3 : any = [];
            
        file.forEach((el :any) =>{
            el = el.split(",")
            data1.push(parseFloat(el[0]));
            data2.push(parseFloat(el[1]));
            if(el[2]!==undefined){
                data3.push(el[2].replace(/\r/g,""));
            }
        });
          
        
        data1 = data1.slice(1)
        data2 = data2.slice(1)
        data3 = data3.slice(1)
        createScatter(data1,data2,data3,x,y,z)
        createDoughnut(data3,z)
        createPolar(data1,data2,data3,x,y,z)
        hBarx(data1,x)
        hBary(data2,y)
        }
        
    function createScatter(data1:any,data2:any,data3:any,x:any,y:any,z:any){
        let column = getThirdColumn(data3);
        data3 = getColoration(data3,column);
        let backgroundColor = createColors(data3,0.5);
        let borderColor = createColors(data3,1)
        createChart2(data1,data2,backgroundColor,borderColor,x,y,z);
    }
    function createPolar(data1:any,data2:any,data3:any,x:any,y:any,z:any){
        
        let newPolar = document.createElement('canvas');
        newPolar.className="polar";
        newPolar.id="polar_"+id;
        document.getElementById('polarBoard_'+id)?.appendChild(newPolar)


        let ctx :any = (document.getElementById('polar_'+id) as HTMLCanvasElement).getContext('2d');
        let column = getThirdColumn(data3)

        let occurence : any[]= getOccurenceColumn(column,data3)
        let data : any[]= getAverageYByXByDataset(data1,data2,data3,column,occurence)
        let coloration = getColoration(data,column);
        let backgroundColor = createColors(coloration,0.5);
        let borderColor = createColors(coloration,1)
        let myChart = new Chart(ctx , {
            type : 'polarArea',
            data: {
                datasets: [{
                    type: 'polarArea',
                    label: "Datavisu",
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }],labels:column
            },
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Mean of '+x + ' per ' + y+ ' with respect to the coloration '+z,
                    }
                  },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    function getAverageYByXByDataset(data1:any,data2:any,data3:any,column:any,occurence:any){
        let average : any[] = []
        let nbPointZero :any[] = []
        for(let i : number = 0 ; i < column.length ; i++){
            average.push(0);
            nbPointZero.push(0)
        }
        for(let y : number = 0 ; y < data1.length ; y++){
            if(data2[y]!==0){
                average[column.indexOf(data3[y])]+= data1[y]/data2[y];
            }else{
                nbPointZero[column.indexOf(data3[y])] ++;
            }
            
        }
        for(let x : number = 0 ; x < column.length ; x++){
            average[x] = average[x]/(occurence[x]-nbPointZero[x])
        }

        return average;
    }

    function createDoughnut(data3:any,z:any){
        let newDoughnut = document.createElement('canvas');
        newDoughnut.className="doughnut";
        newDoughnut.id="doughnut_"+id;
        document.getElementById('doughnutBoard_'+id)?.appendChild(newDoughnut)


        let ctx :any = (document.getElementById('doughnut_'+id) as HTMLCanvasElement).getContext('2d');
        let column = getThirdColumn(data3)
        let data : any[]= getOccurenceColumn(column,data3)
        let coloration = getColoration(data,column);

        let backgroundColor = createColors(coloration,0.5);
        let borderColor = createColors(coloration,1)
        let myChart = new Chart(ctx , {
            type : 'doughnut',
            data: {
                datasets: [{
                    type: 'doughnut',
                    label: "Datavisu",
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }],labels:column
            },
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Distribution of ' +z,
                    }
                  },
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }
    function hBarx(data3:any,label:string){

        let newhBarx = document.createElement('canvas');
        newhBarx.className="hBarx";
        newhBarx.id="hBarx_"+id;
        document.getElementById('hBarxBoard_'+id)?.appendChild(newhBarx)


        let ctx :any = (document.getElementById('hBarx_'+id) as HTMLCanvasElement).getContext('2d');
        let labels :any  = getLabelFromOneColumn(data3);
        let data = getdataFromOneColumn(data3,labels);
        labels = getLabelFromSteps(labels)
        let myChart = new Chart(ctx , {
            type : 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label : "Distribution of "+label,
                    type: 'bar',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: "rgba(187, 164, 34,0.1)",
                    borderColor: "rgba(187, 164, 34,1)",
                }],
            },
            options: {
                scales: {
                    
                },
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    function getLabelFromOneColumn(data:any){
        let min = data[0];
        let max = data[0];
        data.forEach((element:any) => {
            if(min>element){
                min= element
            }else if(max<element){
                max = element
            }
        });
        let step = (max-min)/10;
        let labels :any[]= []
        for(let i :number = 0; i <= 10 ; i++){
            labels.push((min+i*step).toExponential(1))
        }
        return labels
    }

    function getdataFromOneColumn(data:any,labels:any){
        let datastat :any[] = [0,0,0,0,0,0,0,0,0,0] 
        data.forEach((element:any) => {
            for(let i :number = 1; i <= 10 ; i++){
                if(element<labels[i]){
                    datastat[i-1]++;
                    break
                }
            }
        });
        return datastat

    }

    function getLabelFromSteps(labels:any){
        let labelSteps : string[] = []
        for(let i :number = 1; i <= 10 ; i++){
            labelSteps.push("["+labels[i-1]+","+labels[i]+"]")
        }
        return labelSteps
    }

    function hBary(data3:any,label:string){

        let newhBary = document.createElement('canvas');
        newhBary.className="hBary";
        newhBary.id="hBary_"+id;
        document.getElementById('hBaryBoard_'+id)?.appendChild(newhBary)


        let ctx :any = (document.getElementById('hBary_'+id) as HTMLCanvasElement).getContext('2d');
       
        let labels :any  = getLabelFromOneColumn(data3);
        let data = getdataFromOneColumn(data3,labels);
        labels = getLabelFromSteps(labels)
        let myChart = new Chart(ctx , {
            type : 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label : "Distribution of "+label,
                    type: 'bar',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: "rgba(187, 164, 34,0.1)",
                    borderColor: "rgba(187, 164, 34,1)",
                }],
            },
            options: {
                scales: {
                    
                },
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }


    function getOccurenceColumn(column:any,data:any){
        let occurence : any[] = []
        for(let i : number = 0 ; i < column.length ; i++){
            occurence.push(0);
        }
        for(let y : number = 0 ; y < data.length ; y++){
            occurence[column.indexOf(data[y])]++
        }

        return occurence
    }

    

    function getThirdColumn(data:any){
        let newArray : string[] = [];
        data.forEach((el :any) =>{
            if(!newArray.includes(el)){
                newArray.push(el); 
            }
        })
        return newArray
    }


    function createColors(array: any[],opacity:number){
        let newArray : string[] = [];
        array.forEach((el :any) =>{
            let color = el;
            newArray.push("rgba("+color.r+","+color.g+','+color.b+","+opacity+")"); 
            
        })
        return(newArray)
    }

    function createRainbowRGB(nbColors:any){
        let colors : any[] = []
        console.log(nbColors)
        for(let i :number = 0 ; i<nbColors;i++){
            let percentFade  =  i/nbColors*100;
            let rouge;
            let vert;
            let bleu;
            if(percentFade<20){
                rouge = 1;
                vert = percentFade*5/100;
                bleu = 0;
            }else if(percentFade<40){
                rouge = 1-((percentFade-20)*5)/100;
                vert = 1;
                bleu = 0;
            }else if(percentFade<60){
                rouge = 0;
                vert = 1;
                bleu = (percentFade-40)*5/100;
            }else if (percentFade<80){
                rouge = 0;
                vert = 1-((percentFade-60)*5)/100;
                bleu = 1;
            }else{
                rouge = (percentFade-80)*5/100;;
                vert = 0;
                bleu = 1;
            }
            colors.push({"r": rouge*255,"g": vert*255,"b": bleu*255})
        }
    return colors
}
    function getColoration(array: string[],column:any[]){
        let newArray : string[] = [];
        let coloration : any[] = [];
        let nbColors = column.length;
        let colors :any = createRainbowRGB(nbColors)
        array.forEach((el :any) =>{
            if(!newArray.includes(el)){
                newArray.push(el); 
            }
            coloration.push(colors[newArray.indexOf(el)])
        })
        return coloration
    }

    
    function createChart2(data1:any,data2:any,backgroundColor:any,borderColor:any,x:any,y:any,z:any){
        
        let newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        let ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        let myChart = new Chart(ctx , {
            type : 'scatter',
            data: {
                datasets: [{
                    type: 'scatter',
                    label: "Datavisu",
                    data: data1,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }],labels:data2
            },
            options: {
                plugins: {
                    title: {
                      display: true,
                      text: 'Datavisualisation of ' +x+' with respect to ' +y+', colored by '+ z,
                    }
                  },
                aspectRatio : 1,
                scales: {
                },
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }



    function updateSample(){
        let inputSample = document.getElementById("inputSample") as HTMLDivElement;
        let sample = document.getElementById("sample") as HTMLInputElement;
        inputSample.innerHTML =sample.value +"%";
    }

    function showAdvanced(){
        (document.getElementById("dataVisuContainer") as HTMLDivElement).className = "dataVisuContainerAdvanced";
    }
    function hideAdvanced(){
        (document.getElementById("dataVisuContainer") as HTMLDivElement).className = "dataVisuContainerParam";
    }
    function printCorrelation(){
        let requestAnalyze = JSON.stringify({"database": (document.getElementById("SelectDB")as HTMLSelectElement).value});
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/dataVisu/matrixDemo', requestAnalyze, callbackMatrix); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/dataVisu/matrix', requestAnalyze, callbackMatrix);
        }
    }

    

    function callbackMatrix(reponse:any){
        id++;
        let newBoard = document.createElement("div") as any;
        newBoard.id = "newBoard_"+id;
        newBoard.className = "DashBoard";
        let newIndication = document.createElement("div");
        newIndication.id = "indication_"+id;
        newIndication.className = "indication";
        newIndication.innerHTML = "Matrice de corrélation";
        newBoard.appendChild(newIndication)
       

        let download = document.createElement("img");
            download.src = downloadIcone;
            download.id = "download_"+id;
            download.alt = "";
            download.className = "downloadDash";
            download.onclick  = (ev:any) => {
                let thisId = ev.path[0].id.split("_")[1]
                let canvas1 = (document.getElementById("matrix_"+thisId) as HTMLCanvasElement)
                let canvasFinal = document.createElement("canvas") as HTMLCanvasElement;
                canvasFinal.width = 2000;
                canvasFinal.height= 1000;
                let ctxFinal = canvasFinal.getContext("2d") as CanvasRenderingContext2D;
                ctxFinal.drawImage(canvas1, 0, 0,2000,1000);
                let link = document.createElement('a');
                link.download = "RESULT.png";
                link.href = canvasFinal.toDataURL("image/png").replace("image/png", "image/octet-stream");
                link.click();
    
            };

            newBoard.appendChild(download);
        let trash = document.createElement("img");
            trash.src = trashIcone;
            trash.id = "trash_"+id;
            trash.alt = "";
            trash.className = "trashDash";
            trash.onclick  = (ev:any) => {
                let dashBoard = (document.getElementById("newBoard_"+ev.path[0].id.split("_")[1]) as HTMLDivElement);
                dashBoard.innerHTML = "";
                dashBoard.style.display = "none";
            }
        newBoard.appendChild(trash);

        
        let newMatrixBoard = document.createElement("div") as any;
        newMatrixBoard.id = "matrixBoard_"+id;
        newMatrixBoard.className = "MatrixBoard";
        newBoard.appendChild(newMatrixBoard)
        let divbarre = document.createElement("div")
        divbarre.className = "divBarre"
        
        let p1 = document.createElement("p")
        p1.innerHTML = "-1"
        p1.style.float = "left"
        divbarre.append(p1)
        let barreColor = document.createElement("div");
        barreColor.id = "barreColor_"+id;
        barreColor.className = "barreColor"
        barreColor.innerHTML ="0"
        divbarre.append(barreColor)
        let p2 = document.createElement("p")
        p2.innerHTML = "1"
        p2.style.float = "left"
        divbarre.append(p2)
        newBoard.appendChild(divbarre)
        document.getElementById('ChartsRes')?.appendChild(newBoard)
        let matrix = JSON.parse(reponse).file;
        matrix = matrix.split("\n")
        let labels :any[] = matrix[0].split(",");
        let nbrow=0;
        labels.forEach((element:any) => {
            nbrow++;
        });
        let data :any[] = []
        let totalPerColumn :number[] = [] ;
            for(let x : number = 0 ; x < nbrow ; x++){

              totalPerColumn.push(0)
            }
        for(let i : number = 1 ; i < nbrow+1 ; i++){
            let line = matrix[i].split(",")
                for(let j : number = 0 ; j < nbrow ; j++){
                  totalPerColumn[i-1] += parseFloat(line[j]);
                  let dataline = {'x': labels[i-1], 'y': labels[j], 'v': parseFloat(line[j])}
                  data.push(dataline)
                }
        }
        createCorrelationMatrix(labels,data,"rgba(187, 164, 34,0.1)","rgba(187, 164, 34,1)",nbrow,totalPerColumn)

    }

    function createCorrelationMatrix(labels:any,datas:any,backgroundColor:any,borderColor:any,nbrow:number,totalPerColumn:number[]){
        let newCanvas = document.createElement('canvas');
        newCanvas.className="matrix";
        newCanvas.id="matrix_"+id;
        document.getElementById('matrixBoard_'+id)?.appendChild(newCanvas)


        let ctx :any = (document.getElementById('matrix_'+id) as HTMLCanvasElement).getContext('2d');
        
        let myChart = new Chart(ctx , {
              type : 'matrix',
              data: {
                  datasets: [{
                      type: 'matrix',
                      label: "Matrix Confusion",
                      data: datas,
                      backgroundColor(context) {
                          const value = datas[context.dataIndex].v;
                          let colors  = createMatrixRGB(value, totalPerColumn[labels.indexOf(datas[context.dataIndex].x)]);
                          let colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                          return color(colorString).alpha(0.8).rgbString();
                        },
                        borderColor(context) {
                          const value = datas[context.dataIndex].v;
                          let colors  = createMatrixRGB(value, totalPerColumn[labels.indexOf(datas[context.dataIndex].x)]);
                          let colorString : string= "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                          return color(colorString).alpha(1).rgbString();
                        },
                      borderWidth: 1,
                      width: ({chart}) => (chart.chartArea || {}).width / nbrow - 1,
                      height: ({chart}) =>(chart.chartArea || {}).height / nbrow - 1
                  }],
              },
              options: {
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
                    },
                    
              }})
          myChart.update();
          return myChart;
  
      }

    function createMatrixRGB(x:any,max:any){
        let percentFade  =  (x+1)/2;
        let rouge ; 
        let bleu ;
        let vert;
        if(percentFade<0.5){
          rouge = 33 + (166*percentFade*2); 
          bleu = 196 - (166*percentFade*2);
          vert = 33;
        }else{
          rouge = 196;
          bleu = 33;
          vert = 33+ (166*(percentFade-0.5)*2);
        }
        return [rouge,vert,bleu]
    }

    function requestFullOverview(){
        let requestAnalyze = JSON.stringify({"database": (document.getElementById("SelectDB")as HTMLSelectElement).value});
        if(demo === "true"){
            utils.default.sendRequestDemo('POST', '/api/dataVisu/fullOverviewDemo', requestAnalyze, callbackFullOverview); 
        }else{
            utils.default.sendRequestWithToken('POST', '/api/dataVisu/fullOverview', requestAnalyze, callbackFullOverview);
        }
    }

    function callbackFullOverview(reponse:any){
        //console.log(JSON.parse(reponse).file)
        let newWindow :any = window.open();
        newWindow.document.write(JSON.parse(reponse).file);
      
    }

    return (
        
        <div className="DataVisu">
            <div id="loading" className="loading">
            <div className="loading-content">
            <div className="loading-content__center-part">
            </div>
            <div className="loading-content__loader">
                <div className="loading-content__loader-content"></div>
            </div>
        </div>
            </div>
            <div className="view" id="view">
                <div className="dataVisuView">
                <div id="dataVisuContainer" className="dataVisuContainer">
                <div className="dataVisuBar" >
                <h1 className="title">Data Visualisation</h1>
                <select name="database" id="SelectDB"defaultValue="Choose a database" className="SelectDB" onChange={enableFirstOne}>
                    <option value="Choose a database" disabled >Choose a database</option>
                </select><br />
              
                <select name="firstOne" id="firstOne"defaultValue="Choose a column" className="firstOne" onChange={enableSecondOne} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select><br />
                <select name="secondOne" id="secondOne" defaultValue="Choose a column" className="firstOne" onChange={enableThirdOne} disabled>
                    <option value="Choose a column" disabled >Choose a column</option>
                </select><br />
                <select name="thirdOne" id="thirdOne" defaultValue="Choose a column" className="firstOne" disabled>
                    <option value="Choose a column" disabled >Choose a coloration</option>
                </select>
                <br />
                    <button className="advanced" id="advanced" onClick={showAdvanced} disabled>advanced 	&gt;</button>
                    <div className="indicSample"  >Number of rows</div> <br />
                    <input type="range" id="sample" className="sample" onChange={updateSample} min="1" max="100" defaultValue="50"/>
                    <div className="inputSample" id="inputSample">50%</div>
                <br />
                <button  onClick={sendRequest} className="boutonSend" id="boutonSend" disabled>Analyze</button>
                </div>
                <div className="advancedBar">
                <button className="return" onClick={hideAdvanced}>&lt; back </button>
                <select name="firstOne" id="typeChart"defaultValue="Choose a chart" className="firstOne" disabled>
                    <option value="Choose a chart" disabled >Choose a chart</option>
                    <option value="Scatter" >Scatter Chart</option>
                    <option value="Line" >Line Chart</option>
                </select><br />
                <button onClick={printCorrelation} className='boutonSend' id="correlationMatrixButton" disabled>Correlation Matrix<img src={help} className="helpCorrelation" alt="" title="A correlation matrix is a table showing correlation coefficients between variables. Each cell in the table shows the correlation between two variables. Goes from -1 to 1."/></button>
                <button onClick={requestFullOverview} className='boutonSend' id="FullOverview" disabled>Full Overview<img src={help} className="helpCorrelation" alt="" title="Christel"/></button>
                </div>
                </div>
                </div>
                <div className="ChartsRes" id="ChartsRes">

                </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default DataVisu;
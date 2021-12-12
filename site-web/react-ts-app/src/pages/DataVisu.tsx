import BarreLaterale from '../components/BarreLaterale';
import Navigation from '../components/Navigation';
import { Chart} from 'chart.js';
import * as utils from "../Utils";
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

Chart.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
var id = 0;
var list : any[]= [];
const DataVisu = () =>  {    

    function requestDatabases(response : any){
        var listData= JSON.parse(response).liste;
        for(var i: number = 0 ; i < listData.length; i++){
            var data= listData[i];
            list.push(data);
            var option = document.createElement("option");
            option.innerHTML = data.name+"."+data.extension;
            option.value = data.name+"."+data.extension;
            document.getElementById("SelectDB")?.appendChild(option);
        }
    }

    window.onload= function(){
        
        utils.default.sendRequestWithToken('POST', '/api/analyze/databases', "", requestDatabases);
    }


    function createSelectorForColonnes(){
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                var colonnesString = list[i].colonnesString;
                firstcolumn.innerHTML = "";
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                var optiondefault = document.createElement("option");
                optiondefault.innerHTML = "Choose a column";
                optiondefault.value = "Choose a column";
                optiondefault.disabled = true;
                optiondefault.defaultSelected = true;
                var optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                firstcolumn.appendChild(optiondefault);
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(!colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        var option = document.createElement("option");
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
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnes;
                var colonnesString = list[i].colonnesString;
                secondcolumn.innerHTML = "";
                thirdcolumn.innerHTML = "";
                var optiondefault2 = document.createElement("option");
                optiondefault2.innerHTML = "Choose a column";
                optiondefault2.value = "Choose a column";
                optiondefault2.disabled = true;
                optiondefault2.defaultSelected = true;
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a column";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                secondcolumn.appendChild(optiondefault2);
                thirdcolumn.appendChild(optiondefault3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && !colonnesString.includes(colonnes[y]) && colonnes[y]!==""){
                        var option = document.createElement("option");
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
        var firstcolumn = (document.getElementById("firstOne")as HTMLSelectElement);
        var secondcolumn = (document.getElementById("secondOne")as HTMLSelectElement);
        var thirdcolumn = (document.getElementById("thirdOne")as HTMLSelectElement);
        var base = (document.getElementById("SelectDB")as HTMLSelectElement).value;
        for(var i: number = 0 ; i < list.length; i++){
            if(list[i].name+"."+list[i].extension === base){
                var colonnes = list[i].colonnesString;
                thirdcolumn.innerHTML = "";
                var optiondefault3 = document.createElement("option");
                optiondefault3.innerHTML = "Choose a coloration";
                optiondefault3.value = "Choose a column";
                optiondefault3.disabled = true;
                optiondefault3.defaultSelected = true;
                thirdcolumn.appendChild(optiondefault3);
                var optionNone3 = document.createElement("option");
                optionNone3.innerHTML = "None";
                optionNone3.value = "AucuneColoration";
                optionNone3.style.color = 'red';
                thirdcolumn.appendChild(optionNone3);
                for(var y: number = 0 ; y < colonnes.length; y++){
                    if(firstcolumn.value !== colonnes[y] && secondcolumn.value !== colonnes[y] && colonnes[y]!==""){
                        var option = document.createElement("option");
                        option.innerHTML = colonnes[y];
                        option.value = colonnes[y];
                        thirdcolumn.appendChild(option);
                    } 
                }
            }           
        }
        thirdcolumn.disabled = false;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = true;
    }


    function enableFirstOne(){
        createSelectorForColonnes()
    }
    function enableSecondOne(){
        createSelectorForSecondColonnes()
    }
    function enableThirdOne(){
        createSelectorForThirdColonnes()
    }
    
    function enableSubmit(){
        var thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        (document.getElementById("boutonSend")as HTMLButtonElement).disabled = false;
        if(thirdOne === "AucuneColoration"){
            (document.getElementById("typeChart")as HTMLSelectElement).disabled = false;
        }else{
            (document.getElementById("typeChart")as HTMLButtonElement).disabled = true;
        }
        
        (document.getElementById("boutonSend")as HTMLButtonElement).onclick = sendRequest;
    }

    
    function sendRequest(ev :any){
        var database = (document.getElementById("SelectDB") as HTMLSelectElement).value
        var firstOne = (document.getElementById("firstOne") as HTMLSelectElement).value
        var secondOne = (document.getElementById("secondOne") as HTMLSelectElement).value
        var thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value
        var sample = (document.getElementById("sample") as HTMLInputElement).value
        var date = new Date(Date.now()); 
        var requestAnalyze = JSON.stringify({
                                            "database" : database,
                                            "date":date, 
                                            "firstOne":firstOne,
                                            "secondOne":secondOne,
                                            "thirdOne":thirdOne,
                                            "sample": sample});
        utils.default.sendRequestWithToken('POST', '/api/dataVisu/parameters', requestAnalyze, callbackDownload);
        
    }

    function callbackDownload(response:any){
        var thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        if(thirdOne === "AucuneColoration"){
            createDashBoard2column(response)
        }else{
            createDashBoard3column(response)
        }
    }

    function createDashBoard2column(response:any){
        id++;
        var file = JSON.parse(response).file;
        file = file.split('\n')
        var newBoard = document.createElement("div");
        newBoard.id = "newBoard_"+id;
        newBoard.className = "DashBoard"
        var newScatterBoard = document.createElement("div");
        newScatterBoard.id = "scatterBoard_"+id;
        newScatterBoard.className = "scatterBoard"
        newBoard.appendChild(newScatterBoard);

        
        var newhBaryBoard = document.createElement("div");
        newhBaryBoard.id = "hBaryBoard_"+id;
        newhBaryBoard.className = "hBaryBoard2"
        newBoard.appendChild(newhBaryBoard)

        
        var newhBarxBoard = document.createElement("div");
        newhBarxBoard.id = "hBarxBoard_"+id;
        newhBarxBoard.className = "hBarxBoard2"
        newBoard.appendChild(newhBarxBoard)

        var newIndication = document.createElement("div");
        newIndication.id = "indication_"+id;
        newIndication.className = "indication";
        newIndication.innerHTML = file[0].split(',')[0] + " en fonction de " + file[0].split(',')[1] 
        newBoard.appendChild(newIndication)

        

        document.getElementById('ChartsRes')?.appendChild(newBoard)
        
        var data1 : any = [];
        var data2 : any = [];
            
        file.forEach((el :any) =>{
            el = el.split(",")
            data1.push(parseFloat(el[0]));
            data2.push(parseFloat(el[1]));
        });
          
        
        data1 = data1.slice(1)
        data2 = data2.slice(1)
        var type  = (document.getElementById("typeChart")as HTMLSelectElement).value;
        var thirdOne = (document.getElementById("thirdOne") as HTMLSelectElement).value;
        if(thirdOne === "AucuneColoration" && type === "Line"){
            createLine2Column(data1,data2)
        }
        else{
            createScatter2Column(data1,data2)
        }
        
        hBarx(data1,file[0].split(',')[0])
        hBary(data2,file[0].split(',')[1])
        
    }

    function createLine2Column(data1:any,data2:any){
        var datas = orderData(data1,data2);
        data1 = []
        data2 = []
        for(var i : number = 0 ; i < datas.length ; i++ ){
            data1.push(datas[i].data1)
            data2.push(datas[i].data2)
        }
        var newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        var ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
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
        var datas : any[] = []
        for(var i : number = 0 ; i < data1.length ; i++ ){
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

    function createScatter2Column(data1:any,data2:any){
        var newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        var ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
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
        var file = JSON.parse(response).file;
        file = file.split('\n')
        var newBoard = document.createElement("div");
        newBoard.id = "newBoard_"+id;
        newBoard.className = "DashBoard"

        var newScatterBoard = document.createElement("div");
        newScatterBoard.id = "scatterBoard_"+id;
        newScatterBoard.className = "scatterBoard"
        newBoard.appendChild(newScatterBoard);

        var newDoughnutBoard = document.createElement("div");
        newDoughnutBoard.id = "doughnutBoard_"+id;
        newDoughnutBoard.className = "doughnutBoard"
        newBoard.appendChild(newDoughnutBoard);

        
        var newPolarBoard = document.createElement("div");
        newPolarBoard.id = "polarBoard_"+id;
        newPolarBoard.className = "polarBoard"
        newBoard.appendChild(newPolarBoard)

        
        var newhBaryBoard = document.createElement("div");
        newhBaryBoard.id = "hBaryBoard_"+id;
        newhBaryBoard.className = "hBaryBoard"
        newBoard.appendChild(newhBaryBoard)

        
        var newhBarxBoard = document.createElement("div");
        newhBarxBoard.id = "hBarxBoard_"+id;
        newhBarxBoard.className = "hBarxBoard"
        newBoard.appendChild(newhBarxBoard)

        var newIndication = document.createElement("div");
        newIndication.id = "indication_"+id;
        newIndication.className = "indication";
        newIndication.innerHTML = file[0].split(',')[0] + " en fonction de " + file[0].split(',')[1] + " classé par " +  file[0].split(',')[2]
        newBoard.appendChild(newIndication)

        document.getElementById('ChartsRes')?.appendChild(newBoard)
        
        var data1 : any = [];
        var data2 : any = [];
        var data3 : any = [];
            
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
        createScatter(data1,data2,data3)
        createDoughnut(data3)
        createPolar(data1,data2,data3)
        hBarx(data1,file[0].split(',')[1])
        hBary(data2,file[0].split(',')[2])
        }
        
    function createScatter(data1:any,data2:any,data3:any){
        var datas = decomposeDataByThirdColumn(data1,data2,data3)
        var datasets = createsDatasets(datas,getThirdColumn(data3))
        data3 = getColoration(data3);
        //createChart2bis(data2,datasets); 
        var backgroundColor = createColors(data3,0.5);
        var borderColor = createColors(data3,1)
        var mychart = createChart2(data1,data2,backgroundColor,borderColor);
    }
    function createPolar(data1:any,data2:any,data3:any){
        
        var newPolar = document.createElement('canvas');
        newPolar.className="polar";
        newPolar.id="polar_"+id;
        document.getElementById('polarBoard_'+id)?.appendChild(newPolar)


        var ctx :any = (document.getElementById('polar_'+id) as HTMLCanvasElement).getContext('2d');
        var column = getThirdColumn(data3)

        var occurence : any[]= getOccurenceColumn(column,data3)
        var data : any[]= getAverageYByXByDataset(data1,data2,data3,column,occurence)
        var coloration = getColoration(data);
        var backgroundColor = createColors(coloration,0.5);
        var borderColor = createColors(coloration,1)
        var myChart = new Chart(ctx , {
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
                
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    function getAverageYByXByDataset(data1:any,data2:any,data3:any,column:any,occurence:any){
        var average : any[] = []
        for(var i : number = 0 ; i < column.length ; i++){
            average.push(0);
        }
        for(var y : number = 0 ; y < data1.length ; y++){
            average[column.indexOf(data3[y])]+= data1[y]/data2[y];
        }
        for(var x : number = 0 ; x < column.length ; x++){
            average[x] = average[x]/occurence[x]
        }

        return average;
    }

    function createDoughnut(data3:any){
        var newDoughnut = document.createElement('canvas');
        newDoughnut.className="doughnut";
        newDoughnut.id="doughnut_"+id;
        document.getElementById('doughnutBoard_'+id)?.appendChild(newDoughnut)


        var ctx :any = (document.getElementById('doughnut_'+id) as HTMLCanvasElement).getContext('2d');
        var column = getThirdColumn(data3)
        var data : any[]= getOccurenceColumn(column,data3)
        var coloration = getColoration(data);

        var backgroundColor = createColors(coloration,0.5);
        var borderColor = createColors(coloration,1)
        var myChart = new Chart(ctx , {
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
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }
    function hBarx(data3:any,label:string){

        var newhBarx = document.createElement('canvas');
        newhBarx.className="hBarx";
        newhBarx.id="hBarx_"+id;
        document.getElementById('hBarxBoard_'+id)?.appendChild(newhBarx)


        var ctx :any = (document.getElementById('hBarx_'+id) as HTMLCanvasElement).getContext('2d');
        var labels :any  = getLabelFromOneColumn(data3);
        var data = getdataFromOneColumn(data3,labels);
        labels = getLabelFromSteps(labels)
        var myChart = new Chart(ctx , {
            type : 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label : "Répartion des "+label,
                    type: 'bar',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: "rgba(187, 164, 34,0.1)",
                    borderColor: "rgba(187, 164, 34,1)",
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false //this will remove only the label
                        }
                    }]
                },
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }

    function getLabelFromOneColumn(data:any){
        var min = data[0];
        var max = data[0];
        data.forEach((element:any) => {
            if(min>element){
                min= element
            }else if(max<element){
                max = element
            }
        });
        var step = (max-min)/10;
        var labels :any[]= []
        for(var i :number = 0; i <= 10 ; i++){
            labels.push((min+i*step).toExponential(1))
        }
        console.log(min+" "+max)
        console.log(labels)
        return labels
    }

    function getdataFromOneColumn(data:any,labels:any){
        var datastat :any[] = [0,0,0,0,0,0,0,0,0,0] 
        data.forEach((element:any) => {
            for(var i :number = 1; i <= 10 ; i++){
                if(element<labels[i]){
                    datastat[i-1]++;
                    break
                }
            }
        });
        console.log(datastat);
        return datastat

    }

    function getLabelFromSteps(labels:any){
        var labelSteps : string[] = []
        for(var i :number = 1; i <= 10 ; i++){
            labelSteps.push("["+labels[i-1]+","+labels[i]+"]")
        }
        return labelSteps
    }

    function hBary(data3:any,label:string){

        var newhBary = document.createElement('canvas');
        newhBary.className="hBary";
        newhBary.id="hBary_"+id;
        document.getElementById('hBaryBoard_'+id)?.appendChild(newhBary)


        var ctx :any = (document.getElementById('hBary_'+id) as HTMLCanvasElement).getContext('2d');
       
        var labels :any  = getLabelFromOneColumn(data3);
        var data = getdataFromOneColumn(data3,labels);
        labels = getLabelFromSteps(labels)
        var myChart = new Chart(ctx , {
            type : 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label : "Répartion des "+label,
                    type: 'bar',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: "rgba(187, 164, 34,0.1)",
                    borderColor: "rgba(187, 164, 34,1)",
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false //this will remove only the label
                        }
                    }]
                },
                aspectRatio : 1,
                responsive: true
            } as any
            
        });
        myChart.update();
        return myChart;
    }


    function getOccurenceColumn(column:any,data:any){
        var occurence : any[] = []
        for(var i : number = 0 ; i < column.length ; i++){
            occurence.push(0);
        }
        for(var y : number = 0 ; y < data.length ; y++){
            occurence[column.indexOf(data[y])]++
        }

        return occurence
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
            var data : any[] = [];
            var labels : any[] = [];
            for(var index : number = 0 ;index < datas[i].length;index++){
                data.push(datas[i][index][0]);
                labels.push(datas[i][index][1]);
            
            }
            datasets.push({
                type: 'scatter',
                label: thirdColumn[i],
                data: data,
                backgroundColor: backgroundColor[i%7],
                borderColor: borderColor[i%7],
                borderWidth: 1,               
                labels : labels,
            } as any)
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
            coloration.push(colors[newArray.indexOf(el)%7])
        })
        return coloration
    }

    
    function createChart2(data1:any,data2:any,backgroundColor:any,borderColor:any){
        
        var newCanvas = document.createElement('canvas');
        newCanvas.className="scatter";
        newCanvas.id="scatter_"+id;
        document.getElementById('scatterBoard_'+id)?.appendChild(newCanvas)


        var ctx :any = (document.getElementById('scatter_'+id) as HTMLCanvasElement).getContext('2d');
        
        var myChart = new Chart(ctx , {
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
        var inputSample = document.getElementById("inputSample") as HTMLDivElement;
        var sample = document.getElementById("sample") as HTMLInputElement;
        inputSample.innerHTML =sample.value +"%";
    }

    function showAdvanced(){
        (document.getElementById("dataVisuContainer") as HTMLDivElement).className = "dataVisuContainerAdvanced";
    }
    function hideAdvanced(){
        (document.getElementById("dataVisuContainer") as HTMLDivElement).className = "dataVisuContainerParam";
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
                <div className="dataVisuBar">
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
                <select name="thirdOne" id="thirdOne" defaultValue="Choose a column" className="firstOne" onChange={enableSubmit} disabled>
                    <option value="Choose a column" disabled >Choose a coloration</option>
                </select>
                <br />
                    <div className="advanced" onClick={showAdvanced}>advanced 	&gt;</div>
                    <div className="indicSample"  >Number of rows</div> <br />
                    <input type="range" id="sample" className="sample" onChange={updateSample} min="1" max="100" defaultValue="50"/>
                    <div className="inputSample" id="inputSample">50%</div>
                <br />
                <button  onClick={sendRequest} className="boutonSend" id="boutonSend" disabled>Analyze</button>
                </div>
                <div className="advancedBar">
                <div className="return" onClick={hideAdvanced}>&lt; back </div>
                <select name="firstOne" id="typeChart"defaultValue="Choose a chart" className="firstOne" disabled>
                    <option value="Choose a chart" disabled >Choose a chart</option>
                    <option value="Scatter" >Scatter Chart</option>
                    <option value="Line" >Line Chart</option>
                </select><br />
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
import { Chart as ChartJS } from 'chart.js';
import {    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  } from 'chart.js';

ChartJS.register(    ArcElement,    LineElement,    BarElement,    PointElement,    BarController,    BubbleController,    DoughnutController,    LineController,    PieController,    PolarAreaController,    RadarController,    ScatterController,    CategoryScale,    LinearScale,    LogarithmicScale,    RadialLinearScale,    TimeScale,    TimeSeriesScale,    Decimation,    Filler,    Legend,    Title,    Tooltip  );
  
interface propsChart {
    type :any;
    labels :string[];
    label: string;
    data : number[];
    backgroundColor: string[];
    borderColor: string[];

}


const Chart = (props : propsChart) => {
    window.onload=function(){
        console.log("COCO")
        var ctx :any = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        
        var myChart = new ChartJS(ctx , {
            type: props.type,
            data: {
                labels: props.labels,
                datasets: [{
                    label: props.label,
                    data: props.data,
                    backgroundColor: props.backgroundColor,
                    borderColor: props.borderColor,
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
        <div className="Chart">
            
            <canvas className="myChart" id="myChart" width="400" height="400"></canvas>
        </div>
    );
};

export default Chart;
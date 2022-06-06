import React, {Component} from 'react';

// import Fusion Charts library
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import './index.css';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

import $ from 'jquery'
import './Left.css';
import Publisher from './PubSub/Publisher';
import Right from './Right'
import Inside from './Inside'
import PubSubManager from './PubSub/PubSubManager'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);



// multi line chart configuration settings
var count=1000;
var chartConfigs_multiline = {
    type: "msline",
    width: '100%',
    height: 350,
    dataFormat: 'json',
    dataSource: {
        chart: {
            caption: "Number of Cell phone calls in 2022",
            yaxisname: "Number of calls",
            subcaption: "Phone calls in 2022 ",
            showhovereffect: "1",
            drawcrossline: "1",
            theme: "fusion",

            //Set border color
            showBorder: "1",
            borderColor: "#ccc",
            bgColor: "#FFFFFF",

            //Tooltip customization
            toolTipBorderColor: "#666666",
            toolTipBgColor: "#efefef",
            toolTipBgAlpha: "80",
            showToolTipShadow: "1",

            //Theme
            plotBorderThickness: "0.25",
            showxaxispercentvalues: "1",
            plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
        },
        categories: [
            {
                category: [
                    {
                        label: "6:00:02 AM"
                    },
                    {
                        label: "6:00:04 AM"
                    },
                    {
                        label: "6:00:06 AM"
                    },
                    {
                        label: "6:00:08 AM"
                    },
                    {
                        label: "6:00:10 AM"
                    }
                ]
            }
        ],
        dataset: [
            {
                seriesname: "Men",
                data: [
                    {
                        value: "3000"
                    },
                    {
                        value: "3320"
                    },
                    {
                        value: "3589"
                    },
                    {
                        value: "3600"
                    },
                    {
                        value: "3900"
                    }
                ]
            },
            {
                seriesname: "Women",
                data: [
                    {
                        value: "1400"
                    },
                    {
                        value: "1420"
                    },
                    {
                        value: "1500"
                    },
                    {
                        value: "1520"
                    },
                    {
                        value: "1530"
                    }
                ]
            },
            {
                seriesname: "Both Sex",
                data: [
                    {
                        value: "1230"
                    },
                    {
                        value: "1250"
                    },
                    {
                        value: "1280"
                    },
                    {
                        value: "1450"
                    },
                    {
                        value: "1480"
                    }
                ]
            }
        ]
    }
};

class MobileCallsDashboard extends Component {
    componentWillMount() {
        
        
        
            setInterval(function(){
            //alert("Wow");
            count=count+50;
            var strCount=count.toString();
            //alert("strCount: "+strCount);
            chartConfigs_multiline.dataSource.dataset[0].data[0]=strCount;
            chartConfigs_multiline.dataSource.categories[0].category[0].label="GGGG";
            alert("Value: "+JSON.stringify(chartConfigs_multiline));
           
        }
        , 1000);
    
    }

  

    render() {
        return (
            <div className="container">
                <div className="row">
                   

                    {/*Multi Line section*/}
                    <div className="col-sm-6">
                        <h3>Cell phone call Traffic in Singapore</h3>
                        <ReactFC {...chartConfigs_multiline} />
                    </div>
                </div>
            </div>)
    }
}

export default MobileCallsDashboard;

var dom = document.getElementById("chart-map");
if (dom && dom !== null ) {
    var myChart = echarts.init(dom);
    myChart.resize();
    option = null;
    var been = [
        { name: '上海', value: 2016 },
        { name: '长春', value: 2012 },
        { name: '重庆', value: 2017 },
        { name: '南京', value: 2016 },
        { name: '连云港', value: 2016 },
        { name: '三亚', value: 2017 },
        { name: '苏州', value: 2016 },
        { name: '杭州', value: 2016 },
        { name: '西安', value: 2013 },
        { name: '宝鸡', value: 2014 },
        { name: '海口', value: 2017 }
    ];
    var want = [
        { name: '成都', value: 0 },
    ];
    var geoCoordMap = {
        '上海': [121.48, 31.22],
        '西安': [108.95, 34.27],
        '长春': [125.35, 43.88],
        '重庆': [106.54, 29.59],
        '南京': [118.78, 32.04],
        '三亚': [109.511909, 18.252847],
        '苏州': [120.62, 31.32],
        '杭州': [120.19, 30.26],
        '连云港': [119.16, 34.59],
        '宝鸡': [107.15, 34.38],
        '海口': [110.35, 20.02],
        '大连': [121.62, 38.92],
        '成都': [104.06, 30.67],
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option = {
        backgroundColor: 'transparent',
        title: {
            subtext: '跨过的山和大海',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['已去过', '计划中'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [
            {
                name: '已去过',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(been),
                symbolSize: function (val) {
                    return 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                tooltip: {
                    formatter: function (val) {
                        return (val.data.name) + ':' + (val.data.value[2]) + ' 年';
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
                name: '计划中',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(want),
                symbolSize: function (val) {
                    return 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                tooltip: {
                    formatter: '{b}:{a}'
                },
                itemStyle: {
                    normal: {
                        color: '#fc1d77',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
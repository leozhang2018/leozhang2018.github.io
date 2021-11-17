var dom = document.getElementById('chart-code');
if (dom && dom !== null) {
  var myChart = echarts.init(dom);
  myChart.resize();
  var option = {
    backgroundColor: 'transparent',
    title: {
      subtext: 'Coding Time（Hours）',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#fc1d77'],
    xAxis: {
      type: 'category',
      data: [],
      axisTick: {
        show: false
      },
      axisLabel:{interval:0},
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ]
  };
  if (option && typeof option === 'object') {
    myChart.setOption(option, true);
  }
  // 异步加载数据
  $.ajax({
    type: 'get',
    async: true,
    url: 'https://wakatime.com/share/@Leozhang2018/60a912db-bc5a-4f05-8b68-5a8d107be61c.json',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'success_jsonpCallback',
    success: function(json) {
      var xData = [];
      var yData = [];
      json['data'].forEach(function(element) {
        xData.push(element.range.date.split('-')[1] + '-' + element.range.date.split('-')[2]);
        yData.push((element.grand_total.total_seconds / 3600).toFixed(2));
      });
      myChart.setOption({
        xAxis: {
          data: xData
        },
        series: [
          {
            data: yData,
            type: 'line',
            smooth: true
          }
        ]
      });
    },
    error: function() {
      console.log('fail');
    }
  });
}

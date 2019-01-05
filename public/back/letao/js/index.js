/**
 * Created by 54721 on 2019/1/4.
 */
$(function() {
    
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector(".echarts_left"));
    
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
    
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    

      // 右侧的饼图
      // 基于准备好的盒子初始化
      var myChart = echarts.init(document.querySelector(".echarts_right"));      
      // 指定图表的配置和数据
      var option2 = {
        // 大标题
        title : {
          text: '热门品牌销售',
          // 副标题文本
          subtext: '2019年1月',
          // 控制位置
          x:'center'
        },
        // 提示框组件
        tooltip : {
          trigger: 'item',  // 鼠标悬停在 item 数据项上时, 显示提示框
          // 格式化提示框文本 {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图例
        legend: {
          orient: 'vertical',   // horizontal 水平的
          left: 'left',   // 居左显示
          data: ['耐克','阿迪','老奶奶','老北京','特步']
        },
        series : [
          {
            name: '品牌热卖',   // 系列名称
            type: 'pie',   // 饼图
            radius : '55%',  // 设置圆的大小
            center: ['50%', '60%'],  // 控制圆心位置
            data:[
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'老奶奶'},
              {value:135, name:'老北京'},
              {value:1548, name:'特步'}
            ],
            // 额外的样式效果
            itemStyle: {
              // 添加阴影效果
              emphasis: {
                shadowBlur: 100,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0,0,0,.4)'
              }
            }
          }
        ]
      };
      myChart.setOption(option2);
    })
    
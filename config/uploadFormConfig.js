export const uploadFormConfig = {
    _style: {
        columns: 2
    },
    _items: [
    //   {
    //     key: "onlineDevids",
    //     text: '在线设备',
    //     type: 'multiple',
    //     tranCode: 'queryOnlineDevidsService'
    // },
      {
      key: "fileType",
      text: '文件类型',
      type: 'cascader',
      options: [
        {
          'value': 'A',
          'label': '前端日志',
          'children': [
            {
              'value': 'A1',
              'label': '应用日志'
            },
            {
              'value': 'A2',
              'label': '应用流程日志'
            },
            {
              'value': 'A3',
              'label': '应用接口错误日志'
            },
            {
              'value': 'A4',
              'label': '页面日志'
            }
          ]
        },
        {
          'value': 'B',
          'label': 'SP日志',
          'children': [
            {
              'value': 'B1',
              'label': '中间件设备服务层日志'
            }, {
              'value': 'B2',
              'label': '浏览器日志'
            }
          ]
        },
        {
          'value': 'C',
          'label': '中间件日志',
          'children': [
            {
              'value': 'C1',
              'label': '读卡器'
            }, {
              'value': 'C2',
              'label': '摄像头'
            }, {
              'value': 'C3',
              'label': '人脸摄像头'
            }, {
              'value': 'C4',
              'label': '签字版'
            }, {
              'value': 'C5',
              'label': '身份证读卡器'
            }, {
              'value': 'C6',
              'label': '激光打印机'
            }, {
              'value': 'C7',
              'label': '凭条打印机'
            }, {
              'value': 'C8',
              'label': 'siu'
            }, {
              'value': 'C9',
              'label': '文件服务'
            }, {
              'value': 'C10',
              'label': '数据库'
            }
          ]
        },
        {
          "value": 'Z',
          "label": '自定义日志',
          "children":[
            {
              'value': 'Z',
              'label': '自定义日志'
            }
          ]
        }
      ],
      showAllLevels:false,
      props: {"multiple": true}
    },
    {
      key: "date",
      text: '日期',
      type: 'customize',
      width: 350,
      columns: 1
    },
    {
      key: "fileList",
      text: '文件目录',
      type: 'customize',
      width: 350,
      columns: 1
    }
    ],
  _rules: {
    onlineDevids:[{
      required: true,
      message: '请选择设备',
      trigger: 'blur'
    }],
    fileType: [{
      required: true,
      message: '请选择文件类型',
      trigger: 'blur'
    }]
  }
}



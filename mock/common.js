const itemOptions = {
  queryOnlineDevidsService: [{
    'value': '110101',
    'text': '110101'
  }, {
    'value': '110102',
    'text': '110102'
  }, {
    'value': '110103',
    'text': '110103'
  }, {
    'value': '110104',
    'text': '110104'
  }, {
    'value': '110105',
    'text': '110105'
  }]
}

module.exports = [
  // user login
  {
    url: '/api/DevOps/common/reqItemOptions',
    type: 'post',
    response: config => {
      const { tranCode } = config.body
      const opitons = itemOptions[tranCode]

      if (!opitons) {
        return {
          code: 60204,
          message: '未获取到相应options'
        }
      }

      return {
        code: 20000,
        data: JSON.stringify(opitons)
      }
    }
  }
]

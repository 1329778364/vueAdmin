import request from '@/utils/request'

export function reqItemOptions(tranCode) {
  return request({
    url: '/reqItemOptionsService',
    method: 'post',
    data: {
      tranCode
    }
  })
}


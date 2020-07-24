import request from '@/utils/request'

export function upload(devid, subtype, date, fileList) {
  return request({
    url: '/publish',
    method: 'post',
    data: {
      topic: 'sys' + devid,
      data: { type: 'A', subtype, date, fileList }
    }
  })
}


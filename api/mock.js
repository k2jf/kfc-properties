const propertyData = [
  {
    groupId: 'system',
    groupName: '系统设置',
    groupDescription: '系统相关的属性配置',
    readOnly: false,
    keys: [
      {
        keyId: 'session-timeout',
        keyName: '会话超时时间',
        keyDescription: '设置多长时间之后会话过期。单位毫秒',
        valueType: 'number',
        value: 60000 * 15
      },
      {
        keyId: 'multiple-log-on',
        keyName: '是否支持多点登陆',
        keyDescription: '设置为false则只允许单点登录，该用户其他会话自动下线',
        valueType: 'boolean',
        value: false
      },
      {
        keyId: 'admin-name-alt',
        keyName: '重设管理员名',
        keyDescription: '默认为admin，可以更改为其他名称如root',
        valueType: 'string',
        value: ''
      }
    ]
  },
  {
    groupId: 'system-internal',
    groupName: '内部属性',
    groupDescription: '内部属性，不支持直接修改',
    readOnly: true,
    keys: [
      {
        keyId: 'eam-last-scan-id',
        keyName: '上次扫描eam工单最后的位置',
        keyDescription: '',
        valueType: 'number',
        value: 17052
      },
      {
        keyId: 'max-parallel-job-count',
        keyName: '最多并行任务数',
        keyDescription: '根据机器配置自动设定',
        valueType: 'number',
        value: 5
      },
      {
        keyId: 'load-balance-enabled',
        keyName: '是否启动了负载均衡',
        keyDescription: '',
        valueType: 'boolean',
        value: false
      }
    ]
  },
  {
    groupId: 'style-customization',
    groupName: '自定义样式',
    groupDescription: '',
    readOnly: false,
    keys: [
      {
        keyId: 'festival-skin-enabled',
        keyName: '开启节日皮肤',
        keyDescription: '在节日显示对应的皮肤',
        valueType: 'boolean',
        value: false
      },
      {
        keyId: 'theme-color',
        keyName: '主题色',
        keyDescription: '设置系统界面的主题色',
        valueType: 'string',
        value: 'darkblue'
      }
    ]
  }
]

export const getGroupKeyDetails = (groupKey) => {
  const data = groupKey
    ? propertyData.find(i => i.groupId === groupKey) // a group object
    : propertyData // group array
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data
      })
    }, 500)
  }).then(data => data.data)
}

export const updateProperty = (groupKey, key, value) => {
  return new Promise((resolve) => {
    const thatGroup = propertyData.find(i => i.groupId === groupKey)
    if (!thatGroup) {
      throw new Error(`invalid group key [${groupKey}]!`)
    }
    const thatKey = thatGroup.keys.find(i => i.keyId === key)
    if (!thatKey) {
      throw new Error(`invalid key [${key}] in group [${groupKey}]!`)
    }
    thatKey.value = value

    setTimeout(() => {
      resolve({
        data: {
          message: 'success'
        }
      })
    }, 500)
  }).then(data => data.data)
}

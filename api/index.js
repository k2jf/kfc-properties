export const getGroupKeyDetails = (groupKey) => {
  const groupKeyPathOption = groupKey ? `/${groupKey}` : ''
  return global.axios.get('/properties/group-keys' + groupKeyPathOption)
    .then(data => data.data)
}

export const updateProperty = (groupKey, key, value) => {
  return global.axios.put(`/properties/group-keys/${groupKey}/keys/${key}`, {
    value: value
  }).then(data => data.data)
}

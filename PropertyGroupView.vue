<template>
  <div class="container">
    <h3>{{ keyGroupName || '未知keyGroup' }}</h3>
    <div class="table-wrapper" v-if="!!keyValuePairs">
      <Table
        :columns="table.columns"
        :data="keyValuePairs"
        @on-row-dblclick="toUpdate"></Table>
    </div>
    <div v-else>
      <h4>-- no content --</h4>
    </div>
  </div>
</template>

<script>
import { Table, Input, Button, Icon } from 'iview'

export default {
  name: 'PropertyGroupView',
  components: {
    Table
  },
  props: {
    keyGroupName: {
      type: String,
      required: true
    },
    keyValuePairs: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      rowToEdit: {
        key: '',
        updatingValue: ''
      },
      table: {
        columns: [
          {
            type: 'index'
          },
          {
            title: 'key',
            key: 'keyId'
          },
          {
            title: 'value',
            render: (h, { row, column, index }) => {
              // note 这个render要写成() => {}的形式，不能写成render () {}, 否则this会绑定到table-row
              const edittingRowKey = this.rowToEdit.key
              if (edittingRowKey === row.keyId) {
                return h('div', {}, [
                  h(Input, {
                    props: {
                      value: this.rowToEdit.updatingValue,
                      placeholder: row.valueType || '' + row.value
                    },
                    style: {
                      width: 'calc( 100% - 160px )',
                      marginRight: '8px'
                    }
                  }),
                  h(Button, {
                    props: {
                      type: 'primary',
                      icon: 'md-checkmark'
                    },
                    on: {
                      click: this.handleUpdate
                    }
                  }, '确定'),
                  h(Button, {
                    props: {
                      type: 'error',
                      icon: 'md-close'
                    },
                    on: {
                      click: this.handleCancel
                    }
                  }, '取消')
                ])
              } else {
                return h('span', {}, [
                  row.value || h('span', { class: 'hint' }, '(空值)'),
                  h(Icon, {
                    props: {
                      type: 'md-create'
                    },
                    style: {
                      float: 'right',
                      padding: '4px',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => this.toUpdate(row)
                    }
                  })
                ])
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    handleUpdate () {
      if (!('' + this.rowToEdit.updatingValue).trim()) {
        console.log('empty input is ignored')
        this.clearEditing()
        return
      }
      console.log('ready to update: key -> [%s], value -> [%s]',
        this.rowToEdit.rowKey, this.rowToEdit.updatingValue)

      // todo update impl
      this.clearEditing()
    },
    clearEditing (rowKeyOptional) {
      // note 这里不能写成 this.rowToEdit.key = rowKey,因为不能响应
      this.rowToEdit = {
        key: rowKeyOptional || '',
        updatingValue: ''
      }
    },
    handleCancel () {
      console.log('update cancelled')
      this.clearEditing()
    },
    toUpdate (row) {
      console.log('before update: rowKey -> [%s]', row.keyId)
      this.clearEditing(row.keyId)
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 8px;
  }

  .table-wrapper {

  }

  .table-wrapper >>> .hint {
    /* note since this class applies inside component Table, you should use >>> to "dig in" */
    font-size: smaller;
    color: #AAAAAA;
  }
</style>

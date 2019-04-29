<template>
  <div class="container">
    <div class="group-key-wrapper">
      <span class="four-char">选择类别</span>
      <span class="four-char-out">
        <Select v-model="selectedGroupKeyId">
          <Option
            :value="item.id"
            :label="item.id"
            v-for="item in groupKeyOptions"
            :key="item.id"
          >
            <div class="heading">
              <span class="heading-left">{{ item.id }}</span>
              <span class="heading-right" v-if="item.name">{{ item.name }}</span>
            </div>
            <div class="hint" v-if="item.desc">{{ item.desc }}</div>
          </Option>
        </Select>
      </span>
    </div>
    <div class="property-wrapper">
      <PropertyGroupView
        :keyGroupName="selectedGroupKeyId"
        :keyValuePairs="selectedGroupKVP"></PropertyGroupView>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'iview'
import { getGroupKeyDetails } from './api/mock'
import PropertyGroupView from './PropertyGroupView'

export default {
  name: 'PropertyManager',
  components: {
    // note 此处的组件名字需要固定成i-select，因为和Option组件之间通过*名字*相互关联
    // （感觉此处不是一个好的设计）
    Select,
    Option,
    PropertyGroupView
  },
  data () {
    return {
      propertyData: null, // it's an object array,
      groupKeyOptions: [],
      selectedGroupKeyId: ''
    }
  },
  computed: {
    selectedGroupKVP () {
      const propertyData = this.propertyData
      const selectedGroupKeyId = this.selectedGroupKeyId
      if (propertyData && propertyData.length) {
        const thatGroup = propertyData.find(item => item.groupId === selectedGroupKeyId)
        return (thatGroup && thatGroup.keys) || []
      } else {
        return []
      }
    }
  },
  created () {
    this.loadGroupKeyDetails()
  },
  methods: {
    loadGroupKeyDetails () {
      getGroupKeyDetails().then(data => {
        // console.log(data);
        this.propertyData = data
        this.groupKeyOptions = this.propertyData.map(i => ({
          id: i.groupId,
          name: i.groupName,
          desc: i.groupDescription
        }))
        if (this.groupKeyOptions.length) {
          this.selectedGroupKey = this.groupKeyOptions[0].id
        }
      })
    }
  }
}
</script>

<style scoped>
  .group-key-wrapper {
    width: 400px;
  }

  .four-char {
    display: inline-block;
    text-align: right;
    width: 5em;
    margin-right: 0.5em;
    margin-top: 3px;
    vertical-align: text-top;
  }
  .four-char:after {
    content: ' :'
  }

  .four-char-out {
    width: calc( 100% - 6.5em );
    height: auto;
    display: inline-block;
    vertical-align: top;
  }

  .heading {
    padding: 3px 0;
  }
  .heading-right {
    float: right;
  }
  .hint {
    font-size: smaller;
    color: #999999;
  }
</style>

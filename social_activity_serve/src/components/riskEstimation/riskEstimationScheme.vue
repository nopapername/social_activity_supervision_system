<template>
  <div class="riskEstimationScheme">
    <!-- 风险预估方案管理 -->
    <h1 class="table-title" style="margin: 10px 0;">体育赛事风险评估方案</h1>
    <div class="table-content">
      <div v-show="!factorData.length" style="border: 1px solid #e7e8eb; padding: 8px 0;">暂无数据</div>
      <div
        class="table-row"
        v-for="(items,index1) in factorData"
        :key="index1"
      >
        <div class="cell-th">{{ items.factor }}</div>
        <div class="td-content">
          <div class="cell-td"
            v-for="(item, index2) in items.specific"
            :key="index2"
            @click="selectFactor(index1, index2, item.select)"
            :style="{backgroundColor: item.select ? '#ffa010' : ''}">
            {{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="submitButton">
      <Button type="primary" style="margin-right: 100px;">保存</Button>
      <Button type="primary">取消</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'riskEstimationScheme',
  data () {
    return {
      factorData: [
        {
          factor: '人的因素',
          specific: [
            {
              name: '对抗程度',
              select: true
            },
            {
              name: '有无暴乱记录',
              select: true
            },
            {
              name: '有否组织人',
              select: false
            },
            {
              name: '人员素质',
              select: true
            },
            {
              name: '两队有无斗殴记录',
              select: true
            },
            {
              name: '有无重要人物观看',
              select: true
            },
            {
              name: '关键部位是否有疏导人员',
              select: true
            }
          ]
        },
        {
          factor: '场地的因素',
          specific: [
            {
              name: '场地是否成熟',
              select: true
            },
            {
              name: '是否热闹',
              select: true
            },
            {
              name: '出口标识是否明显',
              select: true
            },
            {
              name: '是否空旷',
              select: false
            },
            {
              name: '是否安检过关',
              select: true
            },
            {
              name: '是否有应急灯',
              select: true
            },
            {
              name: '停车场容量',
              select: false
            },
            {
              name: '是否有双电源',
              select: false
            },
            {
              name: '消防通道是否达标',
              select: false
            },
            {
              name: '是否有应急出口',
              select: false
            },
            {
              name: '容纳量饱和度',
              select: false
            },
            {
              name: '人员疏散出口',
              select: false
            }
          ]
        },
        {
          factor: '事件的因素',
          specific: [
            {
              name: '是否有国际恐怖滋事',
              select: false
            },
            {
              name: '是否搭建看台',
              select: true
            },
            {
              name: '看台是否通过安检',
              select: true
            },
            {
              name: '是否空旷',
              select: false
            },
            {
              name: '是否安检过关',
              select: true
            },
            {
              name: '是否有应急灯',
              select: true
            },
            {
              name: '停车场容量',
              select: false
            },
            {
              name: '是否有双电源',
              select: false
            },
            {
              name: '消防通道是否达标',
              select: false
            },
            {
              name: '是否有应急出口',
              select: false
            }
          ]
        }
      ]
    }
  },
  // computed: {
  //   specificLength () {
  //     let maxLen = 0
  //     this.factorData.forEach((item, index) => {
  //       if (item.specific.length > maxLen) maxLen = item.specific.length
  //     })
  //     return maxLen
  //   }
  // },
  methods: {
    selectFactor (index1, index2, select) {
      var { factorData } = this
      factorData[index1].specific[index2].select = !select
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.riskEstimationScheme {
  width: 100%;
}
.table-content {
  width: 100%;
  padding: 10px 0;
}
.table-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.cell-th {
  width: 180px;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f9;
}
.td-content {
  width: calc(100% - 200px);
  display: flex;
  flex-wrap: wrap;
}
.cell-td {
  width: 180px;
  padding: 5px 0;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.submitButton {
  margin: 100px 0;
}
</style>

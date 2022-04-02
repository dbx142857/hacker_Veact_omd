module.exports = {
  data() {
    return {
      basicInfo: [
        {
          id: 1,
          label: "订单号",
          value: "1438",
        },
        {
          id: 2,
          label: "订单类型",
          value: "实物订单",
        },
        {
          id: 3,
          label: "来源",
          value: "商城",
        },
        {
          id: 4,
          label: "发货方式",
          value: "物流/快递",
        },
        {
          id: 5,
          label: "下单时间",
          value: "2020-12-5 11:59:59",
        },
        {
          id: 6,
          label: "商品金额",
          value: "￥3999.00",
        },
        {
          id: 7,
          label: "运费",
          value: "￥10.00",
        },
        {
          id: 8,
          label: "卡券抵扣",
          value: "-￥100.00",
        },
        {
          id: 9,
          label: "活动优惠",
          value: "-￥100.00",
        },
        {
          id: 10,
          label: "总计",
          value: "￥3809.00",
        },
      ],
      buyerInfo: [
        {
          id: 1,
          label: "昵称",
          value: "新",
        },
        {
          id: 2,
          label: "身份标识",
          value: "员工",
        },
        {
          id: 3,
          label: "手机号码",
          value: "123456789",
        },
      ],
      consigneeInfo: [
        {
          id: 1,
          label: "收货人",
          value: "新",
        },
        {
          id: 2,
          label: "收货人手机号",
          value: "987654321",
        },
        {
          id: 3,
          label: "所在地",
          value: "江苏省/南京市/江宁区",
        },
        {
          id: 4,
          label: "详细地址",
          value: "南京巨量跳动科技有限公司",
        },
        {
          id: 5,
          label: "买家留言",
          value: "你真帅",
        },
      ],
      rebate: [
        {
          id: 1,
          label: "邀请返佣",
          user: "新",
          price: "￥5.00",
        },
        {
          id: 2,
          label: "一级返佣",
          user: "新",
          price: "￥5.00",
        },
        {
          id: 3,
          label: "二级返佣",
          user: "新",
          price: "￥5.00",
        },
      ],
      priceInfo: [
        {
          id: 1,
          label: "商品金额",
          price: "￥3999.00",
        },
        {
          id: 2,
          label: "运费",
          price: "+￥5.00",
        },
        {
          id: 3,
          label: "优惠(卡券+活动)",
          price: "-￥100.00",
        },
      ],
    };
  },
};

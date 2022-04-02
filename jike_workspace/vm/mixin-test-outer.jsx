module.exports = {
  template: `<div> i am mixin test outer--<mixin-template-demo..jsx..tpl-only>
  <div>我是被mixin的模板的插槽里的内容</div>
  </mixin-template-demo..jsx..tpl-only>
  </div>`,
  mixins: ["mixin-test"],
  mounted() {},

};

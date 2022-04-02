defineBabel({
  async bootstrap() {
    return {
      vm: class Demo extends React.Component {
        constructor() {
          super();
          this.state = {
            stateTest: "i am state test",
          };
        }
        render() {
          return <div>i am react comp ---{this.state.stateTest}</div>;
        }
      },
      $el: "main",
    };
  },
})();
module.exports = {
  mounted() {
    Bue.doNothing("children of react-in-vue-demo--:", this.$children);
  },
};

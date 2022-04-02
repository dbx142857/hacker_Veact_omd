module.exports = {
  template: `<div>i am single jsx test file--{{foo}}
  
  <button @click="$router.push('/sdfsdf')">to 404</button>
  <button @click='$router.push("/hacker-route-example")'>to hacker route test</button></div>`,
  data() {
    return {
      foo: "i am foo",
    };
  },
};

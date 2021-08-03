
export default ({ $axios, redirect, route, store, query, app }) => {
  // $axios.defaults.timeout=10000;
  $axios.onRequest(config => {
    if (route.query.token) {
      app.$cookies.remove('token')
      let token = `Bearer ${route.query.token}`;
      app.$cookies.set('token', token);
      config.headers.Authorization = token;
    } else if (app.$cookies.get('token')) {
      let token = app.$cookies.get('token');
      config.headers.Authorization = token;
    }
    // start
    // if (app.$cookies.get('token')) {
    //   let token = app.$cookies.get('token');
    //   config.headers.Authorization = token;
    // } else if(route.query.token){
    //   let token = `Bearer ${route.query.token}`
    //   app.$cookies.set('token',token)
    //   config.headers.Authorization=token;
    // }else if (route.query.type==="install") {
    //   return
    // } else {
    //   redirect(`/login?from=${route.path}`);
    // }
    // end
    return config;
  })
  $axios.onResponse(res => {
    console.log("响应拦截");
    return res
  })
  $axios.onError(error => {
    return error
  })
}

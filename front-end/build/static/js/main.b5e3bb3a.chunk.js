(this["webpackJsonpdevnet-frontend"]=this["webpackJsonpdevnet-frontend"]||[]).push([[0],{51:function(e,t,n){},53:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),o=n(17),a=n.n(o),r=(n(51),n(52),n(46)),s=n(5),l=(n.p,n(53),n(85)),d=n(86),j=n(87),h=n(88),b=n.p+"static/media/earth.f5a026cc.png",x=n.p+"static/media/github-socialFULLHD.c0fcfce7.png",p=n(1),g={backgroundImage:"url(".concat(x,")"),backgroundSize:"100% 100%",backgroundRepeat:"no-repeat"},f={boxSizing:"border-box",textAlign:"left",marginTop:"5%"},u={fontSize:"72px",fontWeight:"800",color:"white",fontFamily:'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";'},O={fontSize:"20px",color:"#c3c9de",fontWeight:"400",fontFamily:'Alliance No.1",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol'};var m=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)("div",{style:g,children:Object(p.jsx)(l.a,{children:Object(p.jsxs)(d.a,{children:[Object(p.jsxs)(j.a,{style:f,children:[Object(p.jsx)("h1",{style:u,children:"Where the world builds sofware"}),Object(p.jsx)("p",{style:O,children:"Millions of developers and companies build, ship, and maintain their software on Genki Dama most advanced development platform in the world."})]}),Object(p.jsx)(j.a,{children:Object(p.jsx)(h.a,{src:b,fluid:!0})})]})})})})},y=n(89),S=n(90);var k=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(y.a,{bg:"dark",variant:"dark",children:Object(p.jsxs)(l.a,{children:[Object(p.jsx)(y.a.Brand,{href:"/",children:"Genki Dama"}),Object(p.jsxs)(S.a,{className:"me-auto",children:[Object(p.jsx)(S.a.Link,{href:"/repositories",children:"Repositories"}),Object(p.jsx)(S.a.Link,{href:"/projects",children:"Projects"}),Object(p.jsx)(S.a.Link,{href:"/explore",children:"Explore"}),Object(p.jsx)(S.a.Link,{href:"/pricing",children:"Plans"})]}),Object(p.jsx)(y.a.Brand,{href:"/sign-in",children:"Sign-In"}),Object(p.jsx)(y.a.Brand,{href:"/sign-up",children:"Sign-Up"})]})})})};var v=function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(k,{}),Object(p.jsx)(m,{})]})},w=n(11),F=n.p+"static/media/logoGenki.aae36720.svg",A=n(42),C=n(43),L=n.n(C),I=function e(){Object(A.a)(this,e)};I.requestAuthWithEmailAndPassword=function(e,t){console.log("ngu l\u1ed3n"),L.a.post("http://localhost:7000/login",{email:e,password:t}).then((function(e){console.log(e),console.log(e.data)}))};var z=I,U={textAlign:"center",marginTop:"11%",fontSize:"24px",fontWeight:"300",letterSpacing:"-0,5px"},B={width:"308px",height:"228.6px",borderRadius:"6px",backgroundColor:"#f6f8fa",border:"1px solid #d8dee4"},D={display:"block",textAlign:"left",marginLeft:"10%",marginBottom:"7px",fontWeight:"400px",marginTop:"16px"},E={display:"block",width:"80%",border:"1px solid #d0d7de",borderRadius:"6px",backgroundColor:"white",marginLeft:"10%",fontSize:"14px"},W={display:"block",width:"80%",marginLeft:"10%",marginTop:"20px",fontSize:"14px",fontWeight:"500",color:"white",backgroundColor:"#2da44e",boder:"1px solid",borderRadius:"6px"},P={marginLeft:"10%",color:"#0969da",fontSize:"12px",textDecoration:"none"},T={display:"block",width:"100%",textAlign:"center",marginTop:"25px",fontSize:"12px"};var G=function(){var e=Object(i.useState)(""),t=Object(w.a)(e,2),n=t[0],c=t[1],o=Object(i.useState)(""),a=Object(w.a)(o,2),r=a[0],s=a[1];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(k,{}),Object(p.jsx)("div",{children:Object(p.jsx)(l.a,{children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(j.a,{children:Object(p.jsx)(h.a,{src:F,fluid:!0})}),Object(p.jsx)(j.a,{children:Object(p.jsxs)(l.a,{children:[Object(p.jsx)(d.a,{children:Object(p.jsx)(j.a,{children:Object(p.jsx)("h1",{style:U,children:"Sign in to Genki Dama"})})}),Object(p.jsxs)(d.a,{children:[Object(p.jsx)(j.a,{}),Object(p.jsx)(j.a,{children:Object(p.jsxs)("div",{style:B,children:[Object(p.jsx)("label",{for:"login_field",style:D,children:"Username or email address"}),Object(p.jsx)("input",{type:"text",name:"login",id:"login-field",autoFocus:"autofocus",style:E,onChange:function(e){c(e.target.value)}}),Object(p.jsx)("label",{for:"password",style:D,children:"Password"}),Object(p.jsx)("input",{type:"password",name:"login",id:"password",autoFocus:"autofocus",style:E,onChange:function(e){s(e.target.value)}}),Object(p.jsx)("button",{name:"commit",style:W,onClick:function(e){console.log("duma"),z.requestAuthWithEmailAndPassword(n,r).then()},children:"Sign in"}),Object(p.jsx)("a",{href:"",style:P,children:"Forgot password?"})]})}),Object(p.jsx)(j.a,{})]}),Object(p.jsx)(d.a,{children:Object(p.jsx)(j.a,{children:Object(p.jsxs)("p",{style:T,children:["New to Genki Dama? ",Object(p.jsx)("a",{href:"",style:{textDecoration:"none",color:"#0969da"},children:"Create an account."})]})})})]})})]})})})]})};var R=function(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(k,{})})};var M=function(){return Object(p.jsxs)(r.a,{children:[Object(p.jsx)(s.a,{exact:!0,path:"/",component:v}),Object(p.jsx)(s.a,{exact:!0,path:"/sign-in",component:G}),Object(p.jsx)(s.a,{exact:!0,path:"/repositories",component:R})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),o(e),a(e)}))};a.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(M,{})}),document.getElementById("root")),N()}},[[83,1,2]]]);
//# sourceMappingURL=main.b5e3bb3a.chunk.js.map
(window["webpackJsonpweb-client"]=window["webpackJsonpweb-client"]||[]).push([[0],{133:function(e,t,a){e.exports=a(273)},138:function(e,t,a){},139:function(e,t){if("undefined"===typeof moment){var a=new Error("Cannot find module 'moment'");throw a.code="MODULE_NOT_FOUND",a}e.exports=moment},273:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(24),o=a.n(l),i=(a(138),a(281)),c=a(278),u=a(282),m=a(283),d=a(77),s=a(111),h=a.n(s),E=a(123),p=a(280),w=function(){var e=r.a.useState(!1),t=Object(E.a)(e,2),a=t[0],n=t[1],l=r.a.useRef(null),o=r.a.useRef(null);return r.a.createElement(c.a,{text:!0,style:{marginTop:"7em"}},r.a.createElement(p.a,{primary:!0,onClick:function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){var t=e.getTracks(),a=[];l.current=new MediaRecorder(e,{mimeType:"audio/ogg"}),l.current.addEventListener("dataavailable",function(e){e.data.size>0&&a.push(e.data)}),l.current.addEventListener("stop",function(){o.current.href=URL.createObjectURL(new Blob(a)),t.map(function(e){return e.stop()}),o.current.download="acetest.wav"}),l.current.start(),n(!0)})}},"Start the meeting"),r.a.createElement(p.a,{disabled:!a,secondary:!0,onClick:function(){n(!1),l.current.stop()}},"Stop the meeting"),r.a.createElement(c.a,{as:"h1"},r.a.createElement("a",{ref:o,href:o.current&&o.current.href},"Download")))},g=function(e){var t=r.a.useRef(null);return r.a.useEffect(function(){new h.a(t.current,{type:e.type,data:e.data,options:e.options})},[t,e.data,e.type,e.options,e.width,e.height]),r.a.createElement("canvas",{width:e.width,height:e.height,ref:t})},f=(d.a().domain([-1,1]).range(["green","red"]),d.a().domain([3,12]).range([0,1]),function(){var e=["Evi","Islam","Amadeus"],t=r.a.useMemo(function(){return{datasets:[{label:"AI",data:[12,19,3,5,2,3],backgroundColor:"blue"},{label:"Commercetools",data:[12,19,3,5,2,3].map(function(e){return e*Math.random()}),backgroundColor:"red"}],labels:e}},[]),a=r.a.useMemo(function(){return{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},[]);return r.a.createElement("div",null,r.a.createElement(i.a,{fixed:"top",inverted:!0},r.a.createElement(c.a,null,r.a.createElement(i.a.Item,{as:"a",header:!0},"Meeting moderator"),r.a.createElement(i.a.Item,{as:"a"},"Home"))),r.a.createElement(u.a,{columns:3,padded:!0},r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,null),r.a.createElement(u.a.Column,null,r.a.createElement(m.a,null,r.a.createElement(w,null))),r.a.createElement(u.a.Column,null)),r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"horizontalBar",data:t,options:a}))),r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"pie",data:{datasets:[{data:[10,20,30],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"]}],labels:["Red","Yellow","Blue"]},options:a}))),r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"horizontalBar",data:t,options:a})))),r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"bar",data:t,options:a}))),r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"bar",data:t,options:a}))),r.a.createElement(u.a.Column,null,r.a.createElement(c.a,{style:{width:"600px"}},r.a.createElement(g,{width:200,height:200,type:"bar",data:t,options:a}))))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[133,1,2]]]);
//# sourceMappingURL=main.5f152fd2.chunk.js.map
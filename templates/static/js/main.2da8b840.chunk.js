(window["webpackJsonpweb-client"]=window["webpackJsonpweb-client"]||[]).push([[0],{174:function(e,t,a){e.exports=a(313)},179:function(e,t,a){},180:function(e,t){if("undefined"===typeof moment){var a=new Error("Cannot find module 'moment'");throw a.code="MODULE_NOT_FOUND",a}e.exports=moment},313:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(26),r=a.n(o),i=(a(179),a(23)),c=a(326),s=a(321),u=a(327),m=a(328),d=a(325),p=a(323),h=a(43),g=a(143),E=a.n(g),f=function(e){var t=l.a.useRef(null);return l.a.useEffect(function(){new E.a(t.current,{type:e.type,data:e.data,options:e.options})},[t,e.data,e.type,e.options,e.width,e.height]),l.a.createElement("canvas",{width:e.width,height:e.height,ref:t})},w=a(314),v=a(42),b=a(322),k=function(e){var t=l.a.useState(!1),a=Object(i.a)(t,2),n=a[0],o=a[1],r=l.a.useState(0),c=Object(i.a)(r,2),u=c[0],m=c[1],d=l.a.useRef(null);return l.a.createElement(s.a,{text:!0,style:{marginTop:"7em"}},l.a.createElement(w.a,{primary:!0,onClick:function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(t){var a=t.getTracks(),n=[];d.current=new MediaRecorder(t,{mimeType:"audio/ogg"}),d.current.addEventListener("dataavailable",function(e){e.data.size>0&&n.push(e.data)}),d.current.addEventListener("stop",function(){a.map(function(e){return e.stop()});var t=new FormData;t.append("file",new Blob(n)),t.append("speakers_count",u),e.setIsLoading(!0),fetch("/uploadAudio",{method:"post",body:t}).then(function(e){return e.json()}).then(function(t){e.visualize(t)}).finally(function(){e.setIsLoading(!1)})}),d.current.start(),o(!0)})}},"Start the meeting"),l.a.createElement(w.a,{disabled:!n,secondary:!0,onClick:function(){o(!1),d.current.stop()}},"Stop the meeting"),l.a.createElement(v.a,null,"Speakers count",l.a.createElement(b.a,{min:0,value:u,onChange:function(e){return m(e.target.value)},icon:"users",iconPosition:"left",placeholder:"speakers count...",type:"number"})))},y=function(){var e=l.a.useState({}),t=Object(i.a)(e,2),a=t[0],n=t[1],o=l.a.useState([]),r=Object(i.a)(o,2),g=r[0],E=r[1],w=l.a.useState([]),v=Object(i.a)(w,2),b=v[0],y=v[1],C=l.a.useState(!1),x=Object(i.a)(C,2),S=x[0],M=x[1];return l.a.createElement("div",null,l.a.createElement(c.a,{fixed:"top",inverted:!0},l.a.createElement(s.a,null,l.a.createElement(c.a.Item,{as:"a",header:!0},"Meeting moderator"),l.a.createElement(c.a.Item,{as:"a"},"Home"))),l.a.createElement(u.a,{columns:3,padded:!0},l.a.createElement(u.a.Row,null,l.a.createElement(u.a.Column,null),l.a.createElement(u.a.Column,null,l.a.createElement(m.a,null,l.a.createElement(k,{visualize:function(e){n(e.sentiment),E(e.speakers),y(e.topics)},setIsLoading:M}))),l.a.createElement(u.a.Column,null)),S||0===g.length?l.a.createElement(u.a.Row,null,l.a.createElement(u.a.Column,null),l.a.createElement(u.a.Column,null,l.a.createElement(s.a,{style:{width:"600px"}},l.a.createElement(d.a,{active:!0,inverted:!0},0===g.length?"No data available":l.a.createElement(p.a,{inverted:!0},"Loading"))))):l.a.createElement(u.a.Row,null,l.a.createElement(u.a.Column,null,l.a.createElement(s.a,{style:{width:"600px"}},l.a.createElement("h1",null,"Sentiment "),l.a.createElement("p",null,"How was the general feeling during the meeting"),l.a.createElement("small",null,"Green means more positive, and red means negative"),l.a.createElement("img",{src:"//raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png",alt:"RdYlGn",width:"100%",height:"40"}),l.a.createElement(f,{width:200,height:200,type:"bar",data:{datasets:[{label:"Sentiment",data:[a.magnitude],backgroundColor:[h.a(h.b().domain([-1,1]).range([0,1])(a.score))]}]},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}}))),l.a.createElement(u.a.Column,null,l.a.createElement(s.a,{style:{width:"600px"}},l.a.createElement("h1",null,"Topics covered "),l.a.createElement("p",null,"What was taked about during the meeting"),l.a.createElement("small",null,"The size of each part of the Pie, coresponds to how long it was covered"),l.a.createElement(f,{width:200,height:200,type:"pie",data:{datasets:[{data:b.map(function(e){return e.ratio}),backgroundColor:h.c}],labels:b.map(function(e){return e.topic})},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}}))),l.a.createElement(u.a.Column,null,l.a.createElement(s.a,{style:{width:"600px"}},l.a.createElement("h1",null,"Speakers contriputions ratio"),l.a.createElement("p",null,"How long each speaker participated to the meeting"),l.a.createElement("small",null,"The size of each part of the Pie, coresponds to how long the speaker talked"),l.a.createElement(f,{width:200,height:200,type:"pie",data:{datasets:[{data:g.map(function(e){return e.ratio}),backgroundColor:h.c}],labels:g.map(function(e){return e.speaker_id})},options:{scales:{yAxes:[{ticks:{suggestedMax:1,suggestedMin:0}}]}}}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[174,1,2]]]);
//# sourceMappingURL=main.2da8b840.chunk.js.map